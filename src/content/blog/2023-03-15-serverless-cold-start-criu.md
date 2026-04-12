---
title: "当你的函数冷启动需要 30 秒：我在 Serverless 冷启动优化上做的事"
pubDate: 2023-03-15
layout: post
tags:
- CRIU
- Serverless
- Linux
- Checkpoint-Restore
---

去年写过一篇 [Dive into CRIU](/blog/2022-09-12-dive-into-criu-1-setup-and-dump-a-process)，当时纯粹是好奇心驱动——觉得"冻结一个进程然后在另一台机器上复活"这件事太 cyberpunk 了。

没想到这个好奇心后来变成了我的主要工作内容之一。

## 问题

如果你用过 Serverless（AWS Lambda、华为云 FunctionGraph 之类的），你大概率被冷启动折磨过。一个 Python 函数，热调用几毫秒就完事，冷启动可能要几秒。如果是 AI 推理场景——加载 TensorFlow 模型——冷启动 30 秒都不稀奇。

30 秒。用户等 30 秒。在 2023 年。

这个问题的本质是：每次冷启动都要从零开始——调度、拉镜像、创建容器、初始化运行时、加载代码、加载模型。每一步都在烧时间。

## Checkpoint/Restore：时间旅行

CRIU 的思路很暴力也很优雅：既然从零启动这么慢，那就别从零启动。

把一个已经完全初始化好的进程"拍个快照"（checkpoint），保存它的全部状态——内存、文件描述符、网络连接、寄存器。下次需要的时候，直接从快照恢复（restore）。跳过所有初始化步骤。

听起来简单，做起来全是坑。

## 坑 1：ARM 上的 CRIU

我们的目标平台包括 ARM 架构的服务器。CRIU 主要在 x86 上开发和测试，ARM 支持一直是二等公民。

跑测试的时候发现 ARM 上 checkpoint 出来的镜像，restore 时会 segfault。排查了很久，发现是寄存器保存/恢复的代码里，ARM64 的 TPIDR_EL0（thread pointer）处理有问题。

修了之后给 CRIU 上游提了 PR。说实话提 PR 的时候挺紧张的——CRIU 社区的 maintainer 都是 Linux 内核级别的大佬，review 非常严格。但最终合进去了，也算是给开源社区做了一点微小的贡献。

## 坑 2：文件描述符的幽灵

Checkpoint 一个 Serverless 函数实例，最头疼的不是 CPU 状态，而是文件描述符。一个看似简单的 Python 函数，背后可能打开了几十个 fd——日志文件、临时文件、socket 连接、共享内存。

Restore 的时候，这些 fd 指向的资源可能已经不存在了。比如一个 Unix domain socket，checkpoint 的时候对端还在，restore 的时候对端早就退出了。

我们的方案是在 checkpoint 前做一次"fd 清洗"——关掉所有非必要的 fd，只保留核心状态。这需要对每种 runtime（Python、Node.js、Java）分别处理，因为每个 runtime 打开的 fd 模式完全不同。

## 坑 3：JVM 是另一个宇宙

Java 的冷启动是所有语言里最慢的。JVM 启动本身就要几秒，加上 class loading、JIT 编译，一个 Spring Boot 应用冷启动 10 秒是常态。

CRIU 对 JVM 的 checkpoint/restore 理论上可行，但实际上 JVM 内部有大量的时间相关状态（System.nanoTime、NIO 的 epoll fd、GC 线程的 timer）。Restore 之后这些状态全是错的。

我们最终的方案是在 JVM 层面做了 hook——在 checkpoint 前通知 JVM "你要被冻结了"，让它主动清理时间相关的状态；restore 后再通知它"你醒了"，重新初始化。这个方案后来被整理成了团队发在 [InfoQ 上的文章](https://www.infoq.cn/article/2knoj9si8cggm1em4ud3)。

## 效果

优化后的数据：

- Python 函数冷启动：从 ~3s 降到 ~200ms
- Java 函数冷启动：从 ~10s 降到 ~800ms
- AI 推理场景（TensorFlow）：从 ~30s 降到 ~2s

不是数量级的提升，但对用户体验来说是质变——从"明显卡顿"到"几乎无感"。

## 回头看

这段经历对我后来做 AI Agent 的影响比我预想的大。

Checkpoint/Restore 本质上是"保存状态 → 恢复状态"。AI Agent 的 trajectory logging 本质上也是"记录状态 → 回放状态"。CRIU 教会我的是：一个系统的状态远比你想象的复杂，你以为你保存了所有东西，但总有你没想到的 fd、timer、thread 在暗处等着你。

后来我在设计 [Lumos](https://github.com/SallyKAN/lumos) 的 Interceptor 机制时，"在关键节点拦截并记录完整状态"这个思路，直接来自 CRIU 的 checkpoint 设计。

另外，给 CRIU 上游提 PR 的经历，让我后来参与 [openJiuwen](https://gitcode.com/openJiuwen/agent-core) 社区时少了很多怯意。开源社区的 review 文化是相通的——严格但公平，只要你的代码是对的，没人在乎你是谁。

---

*这篇文章是 CRIU 系列的第二篇。第一篇 [Dive into CRIU (1)](/blog/2022-09-12-dive-into-criu-1-setup-and-dump-a-process) 更偏源码分析，这篇更偏工程实践。*
