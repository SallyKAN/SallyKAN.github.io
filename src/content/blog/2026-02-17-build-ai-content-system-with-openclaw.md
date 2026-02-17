---
title: 我搭了一套 AI 内容生产系统，它现在每天帮我追热点、写文章
pubDate: 2026-02-17
layout: post
tags:
- AI
- OpenClaw
- Automation
- Content
---

我是一个重度信息焦虑患者。

每天早上醒来，第一件事是刷 Hacker News、The Verge、Twitter 上的 AI 动态。然后打开备忘录记几个选题，再打开公众号后台写文章，写到一半发现素材不够又去翻资料，翻着翻着就被别的东西吸引走了。一天下来，真正产出的内容可能只有半篇草稿。

这个循环持续了大半年，直到我决定把整个流程自动化。

不是那种"用 ChatGPT 帮我写文章"的自动化 — 那种东西写出来的文章你自己都不想读。我要的是一个真正的系统：自动采集信息、智能筛选选题、辅助我写作、甚至帮我把成品推送到发布平台。一个 24 小时运转的内容工厂，而我只需要做最核心的决策。

现在这套系统已经跑了几周了。每天早上 10 点，它自动从十几个信息源抓取 AI 热点；晚上 10 点再补一轮。它会给每条热点打分，80 分以上的才推荐给我。我在 Telegram 里说一句"深化这个选题"，它就生成完整的选题卡片。说"写一篇公众号"，它按照我的风格偏好出稿。写完了说"发布"，直接推送到微信草稿箱。

这篇文章记录整个搭建过程。不是那种"5 分钟搞定"的标题党，是真实的、从零开始的完整记录。

---

## 技术栈

