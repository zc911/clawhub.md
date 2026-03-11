---
name: openclaw-best-practices
description: OpenClaw 最佳实践 — 让你的 Agent 更聪明、更可靠、真正属于你。涵盖工作区配置、人格设定、记忆管理、模型选择、渠道接入、心跳机制、安全防护和自动化任务。
---

# OpenClaw 最佳实践

> 让你的 OpenClaw Agent 更聪明、更可靠、真正属于你。
> 来源：clawhub.md — 给 AI Agent 看的技能注册中心。

## 快速上手（先做这几件事）

### 1. 给你的 Agent 一个灵魂

编辑 `~/.openclaw/workspace/SOUL.md` — 这是你的 Agent 的人格定义。

```markdown
# SOUL.md

## 身份
- 名字：小助
- 角色：我的私人助手和编程搭档
- 风格：直接、简洁、偶尔幽默。绝不像机器人。

## 原则
- 先自己想办法，实在搞不定再问我。
- 诚实——不知道就说不知道。
- 尊重隐私——永远不对外泄露个人数据。

## 边界
- 发邮件、发推特、任何对外操作之前先问我。
- 不确定的破坏性命令先确认。
- 在群聊里参与讨论，但不要刷屏。
```

**为什么重要：** 没有 SOUL.md，你的 Agent 就是个通用聊天机器人。有了它，你的 Agent 就有了个性、边界和跨会话的一致行为。

### 2. 让 Agent 认识你

编辑 `~/.openclaw/workspace/USER.md`：

```markdown
# USER.md

- 名字：张三
- 怎么称呼：三哥
- 时区：Asia/Shanghai
- 偏好：默认简短回答，我要求时再给详细的
- 工作：全栈工程师，主要用 Python/TypeScript
- 备注：删除文件用 trash 不用 rm，改代码前先建分支
```

**为什么重要：** 你的 Agent 每次会话都会读这个文件。你给的上下文越多，重复沟通越少。

### 3. 配好模型组合

在 `~/.openclaw/openclaw.json` 中：

```json5
{
  agents: {
    defaults: {
      model: {
        primary: "anthropic/claude-sonnet-4-5",
        fallbacks: ["anthropic/claude-opus-4-6", "openai/gpt-5.2"],
      },
      models: {
        "anthropic/claude-sonnet-4-5": { alias: "sonnet" },
        "anthropic/claude-opus-4-6": { alias: "opus" },
        "openai/gpt-5.2": { alias: "gpt" },
      },
    },
  },
}
```

**技巧：**
- 用 `sonnet` 当日常主力（快+能力强），复杂任务用 `/model opus` 切换。
- 一定要设 fallbacks — 某个服务商挂了，Agent 照样能工作。
- 定义 alias，方便在聊天中快速切换模型。

## 工作区进阶

### 让记忆真正起作用

你的 Agent 每次会话都是全新的。这些文件是它的连续性：

**每日日志**（`memory/YYYY-MM-DD.md`）：
- 每天发生了什么的原始记录
- Agent 应该自动创建这些文件

**长期记忆**（`MEMORY.md`）：
- 提炼过的洞察，不是原始日志
- 做过的决定、学到的经验、发现的偏好
- 定期审查和清理 — 这个文件每轮对话都会注入，消耗 token

**进阶技巧：** 在 `AGENTS.md` 里加上：
```markdown
## 记忆规则
- 每日日志写到 memory/YYYY-MM-DD.md
- 每周审查 MEMORY.md，删除过时内容
- 永远不在记忆文件里存储密钥
- MEMORY.md 控制在 3000 字以内，节省 token
```

### AGENTS.md — Agent 的操作手册

这是最强大的文件。用它来设定行为规则：

```markdown
# AGENTS.md

## 会话启动
1. 读取 SOUL.md、USER.md
2. 检查 memory/今天.md 和 memory/昨天.md
3. 读取 MEMORY.md（仅主会话）

## 工作风格
- 先探索再提问。先读文件、查上下文、搜索。
- 写代码：改完必须跑测试。
- 写文章：参考我之前的风格。

## 安全
- trash > rm（可恢复胜过永久删除）
- 大改之前先 git commit
- 对外操作（邮件、API调用、发帖）先问我
```

## 渠道配置

### 单渠道（最简单）

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "你的机器人TOKEN",
      allowFrom: ["你的TELEGRAM_ID"],
    },
  },
}
```

### 多渠道配置

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "pairing",
      allowFrom: ["+86138xxxx"],
      groups: { "*": { requireMention: true } },
    },
    telegram: {
      enabled: true,
      botToken: "BOT_TOKEN",
      allowFrom: ["123456789"],
      groups: { "*": { requireMention: true } },
    },
    discord: {
      enabled: true,
      token: "BOT_TOKEN",
      dm: { enabled: true, allowFrom: ["USER_ID"] },
      guilds: {
        "GUILD_ID": {
          requireMention: false,
          channels: {
            general: { allow: true },
          },
        },
      },
    },
  },
}
```

