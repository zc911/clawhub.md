import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import clawhubAPI from '../services/clawhub'
import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
  breaks: true,
  gfm: true
})

const SkillDetail = () => {
  const { skillId } = useParams()
  const [skill, setSkill] = useState(null)
  const [loading, setLoading] = useState(true)
  const [readme, setReadme] = useState('')

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const data = await clawhubAPI.getSkill(skillId)
        setSkill(data)
        
        // Mock README content
        setReadme(`
# ${data.name} v${data.version}

${data.description}

## Installation

\`\`\`bash
${data.installCommand}
\`\`\`

## Features

- Easy to install and use
- Seamless integration with OpenClaw
- Regular updates and support
- Active community development

## Usage

After installation, you can use the skill directly in your OpenClaw assistant:

\`\`\`
/skill ${data.name} [command]
\`\`\`

## Commands

| Command | Description |
|---------|-------------|
| \`help\` | Show help information |
| \`version\` | Show current version |
| \`configure\` | Configure skill settings |
| \`update\` | Update to latest version |

## Configuration

You can configure the skill in your OpenClaw settings:

\`\`\`json
{
  "${data.name}": {
    "apiKey": "your-api-key",
    "defaultOption": "value"
  }
}
\`\`\`

## Examples

### Basic usage
\`\`\`
/${data.name} command argument
\`\`\`

### Advanced usage
\`\`\`
/${data.name} --option value --another-option
\`\`\`

## Support

- **Author**: ${data.author}
- **Downloads**: ${data.downloads}
- **Stars**: ${data.stars} ⭐
- **Last Updated**: ${data.updatedAt}

If you encounter any issues or have feature requests, please open an issue on GitHub.

## License

MIT
        `)
      } catch (error) {
        console.error('Failed to fetch skill:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkill()
  }, [skillId])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Install command copied to clipboard!')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Loading...</div>
      </div>
    )
  }

  if (!skill) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>Skill not found</h1>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The skill you're looking for doesn't exist.</p>
          <Link to="/skills" className="btn-primary" style={{ textDecoration: 'none' }}>
            Back to Skills
          </Link>
        </div>
      </div>
    )
  }

  const html = marked(readme)

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/skills" style={{ color: '#3b82f6', textDecoration: 'none' }}>Skills</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>{skill.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
          {/* Main Content */}
          <div>
            {/* Skill Header */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f1f5f9' }}>
                  {skill.name}
                </h1>
                <span style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  color: '#3b82f6',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  v{skill.version}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="fas fa-download"></i>
                  {skill.downloads} downloads
                </span>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="fas fa-star" style={{ color: '#fbbf24' }}></i>
                  {skill.stars}
                </span>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="fas fa-user"></i>
                  by {skill.author}
                </span>
                <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="fas fa-clock"></i>
                  Updated {skill.updatedAt}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {skill.tags?.map((tag, index) => (
                  <span key={index} style={{
                    background: '#1e293b',
                    color: '#94a3b8',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    border: '1px solid #334155'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <button 
                className="install-btn"
                onClick={() => copyToClipboard(skill.installCommand)}
                style={{ fontSize: '1rem', padding: '1rem', maxWidth: '400px' }}
              >
                <i className="fas fa-terminal" style={{ marginRight: '0.5rem' }}></i>
                {skill.installCommand}
              </button>
            </div>

            {/* README Content */}
            <div style={{ 
              background: '#1e293b',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              <div 
                className="docs-content"
                style={{ lineHeight: '1.7' }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ 
              background: '#1e293b',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: '#f1f5f9', marginBottom: '1rem', fontSize: '1.1rem' }}>Skill Info</h3>
              <ul style={{ listStyle: 'none', color: '#94a3b8' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#64748b' }}>Category:</span> {skill.category}
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#64748b' }}>Version:</span> {skill.version}
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#64748b' }}>License:</span> MIT
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#64748b' }}>Author:</span> {skill.author}
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                  <span style={{ color: '#64748b' }}>Size:</span> ~12KB
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <span style={{ color: '#64748b' }}>Requires:</span> OpenClaw ≥ 1.0.0
                </li>
              </ul>
            </div>

            <div style={{ 
              background: '#1e293b',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              <h3 style={{ color: '#f1f5f9', marginBottom: '1rem', fontSize: '1.1rem' }}>Similar Skills</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ marginBottom: '1rem' }}>
                  <Link to="/skills/skill-1" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    Skill Name 1
                  </Link>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Short description of the similar skill
                  </p>
                </li>
                <li style={{ marginBottom: '1rem' }}>
                  <Link to="/skills/skill-2" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    Skill Name 2
                  </Link>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Short description of the similar skill
                  </p>
                </li>
                <li>
                  <Link to="/skills/skill-3" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                    Skill Name 3
                  </Link>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Short description of the similar skill
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillDetail
