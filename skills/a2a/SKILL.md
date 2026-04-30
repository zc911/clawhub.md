---
name: a2a
description: Build and manage A2A (Agent-to-Agent) protocol agents — Agent Cards, skill discovery, and inter-agent communication
version: 1.0.0
author: openclaw
install: clawhub install openclaw/a2a
---

# A2A — Agent-to-Agent Protocol

Build agents that discover, communicate, and collaborate using Google's A2A protocol (v1.0).

## What it does

- Generate A2A Agent Cards describing your agent's capabilities
- Implement A2A skill discovery so agents find each other at runtime
- Set up A2A task handling with streaming and push notifications
- Configure transport bindings: JSON-RPC over HTTP, gRPC, or REST

## Setup

1. Install the A2A SDK: `pip install a2a-sdk` (Python) or `npm install @a2a/sdk` (TypeScript)
2. No additional API keys required — A2A is a local protocol
3. For remote agent discovery, deploy your Agent Card to a public endpoint

## Usage examples

- Create an Agent Card for my service
- Discover agents that can handle data analysis tasks
- Send a task to the research agent and stream the result
- Set up gRPC transport for low-latency agent communication
- List all registered agents in my A2A network

## Key concepts

- **Agent Card**: A JSON document declaring an agent's name, capabilities, authentication, and endpoint. The A2A equivalent of OpenAPI spec.
- **Skill**: A discrete capability an agent exposes — other agents query skills at runtime to find the right collaborator.
- **Task**: A unit of work sent from one agent to another. Supports streaming updates and push notifications for long-running operations.
- **Transport**: The wire format — JSON-RPC 2.0 over HTTP(S) (default), gRPC, or HTTP+JSON/REST.

## References

- A2A spec: https://github.com/a2aproject/a2a (v1.0.0, Apache-2.0)
- Python SDK: `pip install a2a-sdk`
- TypeScript SDK: `npm install @a2a/sdk`
- DeepLearning.AI course: https://deeplearning.ai/short-courses/a2a
