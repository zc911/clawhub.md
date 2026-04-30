---
name: cursor-sdk
description: Orchestrate multi-IDE agent workflows — Cursor SDK, Windsurf+Devin, and cross-tool coordination
version: 1.0.0
author: openclaw
install: clawhub install openclaw/cursor-sdk
---

# Cursor SDK — Multi-IDE Agent Orchestration

Build programmatic agent workflows across Cursor, Windsurf, and Claude Code — with worktree parallelism and multi-model routing.

## What it does

- Set up Cursor SDK for programmatic TypeScript agent workflows
- Configure Windsurf 2.0 with Devin (local + cloud agent hybrid)
- Orchestrate tasks across multiple IDEs and agent tools in parallel
- Use git worktrees for parallel agent workstreams
- Configure adaptive model routing for optimal model selection per task

## Setup

1. Install Cursor SDK: `npm install -g @cursor/sdk`
2. For Windsurf: install from https://windsurf.com and enable Devin integration in settings
3. For Claude Code: `npm install -g @anthropic-ai/claude-code`
4. Ensure git worktrees are available: `git worktree list`

## Usage examples

- Set up a Cursor SDK agent that runs my linter and test suite in parallel
- Configure Windsurf to use Devin for cloud-based CI debugging
- Run three parallel worktrees — one for frontend, one for backend, one for tests
- Route code review tasks to the model with the best reasoning ability
- Hand off a long-running build investigation to Devin cloud agent
- Coordinate between Cursor and Claude Code for a multi-file refactor

## Key concepts

- **Cursor SDK**: A TypeScript SDK for building programmatic AI agents that run inside Cursor. Supports multitask, worktrees, and multi-root workspaces (v3.2+).
- **Windsurf 2.0**: An agent IDE with integrated Devin support — local agent (30% more token-efficient) and cloud agent (full sandbox, persistent state). Adaptive model router selects the best model per task.
- **Worktree parallelism**: Running multiple git worktrees so agents can work on different branches simultaneously without merge conflicts.
- **Model routing**: Automatically selecting the optimal AI model for each task type — fast models for linting, strong models for architecture decisions.
- **Devin integration**: Windsurf's built-in agent that runs locally or in the cloud. Supports multi-model: GPT-5.5, Claude Opus 4.7, Gemini 3.1 Pro, GLM-5, and more.

## References

- Cursor SDK docs: https://docs.cursor.com/sdk
- Windsurf 2.0: https://windsurf.com/blog/windsurf-2
- Devin for Terminal: https://docs.windsurf.com/devin
- Git worktrees: https://git-scm.com/docs/git-worktree
