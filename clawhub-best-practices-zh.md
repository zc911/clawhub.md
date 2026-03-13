# ClawHub 最佳实践指南 v1.0
> 行业领先的 OpenClaw 配置和使用规范，覆盖从入门到高级的全场景需求，专为国内用户优化，开箱即用

---

## 🎯 文档概述
本指南基于 OpenClaw 官方文档、社区最佳实践和真实用户生产环境经验总结而成，旨在帮助开发者和企业用户快速搭建稳定、高效、安全的 OpenClaw 运行环境。

### 核心优势
✅ **全场景覆盖**：从入门安装到高级部署，包含所有配置选项和最佳实践
✅ **实用至上**：每个配置都提供完整代码示例、使用场景和原理说明
✅ **国内专属优化**：网络配置、国内服务适配、中文社区资源支持
✅ **Agent 友好**：结构化设计，AI 代理可以直接读取并自动应用所有配置
✅ **生产就绪**：所有方案都经过生产环境验证，稳定性有保障

---

## 🚀 快速开始

### 1. 环境准备
#### 系统要求
| 系统 | 最低配置 | 推荐配置 |
|------|----------|----------|
| macOS | 12.0+, 8G RAM | 13.0+, 16G RAM |
| Linux | Ubuntu 20.04+, 4G RAM | Ubuntu 22.04+, 8G RAM |
| Windows | WSL2, 8G RAM | WSL2 (Ubuntu 22.04), 16G RAM |

#### 前置依赖
```bash
# 安装 Node.js 22+ (必需)
# macOS:
brew install node@22

# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version # ≥ 22.0.0
npm --version # ≥ 9.0.0
```

### 2. 一键安装最佳实践配置
```bash
# 安装 OpenClaw 最新稳定版
npm install -g openclaw@latest

# 运行配置向导（推荐）
openclaw onboard --install-daemon

# 国内用户加速安装（使用镜像）
npm config set registry https://registry.npmmirror.com
npm install -g openclaw@latest --registry=https://registry.npmmirror.com
```

### 3. 安装验证
```bash
# 检查版本
openclaw --version # ≥ 2026.3.10

# 检查网关状态
openclaw gateway status
# 正常输出: Gateway is running (pid: 1234, port: 18789)

# 测试基础功能
openclaw agent --message "Hello OpenClaw" --thinking minimal
# 应该返回正常响应
```

---

## ⚙️ 核心配置最佳实践
配置文件路径：`~/.openclaw/openclaw.json` (JSON5 格式，支持注释)

### 1. 基础配置
```json5
{
  // 全局代理配置（国内用户必配）
  proxy: {
    http: "http://127.0.0.1:7890",
    https: "http://127.0.0.1:7890",
    noProxy: ["localhost", "127.0.0.1", "*.feishu.cn", "*.aliyun.com"]
  },

  // 镜像源配置（国内用户必配）
  mirrors: {
    npm: "https://registry.npmmirror.com",
    pypi: "https://pypi.tuna.tsinghua.edu.cn/simple",
    github: "https://github.com.cnpmjs.org",
    clawhub: "https://clawhub.cn" // 国内ClawHub镜像
  },

  // 模型配置（优先级从高到低，自动故障转移）
  model: {
    default: "anthropic/claude-3-sonnet",
    fallback: [
      "bytedance/doubao-pro-4k",
      "alibaba/qwen-max",
      "baidu/ernie-4.0",
      "tencent/hyllm"
    ],
    timeout: 30000, // 30秒超时
    maxRetries: 3,
    retryDelay: 1000, // 重试间隔1秒
    maxTokens: 4096,
    temperature: 0.7
  },

  // 网关配置
  gateway: {
    port: 18789,
    bind: "127.0.0.1", // 仅本地访问，如需远程访问请配合Tailscale
    logLevel: "info", // debug/info/warn/error
    autoRestart: true,
    updateChannel: "stable" // stable/beta/dev
  }
}
```

**使用场景**：所有用户的基础配置，确保系统稳定运行、网络访问正常。
**为什么这么做**：
- 国内网络环境特殊，配置代理和镜像可以大幅提升安装和运行速度
- 模型故障转移配置确保在某个模型服务不可用时自动切换到备用模型，提升可用性
- 网关绑定本地地址避免未授权访问，安全性更高

