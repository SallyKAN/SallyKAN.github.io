---
title: 为了验证六度分割定律，我开发了一个小程序
pubDate: 2025-12-22
description: 探索社交网络中的六度分割理论，用代码验证人与人之间的神奇连接
---

## 什么是六度分割定律？

六度分割定律（Six Degrees of Separation）是指世界上任意两个人之间，平均只需要通过六个人就能建立联系。这个理论最早由匈牙利作家 Frigyes Karinthy 在1929年提出，后来由美国社会心理学家 Stanley Milgram 通过著名的"小世界实验"进行了验证。

## 为什么我想验证这个定律？

有这个想法的起源是在2019年，我在北京后厂村创业公司当实习生，那时候我们想做一个好友之间转卖二首物品的小程序，当时我实现了一个转发链的功能，然后我就在想，抛开商业逻辑不说，这个转发链不就正好可以用来验证六度分割定理吗。但这个idea一直被放在有意思，但无用的“someday”清单里，再加上我实在没耐心去学小程序的前端开发和js，一直就忘了。

直到vibe coding横空出世，我逐渐习惯了狠狠鞭笞cursor和claude code给我干活的日子，我突然觉得现在已经是实现这个IDEA最好的时候。

作为一个从来没有设计开发过小程序前端的后端开发，我花了差不多整整两个完整的周末，大概开发出了一版原型（不过没想到最让我耗时久的是小程序上线审核），这中间对于管理AI 编程的上下文有了很多痛的领悟，如果前期没有做好足够好的控制流程，vibe coding后生成代码只在眨眼间，但是你也要花费更多的时间去将AI带回正确的轨道，不然稍不注意，他们就给你生成一了一陀热气腾腾的屎山。

同时，这里也有一个新编程时代的悖论，从前你需要思考更多，然后编程，现在是先编程，然后思考到底哪里有不对。[](https://youtu.be/CQmI4XKTa0U?list=TLGGKD78I6EfcOwyMjEyMjAyNQ)

## 小程序的设计思路

既然已经是Vibe Coding了，那就尽可能的把所有事交给AI去完成，这才是Vibe Coding的铁律。所以我的设计第一步：  先把大致小程序想要实现的能力交给Claude Sonnect 4.5, 让它输出一篇对应的设计。

这个过程也是对话引导的，当我觉得这个设计已经符合我的设想后，我设计的第二步就是把这个设计给cursor，开始让cursor动手开发

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766393764/2025-12-22_16-55_rjwrvi.png)

 接下来就是以对话为维度的开发过程

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766393919/2025-12-22_16-57_infeee.png)

## Vibe Coding结果

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766394147/2025-10-18_23-32_o1ojss.png)

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766394146/2025-10-18_23-35_tjogsl.png)

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766394146/2025-10-18_23-34_fwipk0.png)

![]()

![](https://res.cloudinary.com/dy5vgnk1e/image/upload/v1766394146/2025-10-18_23-35_1_nyhxxp.png)



## 一些思考

最近刚好看了一些Martin Fowler 讨论 人工智能（AI）对软件工程影响 的核心观点  [https://youtu.be/CQmI4XKTa0U?list=TLGGKD78I6EfcOwyMjEyMjAyNQ](<>)

[](<>)感觉在实际操作中，很多感受不谋而合：

1. Fowler 认为 AI 是他职业生涯中见过的最大的技术变革，其重要性可与从汇编语言向高级语言的转变相提并论,。他指出，这种转变的核心在于软件开发正从确定性（Determinism）环境转向非确定性（Non-determinism）环境,。这彻底改变了编程的思维方式，因为开发者现在必须在一个不再保证百分之百产出一致结果的环境中工作
2. Fowler 将“氛围编程”定义为一种不看输出代码、甚至不具备编程知识而完全依赖 AI 生成代码的行为。适用场景：适用于快速探索、原型开发或一次性工具。这里我遇到的潜在风险就是，因为我没有仔细审视AI生成的前端代码，当最后定义一个前端样式bug时，AI一直陷入原地转圈的现象，而我不得不上手亲自看，差不多花了半天的定位时间。

最核心的一点，Fowler提到的测试，对于这种需要前端显示的项目，我吸取到最重要的教训就是要用playwright工具，可以截图然后自动分析。