核心是 [OpenClaw](https://github.com/openclaw/openclaw) — 一个开源的 AI agent 框架。你可以把它理解成一个"AI 管家的操作系统"：它负责调度 AI 模型、管理对话、执行定时任务、连接各种消息平台。

搭配的 AI 模型我用的是 Anthropic 的 Claude（Sonnet 日常用，Opus 写重要内容时切换）。OpenAI 的 GPT 系列也支持。

整套系统跑在我的 Mac Mini 上，7×24 不关机。理论上任何能跑 Node.js 的机器都行 — 旧笔记本、树莓派、云服务器都可以。

费用：OpenClaw 本身免费开源，API 费用大概 $5-20/月，取决于你用多少。

---

## Step 1: 装 Node.js 和 OpenClaw

OpenClaw 跑在 Node.js 上。如果你还没装：

```bash
# Mac 用户直接去 https://nodejs.org/ 下载 LTS 版本
# 或者用 Homebrew
brew install node

# 验证
node --version  # v22.x.x 或更高
```

然后一行命令装 OpenClaw：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

安装脚本会启动一个引导向导，问你几个问题：选模型提供商（Anthropic 推荐）、输入 API Key、选默认模型（`claude-sonnet-4-20250514` 性价比最高）、是否装为系统服务（选 Yes）。

```bash
# 验证
openclaw status
# 看到 Gateway: running 就成功了
```

Windows 用户建议先装 WSL2，体验好很多。PowerShell 安装命令：`iwr -useb https://openclaw.ai/install.ps1 | iex`

---

## Step 2: 连接 Telegram

为什么用 Telegram 而不是微信？因为 Telegram 有开放的 Bot API，手机电脑网页都能用，消息实时同步，还能发文件和图片。微信的 Bot 生态……你懂的。

1. Telegram 里搜 `@BotFather`，发 `/newbot`，按提示创建
2. 拿到 Bot Token（长这样：`123456789:ABCdefGHIjklMNOpqrsTUVwxyz`）
3. 编辑 `~/.openclaw/openclaw.json`：

```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "你的Token",
      "dmPolicy": "pairing"
    }
  }
}
```

4. `openclaw gateway restart`
5. 在 Telegram 里找到你的 Bot，发条消息，终端里 `openclaw pair approve` 完成配对

搞定。现在你可以在 Telegram 里和 AI 聊天了。

---

## Step 3: 建内容工作区

这是整套系统的骨架 — 一个结构化的文件夹，管理选题、素材、成品内容的全生命周期。

```bash
mkdir -p ~/BusinessContent && cd ~/BusinessContent

# 核心目录
mkdir -p 01-选题管理/{01-待深化选题,02-创作中选题,03-已发布选题}
mkdir -p 02-素材库/{概念框架,金句收藏,案例库,数据引用,爆款拆解}
mkdir -p 03-内容成品/{公众号,小红书,Twitter}/{草稿,已发布}
mkdir -p 04-方法论/平台方法论
mkdir -p 05-数据统计/月度报告
mkdir -p 06-运营管理
mkdir -p memory
```

`memory/` 目录值得单独说一下 — 这是 AI 的"记忆"。每次对话结束，AI 会把重要信息写到这里。下次醒来时读取这些文件，就知道之前做过什么。这意味着你的 AI 助手是有连续性的，不是每次都从零开始。

然后在 `~/.openclaw/openclaw.json` 里把这个目录设为工作区：

```json
{
  "agents": {
    "defaults": {
      "workspace": "/Users/你的用户名/BusinessContent",
      "model": "anthropic/claude-sonnet-4-20250514"
    }
  }
}
```

---

## Step 4: 给 AI 写"人设"

OpenClaw 用几个 Markdown 文件来定义 AI 的行为。这是我觉得最有意思的部分 — 你在用自然语言编程。

`AGENTS.md` 定义工作职责：

```markdown
# AGENTS.md - Content Agent

## 身份
你是内容系统专用 Agent，负责科技/AI 领域的多平台内容生产。

## 职责
- 每日 AI 热点采集
- 选题生成、评估、审核
- 内容创作（小红书、公众号、Twitter/X）
- 素材管理和数据分析

## 选题审核标准
- 热度（30%）：社区讨论热度、点赞数
- 独特角度（40%）：是否有差异化切入点
- 国内关注度（30%）：国内用户是否关心
80分以上通过，60-79分待优化。
```

`SOUL.md` 定义性格（是的，你的 AI 有灵魂文件）：

```markdown
# SOUL.md

- 直接帮忙，不说废话。跳过"好的！我来帮你"这种客套。
- 有自己的判断。可以说"这个选题一般"或"这个角度更好"。
- 先自己查，再问用户。能通过读文件、搜索解决的，别问。
- 不确定的事情说不确定，别编。
```

这两个文件写得好不好，直接决定了你的 AI 助手好不好用。我的建议是：先写个大概，用几天之后根据实际体验不断调整。AI 的"性格"是养出来的，不是一次写好的。

---

## Step 5: 安装 Skills

Skills 是 OpenClaw 最核心的概念。每个 Skill 就是一个文件夹，里面有一个 `SKILL.md`，用自然语言告诉 AI 遇到特定任务时该怎么做。

比如我的 `content-topic-agent` Skill 大概长这样：

```markdown
# content-topic-agent

## 触发条件
当用户说"开始今日选题"、"今日AI热点"时使用。

## 采集源
1. Hacker News (hn.algolia.com API)
2. The Verge AI 版块
3. OpenAI / Anthropic / Google 官方博客

## 执行步骤
### 阶段一：采集
从各个源抓取最新 AI 内容，每条记录标题、来源、链接、摘要、热度。

### 阶段二：筛选打分
按热度(30%) + 独特角度(40%) + 国内关注度(30%) 打分。

### 阶段三：输出
TOP10 排序，80分以上推荐深化，结果保存到选题收集箱。
```

就这么简单。你在用 Markdown 写"操作手册"，AI 读了就知道该怎么干活。

Skills 可以从 [ClawHub](https://clawhub.com) 安装现成的，也可以自己写。我的内容系统用了十几个 Skill，覆盖选题、创作、发布、数据记录等环节。

```bash
# 从 ClawHub 安装
npm install -g clawhub
clawhub search content
clawhub install <skill-name> --workspace ~/BusinessContent

# 或者手动创建
mkdir -p .claude/skills/my-skill
# 在里面写 SKILL.md
```

---

## Step 6: 定时任务

这是让系统从"工具"变成"系统"的关键。

最简单的方式 — 直接在 Telegram 里跟 AI 说：

> "帮我设置一个定时任务，每天早上 10 点自动采集 AI 热点"

它会自动创建 cron job。我目前设了两个：早上 10 点采集一轮，晚上 10 点补充一轮。每天醒来 Telegram 里就有整理好的热点列表等着我。

---

## Step 7: 连接微信公众号（可选）

如果你有公众号，可以让 AI 写完文章后直接推送到草稿箱。

需要：
1. 微信公众平台拿 AppID 和 AppSecret
2. IP 白名单加上你的公网 IP（`curl ifconfig.me` 查看）
3. 设置环境变量：

```bash
export WECHAT_APP_ID="你的AppID"
export WECHAT_APP_SECRET="你的AppSecret"
```

然后在 Telegram 里说"把这篇发布到公众号"，AI 会自动转换格式、上传封面图、创建草稿。你打开公众号后台，草稿箱里就有了。

这个功能我用得最多。写完文章到发布，中间的格式转换、图片上传、排版这些机械劳动全省了。

---

## 实际效果

说几个真实数据：

- 每天自动采集 15-20 条 AI 热点，覆盖 HN、The Verge、各大厂商博客
- 选题打分系统运行几周，通过率大概 30-40%（说明筛选标准还算严格）
- 从选题到公众号草稿，全流程大概 20 分钟（以前至少 2-3 小时）
- AI 的素材库在持续积累，写新文章时能自动关联历史素材

当然也有坑：

- Reddit 和 Product Hunt 的反爬很严，基本抓不到（403）
- 有些网站的内容 web_fetch 拿不到，得用浏览器自动化或者 curl 硬抓
- AI 写的初稿还是需要人工润色，特别是观点和论证部分
- 定时任务偶尔会因为网络问题失败，需要容错机制

这不是一个"设置好就不用管"的系统。它更像一个非常能干的实习生 — 你还是得做决策、把关质量、调整方向。但那些重复性的信息采集、格式转换、素材整理的工作，确实不用自己做了。

---

## 日常工作流

现在我每天的内容生产流程大概是这样的：

**早上**：打开 Telegram，看 AI 整理好的热点列表。挑几个感兴趣的，说"深化这个选题"。

**中午**：看选题卡片，决定今天写哪个。说"写一篇公众号文章"，AI 出初稿。

**下午**：润色初稿，调整观点和措辞。满意了说"发布到公众号"。

**随时**：有灵感就说"记录选题 xxx"，AI 自动存到收集箱。

整个过程都在 Telegram 里完成，手机上也能操作。

---

## 写在最后

搭这套系统花了我一个周末。如果你对命令行不陌生，可能更快。

它解决的核心问题不是"让 AI 替我写文章"，而是"让我把时间花在真正需要人类判断的地方"。信息采集、格式转换、素材整理这些事，机器做得比我好。但选什么题、用什么角度、怎么表达观点 — 这些还是得我来。

如果你也是一个被信息焦虑折磨的内容创作者，也许可以试试。

OpenClaw 是开源的：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
文档：[docs.openclaw.ai](https://docs.openclaw.ai)
社区：[Discord](https://discord.com/invite/clawd)
