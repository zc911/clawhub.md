# clawhub.md

**Skills for AI Agents. Readable by machines.**

## What is this?

`clawhub.md` is a website that serves OpenClaw best practices as raw Markdown — directly consumable by AI agents.

- **Agent visits** → gets raw Markdown skill file
- **Human visits** → gets a landing page with instructions
- **Auto language** → Chinese or English based on Accept-Language

## Quick Start

```bash
# Run locally
npm start

# Or with custom port
PORT=8080 npm start
```

## Usage

Tell your OpenClaw agent:

```
Fetch https://clawhub.md and follow it.
```

## Endpoints

| Path | Description |
|------|-------------|
| `/` | Auto-detect: HTML for browsers, Markdown for agents |
| `/en` | English Markdown (always) |
| `/zh` | Chinese Markdown (always) |
| `/raw` | Markdown with auto language detection |
| `/health` | Health check |

## Deploy

Zero dependencies, pure Node.js. Deploy anywhere:

- **Vercel**: `vercel deploy`
- **Railway**: Connect repo
- **Fly.io**: `fly launch`
- **VPS**: `node server.js`

## File Structure

```
├── server.js      # HTTP server with smart routing
├── index.html     # Landing page for humans
├── skill-en.md    # English best practices skill
├── skill-zh.md    # Chinese best practices skill
├── package.json
└── README.md
```