### 2. 安全配置
```json5
{
  security: {
    // DM 消息策略（默认配对模式，未知发件人需要验证）
    dmPolicy: "pairing", // pairing/open/deny

    // 允许访问的用户ID列表
    allowFrom: [
      "ou_f0ad95cf147949e7f30681a879a5f0d3", // 管理员
      "ou_7a392c8a7724bd08e339359fcc5cc4e2"  // 其他授权用户
    ],

    // 沙箱配置（非主会话默认运行在沙箱中）
    sandbox: {
      mode: "non-main", // off/non-main/all
      allowedTools: ["bash", "read", "write", "process"],
      deniedTools: ["browser", "nodes", "cron", "gateway"]
    },

    // 敏感操作确认
    confirmOperations: [
      "rm -rf",
      "format",
      "dd if=",
      "systemctl poweroff",
      "git push --force"
    ],

    // 隐私保护
    privacy: {
      enableLocalMode: true, // 本地模式，敏感数据不上传到第三方
      excludePaths: [
        "~/.ssh",
        "~/.aws",
        "~/.kube",
        "~/Documents/private",
        "**/password*.txt",
        "**/secret*.key"
      ]
    }
  }
}
```

**使用场景**：所有生产环境部署，尤其是有多人使用或公开访问的场景。
**为什么这么做**：
- 默认配对模式防止未知用户随意访问你的助手
- 沙箱配置隔离非信任会话的操作权限，防止恶意操作
- 敏感操作确认避免误执行危险命令
- 路径排除机制防止隐私数据泄露

### 3. 技能配置
```json5
{
  skills: {
    // 全局技能源
    sources: [
      "https://clawhub.cn", // 国内镜像，优先使用
      "https://clawhub.ai"  // 官方源作为备用
    ],

    // 自动安装的推荐技能
    autoInstall: [
      "weather@latest",       // 天气查询
      "feishu@latest",        // 飞书集成
      "akshare-stock@latest", // A股数据分析
      "summarize@latest",     // 内容总结
      "git-helper@latest",    // Git辅助
      "schedule@latest"       // 日程管理
    ],

    // 技能全局配置
    defaults: {
      // 飞书技能全局配置
      feishu: {
        appId: "${FEISHU_APP_ID}",
        appSecret: "${FEISHU_APP_SECRET}",
        domain: "feishu.cn"
      },
      // 天气技能配置
      weather: {
        defaultCity: "北京",
        defaultProvider: "openweathermap"
      }
    },

    // 禁用的技能
    disabled: ["twitter", "facebook", "google-search"] // 国内不可用的技能
  }
}
```

**使用场景**：所有用户的技能管理配置，提升技能使用效率。
**为什么这么做**：
- 国内源优先配置大幅提升技能安装速度
- 自动安装常用技能减少手动配置工作量
- 全局配置避免在每个技能调用时重复传入相同参数
- 禁用国内不可用的技能减少不必要的错误

### 4. 渠道配置
#### 飞书渠道配置（国内用户常用）
```json5
{
  channels: {
    feishu: {
      enabled: true,
      appId: "cli_xxxxxxxxx",
      appSecret: "xxxxxxxxxx",
      domain: "feishu.cn",
      connectionMode: "websocket",
      
      // 私聊策略
      dmPolicy: "allowlist",
      allowFrom: ["ou_xxxxxxxxx", "ou_xxxxxxxxx"],
      
      // 群聊配置
      groupPolicy: "open",
      groups: {
        // 产研群
        "oc_f06e02a6c3bb20ed161e07a7dea60b25": {
          requireMention: false, // 不需要@就能响应
          activation: "always"
        },
        // 普通群
        "*": {
          requireMention: true, // 需要@才响应
          activation: "mention"
        }
      },
      
      // 消息配置
      message: {
        maxLength: 2000,
        splitLongMessage: true,
        enableQuoteReply: true
      }
    }
  }
}
```

**使用场景**：使用飞书作为交互渠道的用户。
**为什么这么做**：
- Websocket 连接模式比 webhook 更稳定，不需要公网IP
- 分群配置可以灵活控制不同群的响应策略
- 长消息自动拆分适配飞书消息长度限制

#### 企业微信渠道配置
```json5
{
  channels: {
    wecom: {
      enabled: true,
      corpId: "ww_xxxxxxxxx",
      corpSecret: "xxxxxxxxxx",
      agentId: 1000001,
      
      // 接收消息模式
      mode: "webhook", // webhook/api
      webhookSecret: "xxxxxxxxxx",
      
      // 权限配置
      allowFrom: ["userid1", "userid2"],
      allowDepartments: [1, 2, 3]
    }
  }
}
```

### 5. 自动化配置
```json5
{
  automation: {
    // Cron 定时任务
    cron: [
      {
        name: "每日早报",
        schedule: "0 9 * * 1-5", // 工作日上午9点
        command: "claw run daily-report --send-to feishu:oc_f06e02a6c3bb20ed161e07a7dea60b25",
        enabled: true
      },
      {
        name: "系统状态检查",
        schedule: "0 */6 * * *", // 每6小时
        command: "claw run health-check --notify-on-error",
        enabled: true
      }
    ],

    // Webhook 配置
    webhooks: [
      {
        name: "GitHub 推送通知",
        path: "/webhook/github",
        secret: "xxxxxxxxxx",
        command: "claw run github-notify --payload {{payload}}",
        enabled: true
      }
    ]
  }
}
```

