---
title: "Same Model, Better Harness：我为什么要造一个自优化的 Agent 框架"
pubDate: 2026-04-10
layout: post
tags:
- AI
- Agent
- Lumos
- Self-Optimization
- Framework
---

2025 年我在 Cursor 上花了差不多 4000 块人民币。

不是因为它不好用——恰恰相反，它好用到让我产生了一种幻觉：AI 编程助手的能力取决于模型。GPT-4 比 GPT-3.5 强，Claude 3.5 比 Claude 3 强，所以我只需要等下一代模型，一切都会更好。

直到我开始深入 [openJiuwen agent-core](/blog/2025-12-28-agent-core-committer) 的 Harness 层，才发现这个假设是错的。

## 一个反直觉的发现

在 openJiuwen 社区里，我们做过一个实验：同一个 Claude Sonnet 模型，用不同的 Harness 配置（system prompt、工具注册方式、上下文管理策略），跑 GAIA benchmark。

结果差了 20 分。

不是换模型，不是加 GPU，只是换了"脚手架"。20 分。

这意味着什么？意味着大部分 AI coding agent 的瓶颈不在模型，而在模型外面那一层——system prompt 怎么写、上下文窗口怎么管理、工具调用失败怎么恢复、什么时候该停下来想一想。这些东西统称 Harness。

市面上所有的 Agent 框架都在做 Harness，但没有一个在做 Harness 的自动优化。每次想提升 Agent 表现，都是人去调 prompt、改策略、跑测试、看结果、再调。这个循环和 2018 年手动调超参数有什么区别？

## Lumos 的核心假设

```
Agent 能力 = f(Model, Harness)
Model 由 Anthropic/OpenAI 决定，你改不了。
Harness 是你能改的。
所以：优化 Agent = 优化 Harness。
而 Harness 优化应该是自动的。
```

这就是 [Lumos](https://github.com/SallyKAN/lumos) 的核心假设。一个能观察自己的行为、评估自己的表现、然后自动优化自己的 Harness 的 Agent 框架。

## 怎么做到的

Lumos 的架构分三层，对应三个动作：观察、评估、优化。

**观察：Interceptor + Trajectory**

每次 Agent 执行任务，Lumos 会在 10 个生命周期节点拦截并记录完整状态——LLM 请求前后、工具调用前后、错误发生时、任务完成时。这些记录叫 Trajectory，以 JSONL 格式保存。

拦截机制用的是洋葱模型（如果你写过 Koa 中间件就秒懂）：每个 Interceptor 可以在 `proceed()` 前后做事，多个 Interceptor 像洋葱一样层层包裹。优先级 0 在最外层，100 在最内层。

这个设计的好处是：你可以随时插入新的观察逻辑，不需要改 Agent 核心代码。比如我写了一个 `WriteRmLoopDetector`——检测 Agent 是否陷入了"写文件 → 删文件 → 写文件"的死循环。这种 bug 在 AI coding agent 里出奇地常见。

**评估：Evaluator**

有了 Trajectory，就可以评估 Agent 的表现。Lumos 内置了 `EfficiencyEvaluator`——衡量 Agent 完成任务用了多少 tool calls 和 tokens。

但评估不只是"跑了多少步"。更重要的是：Agent 有没有走弯路？有没有重复调用同一个工具？有没有在不需要的时候读了太多文件？这些都是 Harness 可以优化的地方。

**优化：Hill-Climbing + Git**

这是最有意思的部分。Lumos 的 Optimizer 用 hill-climbing 策略：

1. 跑一轮 benchmark，记录当前分数
2. 修改 Harness（调整 prompt、改变工具优先级、修改上下文策略）
3. 再跑一轮，比较分数
4. 分数提升 → keep（git commit）
5. 分数下降 → revert（git reset）
6. 重复

整个优化过程是 git-backed 的——每次 keep 都是一个 commit，每次 revert 都是一个 reset。你可以随时回溯到任意一个版本的 Harness。

这个设计灵感来自两个地方：一个是强化学习里的 policy gradient（试错 + 保留好的），另一个是区块链里的 commit-or-revert（要么全部生效，要么全部回滚）。

## Harness Package

优化出来的 Harness 怎么分发？Lumos 有一个 Harness Package 系统——类似 npm package，但装的不是代码，而是 Agent 的"能力配置"：

```
my-harness/
├── interceptors/    # 拦截器
├── tools/           # 工具定义
├── skills/          # 技能描述
├── prompts/         # prompt 模板
├── config/          # 配置
└── HARNESS.yaml     # 清单文件
```

`lumos harness install ./my-harness`，一行命令切换 Agent 的整套行为模式。

这意味着：一个人优化出来的 Harness，可以分享给所有人。Agent 的能力变成了可分发的包。

## 和 CRIU 的意外联系

写 Lumos 的时候，我发现自己不自觉地在用 [CRIU](/blog/2023-03-15-serverless-cold-start-criu) 的思维方式。

CRIU 的 checkpoint/restore 是"在关键时刻保存完整状态，需要时恢复"。Lumos 的 Interceptor + Trajectory 是"在关键节点拦截并记录完整状态，需要时回放分析"。

甚至 Optimizer 的 keep/revert 机制，本质上也是一种 checkpoint/restore——keep 是 checkpoint 一个好的状态，revert 是 restore 到上一个好的状态。

从 Serverless 冷启动到 AI Agent 自优化，底层的思维模型竟然是一样的：**状态管理是一切复杂系统的核心问题**。

## 现状

Lumos 目前完成了核心架构（Interceptor Engine、Trajectory Logger、Prompt Composer、Workspace System、Evaluator、Optimizer），206 个测试全部通过。还没有做公开的 benchmark 对比——这是接下来最重要的事。

我想证明的是：同一个模型，用 Lumos 优化 10 轮后的 Harness，比手动调的 Harness 表现更好。如果这个假设成立，那 Agent 框架的竞争就不再是"谁的功能多"，而是"谁的优化闭环更快"。

---

*Lumos 是开源项目。如果你也觉得 Agent 的瓶颈不在模型而在 Harness，欢迎来 [GitHub](https://github.com/SallyKAN/lumos) 聊聊。*
