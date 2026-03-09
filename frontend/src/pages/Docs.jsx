import React, { useState, useEffect } from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  breaks: true,
  gfm: true
})

const Docs = () => {
  const [activeDoc, setActiveDoc] = useState('getting-started')
  const [content, setContent] = useState('')

  const docs = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: `
# Getting Started with ClawHub.md

Welcome to ClawHub.md, the ultimate documentation platform for OpenClaw skills. This guide will help you get started with using and installing skills.

## What is ClawHub?

ClawHub is the official package registry for OpenClaw skills. It allows you to discover, install, and publish agent skills for your OpenClaw assistant.

## Prerequisites

Before you begin, make sure you have:
- OpenClaw installed on your system
- Node.js 18+ for the ClawHub CLI

## Installation

First, install the ClawHub CLI:

\`\`\`bash
npm install -g clawhub
\`\`\`

Verify the installation:

\`\`\`bash
clawhub --version
\`\`\`

## Basic Usage

### Search for skills

\`\`\`bash
clawhub search "weather"
\`\`\`

### Install a skill

\`\`\`bash
clawhub install weather
\`\`\`

### List installed skills

\`\`\`bash
clawhub list
\`\`\`

### Update skills

\`\`\`bash
clawhub update --all
\`\`\`

### Uninstall a skill

\`\`\`bash
clawhub uninstall weather
\`\`\`

## Next Steps

- Browse the [Skill Library](/skills) to find useful skills
- Check out the [Publishing Guide](#publishing) to learn how to share your own skills
- Join our [Discord community](https://discord.com/invite/clawd) to connect with other developers
      `
    },
    {
      id: 'publishing',
      title: 'Publishing Skills',
      content: `
# Publishing Your Own Skills

Publishing your skills to ClawHub is easy and free. This guide will walk you through the process.

## Prerequisites

- A ClawHub account (sign up at [clawhub.md](https://clawhub.md))
- Your skill code in a directory
- A valid \`skill.json\` manifest file

## Skill Manifest

Every skill needs a \`skill.json\` file in the root directory:

\`\`\`json
{
  "name": "my-awesome-skill",
  "version": "1.0.0",
  "description": "A brief description of what your skill does",
  "author": "Your Name",
  "license": "MIT",
  "requires": {
    "openclaw": ">=1.0.0"
  },
  "entry": "index.js"
}
\`\`\`

## Required Fields

- \`name\`: Unique identifier for your skill (lowercase, no spaces)
- \`version\`: Semantic version number (MAJOR.MINOR.PATCH)
- \`description\`: Short description of what your skill does
- \`author\`: Your name or username
- \`entry\`: Main entry point file for your skill

## Publishing Steps

1. **Login to ClawHub**

\`\`\`bash
clawhub login
\`\`\`

Follow the prompts to authenticate with your ClawHub account.

2. **Prepare your skill**

Make sure your skill directory contains:
- All required code files
- \`skill.json\` manifest
- README.md with documentation
- License file

3. **Publish**

\`\`\`bash
clawhub publish ./my-skill --slug my-awesome-skill
\`\`\`

4. **Verify**

Check that your skill appears in the [Skill Library](/skills) within a few minutes.

## Best Practices

- Write clear documentation in your README.md
- Include usage examples
- Test your skill thoroughly before publishing
- Follow semantic versioning
- Respond to issues and feedback from users

## Versioning

When you publish updates:
- Increment PATCH version for bug fixes
- Increment MINOR version for new features
- Increment MAJOR version for breaking changes

## Moderation

All published skills go through a moderation process to ensure:
- No malicious code
- Clear documentation
- Compliance with our terms of service

This process usually takes less than 24 hours.
      `
    },
    {
      id: 'skill-development',
      title: 'Skill Development',
      content: `
# Skill Development Guide

Learn how to develop custom skills for OpenClaw.

## Skill Structure

A typical OpenClaw skill has the following structure:

\`\`\`
my-skill/
├── skill.json          # Skill manifest
├── index.js            # Main entry point
├── README.md           # Documentation
├── LICENSE             # License file
└── assets/             # Optional: images, icons, etc.
\`\`\`

## Basic Skill Example

Here's a simple "Hello World" skill:

\`\`\`javascript
// index.js
module.exports = {
  name: 'hello',
  description: 'Says hello to the user',
  commands: [
    {
      name: 'hello',
      description: 'Say hello',
      handler: async (args, context) => {
        return \`Hello, \${args.name || 'World'}!\`
      }
    }
  ]
}
\`\`\`

## Skill API

### Context Object

The handler function receives a context object with:

- \`context.user\`: Current user information
- \`context.settings\`: Skill settings
- \`context.tools\`: Access to OpenClaw tools
- \`context.logger\`: Logging utility

### Command Definition

Each command should have:
- \`name\`: Command name (what users type)
- \`description\`: Short description for help
- \`handler\`: Async function that executes the command
- \`args\`: Optional argument definitions

## Using Tools

Skills can access all OpenClaw tools through the context:

\`\`\`javascript
handler: async (args, context) => {
  // Use the file system tool
  const files = await context.tools.fs.listDir('.')
  
  // Use the web search tool
  const results = await context.tools.web.search('openclaw')
  
  return \`Found \${results.length} results\`
}
\`\`\`

## Settings

Skills can define user-configurable settings:

\`\`\`json
// skill.json
{
  "settings": {
    "apiKey": {
      "type": "string",
      "description": "API key for the service",
      "required": true
    },
    "language": {
      "type": "string",
      "default": "en",
      "description": "Default language for responses"
    }
  }
}
\`\`\`

Access settings in your code:

\`\`\`javascript
handler: async (args, context) => {
  const apiKey = context.settings.apiKey
  // Use the API key
}
\`\`\`

## Testing

Test your skill locally before publishing:

\`\`\`bash
clawhub test ./my-skill
\`\`\`

This will load your skill in a test environment and let you run commands.

## Debugging

Enable debug logging:

\`\`\`bash
DEBUG=skill:* clawhub test ./my-skill
\`\`\`

Use the logger in your code:

\`\`\`javascript
handler: async (args, context) => {
  context.logger.debug('Debug message', { args })
  context.logger.info('Info message')
  context.logger.error('Error message', error)
}
\`\`\`

## Advanced Topics

- [Event-driven skills](#events)
- [Skill dependencies](#dependencies)
- [Cross-skill communication](#cross-skill)
- [Internationalization](#i18n)
      `
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      content: `
# API Reference

Complete reference for the ClawHub API and skill development interfaces.

## REST API

Base URL: \`https://api.clawhub.md/v1\`

### Authentication

All API requests require an API key in the Authorization header:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

Generate API keys in your [account settings](https://clawhub.md/settings/api).

### Endpoints

#### List Skills

\`\`\`http
GET /skills
\`\`\`

Query parameters:
- \`q\`: Search query
- \`category\`: Filter by category
- \`author\`: Filter by author
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 20, max: 100)

Response:
\`\`\`json
{
  "data": [
    {
      "id": "skill-id",
      "name": "skill-name",
      "version": "1.0.0",
      "description": "Skill description",
      "author": "username",
      "downloads": 1234,
      "stars": 56,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
\`\`\`

#### Get Skill

\`\`\`http
GET /skills/:skillName
\`\`\`

#### Download Skill

\`\`\`http
GET /skills/:skillName/download/:version
\`\`\`

#### Publish Skill

\`\`\`http
POST /skills
Content-Type: multipart/form-data
\`\`\`

Form data:
- \`package\`: Skill tar.gz file
- \`manifest\`: skill.json content

## Skill SDK Reference

### \`context.tools\`

Available tools:

#### File System
- \`fs.readFile(path)\`: Read file content
- \`fs.writeFile(path, content)\`: Write content to file
- \`fs.listDir(path)\`: List directory contents
- \`fs.exists(path)\`: Check if path exists
- \`fs.mkdir(path)\`: Create directory
- \`fs.remove(path)\`: Remove file or directory

#### Web
- \`web.search(query)\`: Web search
- \`web.fetch(url, options)\`: Fetch HTTP resource
- \`web.browser(url)\`: Take screenshot of web page

#### System
- \`system.exec(command, options)\`: Execute shell command
- \`system.info()\`: Get system information
- \`system.notify(title, message)\`: Send system notification

#### User
- \`user.get()\`: Get current user info
- \`user.preferences()\`: Get user preferences
- \`user.sendMessage(message)\`: Send message to user

### \`context.logger\`

Logging methods:
- \`logger.debug(message, data)\`: Debug level
- \`logger.info(message, data)\`: Info level
- \`logger.warn(message, data)\`: Warning level
- \`logger.error(message, error)\`: Error level

### \`context.settings\`

- \`settings.get(key)\`: Get setting value
- \`settings.set(key, value)\`: Set setting value
- \`settings.getAll()\`: Get all settings

## CLI Reference

See the [CLI Documentation](#cli) for a complete list of commands.
      `
    }
  ]

  useEffect(() => {
    const doc = docs.find(d => d.id === activeDoc)
    if (doc) {
      const html = marked(doc.content)
      setContent(html)
    }
  }, [activeDoc])

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {/* Sidebar */}
          <div style={{ 
            width: '280px', 
            flexShrink: 0,
            position: 'sticky',
            top: '100px',
            alignSelf: 'flex-start'
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              color: '#f1f5f9'
            }}>
              Documentation
            </h3>
            <ul style={{ listStyle: 'none' }}>
              {docs.map((doc, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <button
                    onClick={() => setActiveDoc(doc.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeDoc === doc.id 
                        ? '#3b82f6' 
                        : 'transparent',
                      color: activeDoc === doc.id ? 'white' : '#94a3b8',
                      fontWeight: activeDoc === doc.id ? '600' : '400',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '0.95rem'
                    }}
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div style={{ 
            flex: '1', 
            minWidth: '300px',
            background: '#1e293b',
            padding: '2.5rem',
            borderRadius: '8px',
            border: '1px solid #334155'
          }}>
            <div 
              className="docs-content"
              style={{ 
                maxWidth: '900px',
                lineHeight: '1.7'
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .docs-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0 0 1.5rem 0;
          color: #f1f5f9;
          border-bottom: 2px solid #334155;
          padding-bottom: 0.75rem;
        }

        .docs-content h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 2rem 0 1rem 0;
          color: #f1f5f9;
        }

        .docs-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          color: #e2e8f0;
        }

        .docs-content p {
          margin: 1rem 0;
          color: #94a3b8;
        }

        .docs-content ul, .docs-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
          color: #94a3b8;
        }

        .docs-content li {
          margin: 0.5rem 0;
        }

        .docs-content pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 1.5rem;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid #334155;
        }

        .docs-content code {
          background: #0f172a;
          color: #3b82f6;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          border: 1px solid #334155;
        }

        .docs-content pre code {
          background: none;
          padding: 0;
          border: none;
          color: #e2e8f0;
        }

        .docs-content a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .docs-content a:hover {
          text-decoration: underline;
        }

        .docs-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #94a3b8;
          font-style: italic;
          background: rgba(59, 130, 246, 0.05);
        }

        .docs-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .docs-content th, .docs-content td {
          border: 1px solid #334155;
          padding: 0.75rem;
          text-align: left;
          color: #94a3b8;
        }

        .docs-content th {
          background: #0f172a;
          font-weight: 600;
          color: #f1f5f9;
        }

        .docs-content hr {
          border: none;
          border-top: 1px solid #334155;
          margin: 2rem 0;
        }
      `}</style>
      </div>
    )
  }

  export default Docs