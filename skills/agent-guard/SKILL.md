---
name: agent-guard
description: Agent security guardrails — sandbox configuration, injection detection, and permission boundaries
version: 1.0.0
author: openclaw
install: clawhub install openclaw/agent-guard
---

# Agent Guard — Security for AI Agent Workflows

Protect your agents from prompt injection, unsafe tool execution, and unauthorized actions.

## What it does

- Configure sandbox boundaries for agent tool execution (filesystem, network, API)
- Set up permission allow/deny lists for tool access
- Detect and block indirect prompt injections from web content and untrusted inputs
- Implement human-in-the-loop approval flows for sensitive operations
- Audit agent actions with structured logging

## Setup

1. No external accounts required — guardrails are configured locally
2. Add guard rules to your CLAUDE.md or project settings
3. For sandbox execution, ensure Docker is available (optional but recommended)

## Usage examples

- Set up permission boundaries so my agent can only read from src/ and write to output/
- Block my agent from executing shell commands with sudo or rm -rf
- Add a human approval step before any deployment or payment action
- Scan this URL for indirect prompt injection before my agent processes it
- Audit all tool calls my agent made in the last session
- Configure a sandbox that allows network access only to api.example.com

## Key concepts

- **Permission boundary**: A list of allowed/denied paths, domains, and tool actions that constrain agent behavior.
- **Indirect injection**: A malicious prompt embedded in web content, documents, or API responses that tricks an agent into executing unintended actions.
- **Sandbox**: An isolated execution environment (Docker container, OpenAI sandbox agent, or restricted filesystem) that limits what an agent can touch.
- **Approval flow**: A gate that requires human confirmation before the agent can proceed with high-impact operations (deployments, payments, data deletion).
- **Audit log**: A structured record of every tool call, file access, and network request made by the agent during a session.

## References

- OWASP Top 10 for LLMs: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Microsoft Agent Security Toolkit: https://github.com/microsoft/agent-security-toolkit
- OpenAI Sandbox Agents: https://platform.openai.com/docs/sandbox-agents