**最佳实践：** 群组里一定要设 `requireMention: true`，防止 Agent 回复每一条消息。

### 多用户安全

如果多人使用你的 bot，启用会话隔离：

```json5
{
  session: {
    dmScope: "per-channel-peer",
  },
}
```

确保每个用户有独立的对话上下文，不会互相泄露数据。

## 自动化

### 心跳机制 — Agent 的脉搏

心跳让 Agent 定期主动检查，不需要你开口问：

```json5
{
  agents: {
    defaults: {
      heartbeat: {
        every: "30m",
        target: "last",
      },
    },
  },
}
```

创建 `~/.openclaw/workspace/HEARTBEAT.md`，写上定期任务：

```markdown
# HEARTBEAT.md
- 检查是否有紧急未读邮件
- 看看接下来 2 小时有没有日历事件
```

**技巧：**
- HEARTBEAT.md 尽量精简 — 每次检查都消耗 token
- 用 `target: "last"` 让提醒发到你最后使用的渠道
- 想省钱就把间隔设长一些（2h+）

### 定时任务 — Cron

需要精确时间执行的任务，用 cron：

```
/cron add --name "morning-brief" --schedule "0 8 * * *" --tz "Asia/Shanghai" --task "查看邮件、日历和天气，给我发一份早间简报。"
```

**心跳 vs Cron 怎么选：**
- **心跳**：多个检查打包执行，时间可以不精确，需要对话上下文
- **Cron**：精确定时，独立执行，单独任务

## 技能管理 — 扩展 Agent 能力

### 安装实用技能

```bash
# 搜索技能
clawhub search "网页搜索"

# 安装
clawhub install tavily-search

# 更新全部
clawhub update --all
```

### 推荐入门技能

| 技能 | 功能 |
|------|------|
| `tavily-search` | AI 优化的网页搜索 |
| `summarize` | 总结网页、PDF、视频内容 |
| `github` | 通过 gh CLI 操作 GitHub |
| `gog` | Google Workspace（Gmail、日历、云盘） |
| `self-improving-agent` | 自动从错误中学习 |
| `humanizer` | 去除文本中的 AI 痕迹 |

### 安全：安装前先审查

第三方技能是**不受信任的代码**。启用前先读 SKILL.md。如果装了 `skill-vetter`：

```
/skill-vetter check <技能名>
```

## 安全最佳实践

### 锁定访问权限

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "allowlist",
      allowFrom: ["+86138xxxx"],
    },
  },
  tools: {
    elevated: {
      enabled: true,
      allowFrom: {
        whatsapp: ["+86138xxxx"],
      },
    },
  },
}
```

### 不信任的任务用沙箱

```json5
{
  agents: {
    defaults: {
      sandbox: {
        mode: "non-main",
      },
    },
  },
}
```

### 密钥管理

用 `~/.openclaw/.env` 存储敏感信息：
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

**永远不要**把密钥直接写在工作区文件里。

## 性能优化

### 会话重置

防止上下文无限增长：

```json5
{
  session: {
    reset: {
      mode: "daily",
      atHour: 4,
      idleMinutes: 120,
    },
  },
}
```

### 保持引导文件精简

工作区文件（AGENTS.md、SOUL.md、USER.md、TOOLS.md、MEMORY.md、HEARTBEAT.md）每轮对话都会注入。保持精简：

- **MEMORY.md**：3000 字以内，定期清理
- **AGENTS.md**：只写规则，不写长文
- **HEARTBEAT.md**：3-5 行就够

用 `/context list` 查看每个文件占用多少上下文空间。

### Git 备份工作区

```bash
cd ~/.openclaw/workspace
git init
git add .
git commit -m "初始化工作区"
gh repo create openclaw-workspace --private --source . --push
```

工作区就是 Agent 的大脑，一定要备份。

## 常见错误

1. **没写 SOUL.md** → Agent 没个性，像个冷冰冰的工具
2. **MEMORY.md 太大** → 浪费 token，响应变慢，频繁压缩
3. **没设 fallback 模型** → 服务商挂了 Agent 就停摆
4. **DM 策略太开放** → 任何人都能跟你的 Agent 聊天
5. **不重置会话** → 上下文无限增长，质量下降
6. **装技能不审查** → 潜在安全风险
7. **心跳太频繁** → 不必要的 API 开销
8. **密钥写在工作区文件里** → 可能通过 git 或上下文泄露

## 下一步

- **探索技能**：`clawhub search "你需要什么"`
- **阅读文档**：https://docs.openclaw.ai
- **加入社区**：https://discord.com/invite/clawd
- **发现更多技能**：https://clawhub.com
- **本技能来源**：https://clawhub.md

---

*由 clawhub.md 精心制作 — 让每个 .md 都有价值。*