**使用场景**：需要自动化工作流的用户。
**为什么这么做**：
- 内置 Cron 无需依赖系统 cron 服务，配置更简单
- Webhook 支持对接外部系统，实现事件驱动的自动化
- 所有自动化任务都有日志记录，便于排查问题

---

## 🛠️ 常用技能最佳实践

### 1. 飞书文档技能
**功能**：飞书文档/电子表格/知识库的读写操作
**使用示例**：
```bash
# 创建飞书文档
claw run feishu-doc create --title "项目规划" --content "# 项目规划\n\n## 目标\n..."

# 读取飞书文档内容
claw run feishu-doc read --url "https://xxx.feishu.cn/docx/xxxxxx"

# 搜索飞书文档
claw run feishu-doc search --query "Q1目标"
```

**配置**：
```yaml
feishu:
  appId: "cli_xxxxxx"
  appSecret: "xxxxxx"
  # 权限范围：doc:read, doc:write, drive:read, drive:write
  scopes: ["doc:read", "doc:write", "drive:read", "drive:write"]
```

### 2. A股数据分析技能
**功能**：基于 AkShare 的A股行情、财务、板块数据分析
**使用示例**：
```bash
# 获取股票实时行情
claw run akshare-stock realtime --code 600519

# 获取财务报表
claw run akshare-stock finance --code 600519 --report-type balance

# 选股示例：市盈率<20，毛利率>40%，营收增长>20%
claw run akshare-stock screen --filters "pe<20,gross_margin>40,revenue_growth>20"
```

### 3. 内容总结技能
**功能**：支持URL、PDF、音频、视频等多种格式的内容总结
**使用示例**：
```bash
# 总结网页内容
claw run summarize --url "https://example.com/article"

# 总结PDF文档
claw run summarize --file ./report.pdf --output-summary summary.md

# 总结播客音频
claw run summarize --audio ./podcast.mp3 --lang zh
```

### 4. Git 辅助技能
**功能**：Git 操作辅助，自动生成提交信息、PR 描述等
**使用示例**：
```bash
# 自动生成提交信息
claw run git-helper commit --auto

# 生成PR描述
claw run git-helper pr --base main --head feature/new-function
```

---

## 🇨🇳 国内用户专属优化指南

### 1. 网络加速配置
#### 问题：安装技能慢、调用国外模型失败
**解决方案**：
```bash
# 配置npm镜像（永久生效）
npm config set registry https://registry.npmmirror.com
openclaw config set mirrors.npm https://registry.npmmirror.com

# 配置PyPI镜像
openclaw config set mirrors.pypi https://pypi.tuna.tsinghua.edu.cn/simple

# 配置ClawHub国内镜像
openclaw config set skills.sources[0] https://clawhub.cn

# 配置代理（如果有）
openclaw config set proxy.http http://127.0.0.1:7890
openclaw config set proxy.https http://127.0.0.1:7890
```

### 2. 国内模型使用配置
推荐优先使用国内模型，速度更快、稳定性更高、成本更低：
| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| 豆包Pro | 字节跳动 | 速度快，中文能力强 | 日常对话、通用任务 |
| 通义千问Max | 阿里巴巴 | 长文本能力强 | 文档处理、内容总结 |
| 文心一言4.0 | 百度 | 功能全面 | 多模态任务 |
| 混元 | 腾讯 | 性价比高 | 批量任务 |

**配置示例**：
```json5
{
  model: {
    default: "bytedance/doubao-pro",
    fallback: [
      "alibaba/qwen-max",
      "baidu/ernie-4.0",
      "tencent/hyllm"
    ]
  }
}
```

### 3. 国内服务集成
#### 阿里云OSS存储配置
```yaml
oss:
  provider: aliyun
  accessKeyId: "xxxxxx"
  accessKeySecret: "xxxxxx"
  region: "oss-cn-beijing"
  bucket: "openclaw-files"
```

#### 微信公众号配置
```yaml
wechat:
  appId: "wx_xxxxxx"
  appSecret: "xxxxxx"
  token: "xxxxxx"
  encodingAESKey: "xxxxxx"
```

#### 高德地图配置
```yaml
amap:
  key: "xxxxxx"
  defaultCity: "北京"
```

### 4. 中文社区资源
- **官方中文文档**：https://docs.openclaw.cn
- **国内论坛**：https://forum.openclaw.cn
- **GitHub 中文仓库**：https://github.com/open
