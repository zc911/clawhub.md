---
name: cloud-routines
description: Configure Claude Code Routines and Managed Agents — scheduled and cloud-hosted agent execution
version: 1.0.0
author: openclaw
install: clawhub install openclaw/cloud-routines
---

# Cloud Routines — Scheduled & Remote Agent Execution

Run Claude Code tasks on a schedule or trigger them from the cloud — even when your computer is off.

## What it does

- Set up Claude Code Routines (cron-based scheduled tasks on Anthropic infrastructure)
- Configure Managed Agents (hosted REST API, Anthropic sandbox, persistent sessions)
- Trigger agent tasks via webhooks from GitHub, Slack, or custom events
- Monitor routine execution logs and results
- Push results to Slack, email, or GitHub when tasks complete

## Setup

1. Ensure Claude Code is installed and authenticated: `claude auth login`
2. Enable Routines: `claude routines enable` (requires Max subscription)
3. For webhook triggers, configure your incoming webhook URL in Claude settings
4. No additional API keys — Routines use your existing Claude Code auth

## Usage examples

- Set up a routine that runs my test suite every morning at 9am
- Create a routine that auto-reviews PRs when they're opened
- Schedule a weekly report that summarizes GitHub issues and posts to Slack
- Run a managed agent that monitors my production logs for errors
- Trigger a cloud agent from a GitHub webhook on push to main

## Key concepts

- **Routine**: A scheduled Claude Code task that runs on Anthropic-managed infrastructure. Persists even when your computer is off. Configured via cron expressions.
- **Managed Agent**: A hosted agent accessible via REST API. Runs in an Anthropic sandbox with its own filesystem and session state. Three tiers: Agent SDK (library), Managed Agents (hosted), CLI (interactive).
- **Trigger**: An event that starts a routine — cron schedule, webhook, or manual invocation.
- **Channel**: An integration that pushes events into your session — Telegram, Discord, iMessage, or custom webhooks.

## References

- Claude Code docs: https://docs.anthropic.com/en/docs/claude-code/routines
- Managed Agents API: https://docs.anthropic.com/en/docs/agent-sdk/managed-agents
