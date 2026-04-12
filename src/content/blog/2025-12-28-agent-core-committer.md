---
title: "在一个千星 AI Agent 项目里写了三万行代码后"
pubDate: 2025-12-28
layout: post
tags:
- AI
- Agent
- OpenSource
- openJiuwen
---

2025 年初，我还在用 Cursor 写代码，一个月三百多刀的 subscription 交得心安理得。那时候我对 AI Agent 的理解停留在"一个能调用工具的 ChatGPT"——直到我开始读 openJiuwen agent-core 的源码。

那是一个让我意识到"我之前对 Agent 的理解全是错的"的时刻。

## 怎么开始的

说来惭愧，最初接触 openJiuwen 不是因为什么宏大的技术理想，而是因为工作需要。团队在评估 Agent 框架，LangChain 太重、AutoGPT 太玩具，openJiuwen 的 controller 架构看起来最接近我们想要的东西——一个真正能在生产环境跑的 Agent 框架。

我从提 issue 开始，然后修了几个小 bug，然后开始看核心模块的代码。看着看着就停不下来了。

不是因为代码写得多漂亮（开源项目嘛，你懂的），而是因为它解决的问题是对的。大部分 Agent 框架在解决"怎么让 LLM 调用工具"，openJiuwen 在解决"怎么让 Agent 在真实环境中可靠地完成任务"。这两个问题之间的距离，比大多数人想象的要远得多。

## 我做了什么

到现在为止，我在 agent-core 里贡献了 34,000+ 行代码，是 [72 个贡献者里排第 6](https://gitcode.com/openJiuwen/agent-core/contributors)。主要做了这些事：

**Harness 框架**

这是我投入最多的部分。Harness 是 openJiuwen 里 Agent 的"脚手架"——它定义了 Agent 怎么组装 system prompt、怎么管理上下文、怎么注册工具、怎么处理异常。

一个反直觉的发现：同一个 LLM，换一套 Harness，在 GAIA benchmark 上的得分可以差 20 分。模型能力是地基，但 Harness 才是决定 Agent 实际表现的东西。

这个认知后来直接催生了我自己的项目 [Lumos](https://github.com/SallyKAN/lumos)——一个把 Harness 优化做成自动化闭环的框架。

**Controller 架构**

Controller 是 Agent 的"大脑"——它决定下一步做什么。听起来简单，但当你要处理工具调用失败、上下文溢出、多轮对话状态管理、并发请求隔离这些问题时，一个 controller 的复杂度会指数级增长。

我参与重构了 controller 的状态机，把原来的 if-else 地狱改成了事件驱动的架构。这个改动让 controller 的可测试性提升了一个量级——之前写一个集成测试要 mock 半天，现在可以直接注入事件序列来测试任意状态转换路径。

**九问商用版的落地**

agent-core 开源是 2025 年 12 月的事，但在那之前，基于它的商用版本已经在金融领域落地了。我参与了商用版的交付，把一个开源框架适配到金融机构的合规要求、安全审计、面客场景。

这个过程教会我一件事：开源框架和生产系统之间的距离，不是"加个鉴权"那么简单。是日志脱敏、是审计追踪、是故障降级、是"这个 Agent 说错话了谁负责"。

## 开源协作的真实体验

我以为开源协作是"你提 PR 我 review 然后 merge"。实际上是：

你提了一个 PR，maintainer 说"方向不对，应该这样设计"。你改了，另一个 reviewer 说"这样会破坏向后兼容"。你又改了，CI 挂了因为你没跑某个 edge case 的测试。你修了 CI，原来的 maintainer 说"我重新想了一下，你最初的方向其实是对的"。

这个过程很折磨人，但也是我技术成长最快的阶段。因为每一次 review 都在逼你思考"为什么"——不是"这段代码能不能跑"，而是"这个设计决策在三个月后会不会变成技术债"。

最近有个新的烦恼：越来越多的 contributor 开始用 AI 生成代码来提 PR。代码看起来没问题，测试也过了，但你能感觉到提交者并不真正理解自己写了什么。作为 reviewer，你要花更多时间去判断"这个人是真的想通了还是 Claude 帮他想通的"。

这大概是 2026 年开源社区面临的新挑战：当提交代码的成本趋近于零，审查代码的成本反而更高了。

## 后来

openJiuwen 的经历改变了我对 AI Agent 的理解。之前我觉得 Agent 就是"LLM + 工具调用"，现在我觉得 Agent 是一个完整的软件系统——它有架构、有状态管理、有可观测性、有生命周期。LLM 只是其中一个组件。

这个认知直接导致了两件事：

1. 我开始做 [Lumos](https://github.com/SallyKAN/lumos)——一个自优化的 Agent 框架。核心假设是：Agent 的能力取决于 Harness 而非模型本身，而 Harness 应该能自动优化。
2. 我开始做 [claw-mesh](https://github.com/SallyKAN/claw-mesh)——一个跨机器的 Agent 编排器。因为我发现单机 Agent 的天花板很低，真正有用的 Agent 需要能调度多台设备的能力。

回头看，参与 openJiuwen 最大的收获不是写了多少行代码，而是从"鞭笞 AI 干活"变成了"理解 AI 怎么工作"。这个转变听起来很小，但它决定了你是在用 AI，还是在造 AI。

---

*openJiuwen agent-core 已于 2025 年 12 月开源，Harness 框架于 2026 年 4 月开源。项目被 [Tech in Asia](https://www.techinasia.com/openjiuwen-community-launches-agent-jiuwenclaw-focused-selfevolution-task-management) 和 [MarkTechPost](https://www.marktechpost.com/2026/03/27/openjiuwen-community-releases-jiuwenclaw-a-self-evolving-ai-agent-for-task-management/) 报道。*
