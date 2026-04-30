---
name: mcp-registry
description: Publish, discover, and integrate MCP servers from the MCP Registry and Smithery marketplace
version: 1.0.0
author: openclaw
install: clawhub install openclaw/mcp-registry
---

# MCP Registry — Discover & Publish MCP Servers

Find MCP servers in the official Registry and Smithery marketplace, or publish your own.

## What it does

- Search the MCP Registry and Smithery.ai for servers that match your needs
- Install MCP servers with one command via the Registry CLI
- Publish your MCP server to the Registry for community discovery
- Configure MCP servers in Claude Code, Cursor, or any MCP-compatible client
- Evaluate server quality using Registry metadata (downloads, ratings, spec compliance)

## Setup

1. Install the Registry CLI: `npm install -g @mcp/registry-cli`
2. No authentication needed for searching and installing
3. For publishing, create a Registry account: `mcp-registry auth login`
4. For Smithery, browse https://smithery.ai or use the Smithery CLI

## Usage examples

- Search for MCP servers that connect to PostgreSQL
- Install the GitHub MCP server from the Registry
- Publish my MCP server to the Registry
- Find the most popular MCP servers for web scraping
- Configure this MCP server in my Claude Code settings
- Browse Smithery for servers that support Elicitation

## Key concepts

- **MCP Registry**: The official, community-driven distribution platform for MCP servers. Hosted by the Linux Foundation. Currently in API freeze (v0.1), preparing for stable release.
- **Smithery.ai**: The largest open marketplace of MCP servers. Functions as a discovery and installation hub beyond the official Registry.
- **MCP Server**: A service that exposes tools, resources, and prompts via the Model Context Protocol — letting LLMs interact with external systems.
- **Elicitation**: A new MCP feature where servers can request additional information from users via client-initiated prompts — critical for interactive agent workflows.
- **Server manifest**: A JSON document describing the server's capabilities, tools, and configuration requirements.

## References

- MCP Registry: https://github.com/modelcontextprotocol/registry
- Smithery: https://smithery.ai
- MCP Spec (2025-11-25): https://spec.modelcontextprotocol.io
- Registry CLI: `npm install -g @mcp/registry-cli`
