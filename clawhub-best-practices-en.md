# ClawHub Best Practices Guide v1.0
> Industry-leading OpenClaw configuration and usage specifications, covering all scenarios from entry to advanced, optimized for global users, production-ready

---

## 🎯 Overview
This guide is compiled based on OpenClaw official documentation, community best practices, and real-world production experience. It aims to help developers and enterprise users quickly build a stable, efficient, and secure OpenClaw runtime environment.

### Core Advantages
✅ **Full Coverage**: From installation to advanced deployment, includes all configuration options and best practices
✅ **Practical First**: Each configuration provides complete code examples, use cases, and principle explanations
✅ **China Region Optimization**: Special network configurations, local service integrations, and Chinese community resources
✅ **Agent-Friendly**: Structured design allows AI agents to directly read and apply all configurations automatically
✅ **Production-Ready**: All solutions have been verified in production environments with guaranteed stability

---

## 🚀 Quick Start

### 1. Prerequisites
#### System Requirements
| OS | Minimum Requirements | Recommended Requirements |
|----|----------------------|--------------------------|
| macOS | 12.0+, 8G RAM | 13.0+, 16G RAM |
| Linux | Ubuntu 20.04+, 4G RAM | Ubuntu 22.04+, 8G RAM |
| Windows | WSL2, 8G RAM | WSL2 (Ubuntu 22.04), 16G RAM |

#### Dependencies
```bash
# Install Node.js 22+ (required)
# macOS:
brew install node@22

# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version # ≥ 22.0.0
npm --version # ≥ 9.0.0
```

### 2. Installation
```bash
# Install the latest stable version of OpenClaw
npm install -g openclaw@latest

# Run configuration wizard (recommended)
openclaw onboard --install-daemon

# For users in China, use mirror for faster installation
npm config set registry https://registry.npmmirror.com
npm install -g openclaw@latest --registry=https://registry.npmmirror.com
```

### 3. Verification
```bash
# Check version
openclaw --version # ≥ 2026.3.10

# Check gateway status
openclaw gateway status
# Expected output: Gateway is running (pid: 1234, port: 18789)

# Test basic functionality
openclaw agent --message "Hello OpenClaw" --thinking minimal
# Should return a normal response
```

---

## ⚙️ Core Configuration Best Practices
Configuration file path: `~/.openclaw/openclaw.json` (JSON5 format, supports comments)

### 1. Basic Configuration
```json5
{
  // Global proxy configuration
  proxy: {
    http: "http://127.0.0.1:7890",
    https: "http://127.0.0.1:7890",
    noProxy: ["localhost", "127.0.0.1", "*.internal.example.com"]
  },

  // Mirror source configuration
  mirrors: {
    npm: "https://registry.npmjs.org",
    pypi: "https://pypi.org/simple",
    github: "https://github.com",
    clawhub: "https://clawhub.ai"
  },

  // Model configuration (prioritized from high to low, automatic failover)
  model: {
    default: "anthropic/claude-3-sonnet",
    fallback: [
      "openai/gpt-4o",
      "google/gemini-1.5-pro",
      "mistral/mistral-large"
    ],
    timeout: 30000, // 30 seconds timeout
    maxRetries: 3,
    retryDelay: 1000, // 1 second between retries
    maxTokens: 4096,
    temperature: 0.7
  },

  // Gateway configuration
  gateway: {
    port: 18789,
    bind: "127.0.0.1", // Bind to localhost only, use Tailscale for remote access
    logLevel: "info", // debug/info/warn/error
    autoRestart: true,
    updateChannel: "stable" // stable/beta/dev
  }
}
```

**Use Case**: Basic configuration for all users to ensure stable system operation and normal network access.
**Rationale**:
- Proxy configuration helps access external services in restricted network environments
- Model failover ensures automatic switching to backup models when a service is unavailable, improving availability
- Gateway binding to localhost prevents unauthorized access, enhancing security

### 2. Security Configuration
```json5
{
  security: {
    // DM message policy (default pairing mode, unknown senders require verification)
    dmPolicy: "pairing", // pairing/open/deny

    // List of allowed user IDs
    allowFrom: [
      "user_1234567890", // Administrator
      "user_0987654321"  // Other authorized users
    ],

    // Sandbox configuration (non-main sessions run in sandbox by default)
    sandbox: {
      mode: "non-main", // off/non-main/all
      allowedTools: ["bash", "read", "write", "process"],
      deniedTools: ["browser", "nodes", "cron", "gateway"]
    },

    // Sensitive operation confirmation
    confirmOperations: [
      "rm -rf",
      "format",
      "dd if=",
      "systemctl poweroff",
      "git push --force"
    ],

    // Privacy protection
    privacy: {
      enableLocalMode: true, // Local mode, sensitive data not uploaded to third parties
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

**Use Case**: All production environments, especially scenarios with multiple users or public access.
**Rationale**:
- Default pairing mode prevents unknown users from accessing your assistant
- Sandbox configuration isolates operation permissions for untrusted sessions, preventing malicious operations
- Sensitive operation confirmation prevents accidental execution of dangerous commands
- Path exclusion mechanism prevents privacy data leakage

### 3. Skills Configuration
```json5
{
  skills: {
    // Global skill sources
    sources: [
      "https://clawhub.ai", // Official source
      "https://clawhub.cn"  // China mirror for faster access
    ],

    // Recommended skills to auto-install
    autoInstall: [
      "weather@latest",       // Weather query
      "google-workspace@latest", // Google Workspace integration
      "github@latest",        // GitHub integration
      "summarize@latest",     // Content summarization
      "git-helper@latest",    // Git assistance
      "schedule@latest"       // Schedule management
    ],

    // Global skill configuration
    defaults: {
      // Google Workspace global configuration
      google: {
        clientId: "${GOOGLE_CLIENT_ID}",
        clientSecret: "${GOOGLE_CLIENT_SECRET}",
        redirectUri: "http://localhost:18789/oauth/callback"
      },
      // Weather skill configuration
      weather: {
        defaultCity: "San Francisco",
        defaultProvider: "openweathermap"
      }
    },

    // Disabled skills
    disabled: [] // Add skills you don't need here
  }
}
```

**Use Case**: Skill management configuration for all users to improve skill usage efficiency.
**Rationale**:
- Multiple source configuration ensures skill installation availability in different regions
- Auto-install common skills reduces manual configuration workload
- Global configuration avoids passing the same parameters repeatedly in each skill call
- Disabling unused skills reduces unnecessary errors and resource consumption

### 4. Channel Configuration
#### Slack Channel Configuration
```json5
{
  channels: {
    slack: {
      enabled: true,
      botToken: "xoxb-xxxxxxxxx-xxxxxxxxx-xxxxxxxxxx",
      appToken: "xapp-1-xxxxxxxxx-xxxxxxxxx-xxxxxxxxxx",
      
      // DM policy
      dmPolicy: "allowlist",
      allowFrom: ["U12345678", "U87654321"],
      
      // Group configuration
      groupPolicy: "open",
      groups: {
        // Engineering channel
        "C0123456789": {
          requireMention: false, // No @ needed to respond
          activation: "always"
        },
        // General channels
        "*": {
          requireMention: true, // Require @ to respond
          activation: "mention"
        }
      },
      
      // Message configuration
      message: {
        maxLength: 4000,
        splitLongMessage: true,
        enableThreadReply: true
      }
    }
  }
}
```

**Use Case**: Users using Slack as the interaction channel.
**Rationale**:
- Socket Mode connection is more stable than webhook, no public IP required
- Per-channel configuration allows flexible control of response strategies for different groups
- Long message auto-splitting adapts to Slack message length limits

#### Discord Channel Configuration
```json5
{
  channels: {
    discord: {
      enabled: true,
      token: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      // Permission configuration
      allowFrom: ["123456789012345678", "987654321098765432"],
      guilds: {
        "123456789012345678": {
          enabled: true,
          requireMention: true
        }
      }
    }
  }
}
```

### 5. Automation Configuration
```json5
{
  automation: {
    // Cron scheduled tasks
    cron: [
      {
        name: "Daily Morning Report",
        schedule: "0 9 * * 1-5", // Weekdays at 9 AM
        command: "claw run daily-report --send-to slack:C0123456789",
        enabled: true
      },
      {
        name: "System Health Check",
        schedule: "0 */6 * * *", // Every 6 hours
        command: "claw run health-check --notify-on-error",
        enabled: true
      }
    ],

    // Webhook configuration
    webhooks: [
      {
        name: "GitHub Push Notification",
        path: "/webhook/github",
        secret: "xxxxxxxxxx",
        command: "claw run github-notify --payload {{payload}}",
        enabled: true
      }
    ]
  }
}
```

**Use Case**: Users requiring automated workflows.
**Rationale**:
- Built-in Cron eliminates dependency on system cron services, simplifying configuration
- Webhook support for integrating with external systems to implement event-driven automation
- All automation tasks have logging for easy troubleshooting

---

## 🛠️ Popular Skills Best Practices

### 1. Google Workspace Skill
**Function**: Read/write operations for Google Docs, Sheets, Drive, and Calendar
**Usage Examples**:
```bash
# Create a Google Doc
claw run google-docs create --title "Project Plan" --content "# Project Plan\n\n## Goals\n..."

# Read Google Doc content
claw run google-docs read --url "https://docs.google.com/document/d/xxxxxx/edit"

# Search Google Drive
claw run google-drive search --query "Q1 OKR"
```

**Configuration**:
```yaml
google:
  clientId: "xxxxxx.apps.googleusercontent.com"
  clientSecret: "xxxxxx"
  scopes: [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly"
  ]
```

### 2. GitHub Skill
**Function**: GitHub operations automation, PR management, issue tracking
**Usage Examples**:
```bash
# List open PRs in a repository
claw run github pr list --repo openclaw/openclaw --state open

# Create a new issue
claw run github issue create --repo openclaw/openclaw --title "Bug report" --body "Description of the bug..."

# Merge a PR
claw run github pr merge --repo openclaw/openclaw --pr 123 --merge-method squash
```

### 3. Summarize Skill
**Function**: Content summarization for URLs, PDFs, audio, video, and more
**Usage Examples**:
```bash
# Summarize web content
claw run summarize --url "https://example.com/article"

# Summarize PDF document
claw run summarize --file ./report.pdf --output-summary summary.md

# Summarize podcast audio
claw run summarize --audio ./podcast.mp3 --lang en
```

### 4. Git Helper Skill
**Function**: Git operation assistance, auto-generate commit messages, PR descriptions, etc.
**Usage Examples**:
```bash
# Auto-generate commit message
claw run git-helper commit --auto

# Generate PR description
claw run git-helper pr --base main --head feature/new-function
```

---

## 🇨🇳 China Region Optimization Guide

### 1. Network Acceleration Configuration
**Problem**: Slow skill installation, failed calls to foreign models
**Solution**:
```bash
# Configure npm mirror (permanent)
npm config set registry https://registry.npmmirror.com
openclaw config set mirrors.npm https://registry.npmmirror.com

# Configure PyPI mirror
openclaw config set mirrors.pypi https://pypi.tuna.tsinghua.edu.cn/simple

# Configure ClawHub China mirror
openclaw config set skills.sources[0] https://clawhub.cn

# Configure proxy if available
openclaw config set proxy.http http://127.0.0.1:7890
openclaw config set proxy.https http://127.0.0.1:7890
```

### 2. Domestic Model Configuration
Recommended priority use of domestic models for faster speed, higher stability, and lower cost:
| Model | Provider | Features | Use Cases |
|-------|----------|----------|-----------|
| Doubao Pro | ByteDance | Fast, strong Chinese language capabilities | Daily conversations, general tasks |
| Qwen Max | Alibaba | Strong long text processing | Document processing, content summarization |
| Ernie 4.0 | Baidu | Comprehensive functionality | Multimodal tasks |
| Hunyuan | Tencent | Cost-effective | Batch tasks |

**Configuration Example**:
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

### 3. Domestic Service Integrations
#### Alibaba Cloud OSS Storage Configuration
```yaml
oss:
  provider: aliyun
  accessKeyId: "xxxxxx"
  accessKeySecret: "xxxxxx"
  region: "oss-cn-beijing"
  bucket: "openclaw-files"
```

#### WeChat Official Account Configuration
```yaml
wechat:
  appId: "wx_xxxxxx"
  appSecret: "xxxxxx"
  token: "xxxxxx"
  encodingAESKey: "xxxxxx"
```

#### Amap (Gaode) Map Configuration
```yaml
amap:
  key: "xxxxxx"
  defaultCity: "Beijing"
```

### 4. Chinese Community Resources
- **Official Chinese Documentation**: https://docs.openclaw.cn
- **Domestic Forum**: https://forum.openclaw.cn
- **GitHub Chinese Repository**: https://github.com/openclaw-cn/openclaw
- **Feishu User Group**: Scan the QR code to join the official user group
- **Bilibili Tutorials**: Search "OpenClaw 教程" for video tutorials

---

## 🔧 Advanced Deployment Best Practices

### 1. Remote Gateway Deployment
**Use Case**: Deploy gateway on a cloud server for multi-device access
**Configuration**:
```bash
# Server-side configuration
openclaw config set gateway.bind 0.0.0.0
openclaw config set gateway.auth.mode password
openclaw config set gateway.auth.password "your-secure-password"

# Use Tailscale for secure access (recommended)
openclaw config set gateway.tailscale.mode serve
# This allows secure access over Tailscale network without exposing public ports
```

**Rationale**:
- Remote deployment allows you to access your assistant from any device
- Tailscale provides zero-trust network access, more secure than exposing public ports directly
- Password authentication ensures only authorized users can access

### 2. High Availability Deployment
**Use Case**: Enterprise production environments requiring high availability
**Configuration**:
```yaml
# docker-compose.yml
version: '3'
services:
