import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clawhubAPI from '../services/clawhub'

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await clawhubAPI.getSkills()
        setSkills(response.data)
      } catch (error) {
        console.error('Failed to fetch skills:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const categories = [
    'all', 'Development', 'Productivity', 'Utilities', 'Media', 'Creative', 'Business', 'LifeStyle'
  ]
    {
      name: 'GitHub',
      category: 'Development',
      description: 'Manage GitHub issues, PRs, and repositories directly from OpenClaw. Create, comment, and review without leaving the terminal.',
      downloads: '12.5k',
      author: 'openclaw',
      stars: 456,
      version: '1.2.3',
      installCommand: 'clawhub install github'
    },
    {
      name: 'Weather',
      category: 'Utilities',
      description: 'Get real-time weather information and forecasts for any location. Supports multiple weather providers and units.',
      downloads: '8.2k',
      author: 'community',
      stars: 234,
      version: '1.0.1',
      installCommand: 'clawhub install weather'
    },
    {
      name: 'Coding Agent',
      category: 'Development',
      description: 'Powerful coding assistant that can write, review, and refactor code. Supports multiple languages and frameworks.',
      downloads: '15.3k',
      author: 'openclaw',
      stars: 678,
      version: '2.1.0',
      installCommand: 'clawhub install coding-agent'
    },
    {
      name: 'Calendar',
      category: 'Productivity',
      description: 'Manage your calendar, schedule meetings, and get reminders. Integrates with Google Calendar, Outlook, and Apple Calendar.',
      downloads: '6.7k',
      author: 'community',
      stars: 189,
      version: '1.1.0',
      installCommand: 'clawhub install calendar'
    },
    {
      name: 'Email',
      category: 'Productivity',
      description: 'Read, compose, and send emails directly from OpenClaw. Supports Gmail, Outlook, and IMAP accounts.',
      downloads: '9.1k',
      author: 'community',
      stars: 345,
      version: '1.3.2',
      installCommand: 'clawhub install email'
    },
    {
      name: 'YouTube Downloader',
      category: 'Media',
      description: 'Download YouTube videos and audio in multiple formats. Supports playlists, subtitles, and quality selection.',
      downloads: '7.8k',
      author: 'community',
      stars: 267,
      version: '1.0.0',
      installCommand: 'clawhub install youtube-dl'
    },
    {
      name: 'Image Generator',
      category: 'Creative',
      description: 'Generate images from text prompts using DALL-E, MidJourney, or Stable Diffusion. Supports multiple styles and resolutions.',
      downloads: '11.2k',
      author: 'openclaw',
      stars: 523,
      version: '2.0.1',
      installCommand: 'clawhub install image-generator'
    },
    {
      name: 'Todo Manager',
      category: 'Productivity',
      description: 'Advanced todo and task management system with priorities, due dates, and project organization. Syncs with popular todo apps.',
      downloads: '5.6k',
      author: 'community',
      stars: 178,
      version: '1.2.0',
      installCommand: 'clawhub install todo'
    },
    {
      name: 'Crypto Tracker',
      category: 'Utilities',
      description: 'Track cryptocurrency prices, portfolios, and market trends. Supports multiple exchanges and real-time alerts.',
      downloads: '4.3k',
      author: 'community',
      stars: 123,
      version: '1.0.0',
      installCommand: 'clawhub install crypto'
    },
    {
      name: 'Music Player',
      category: 'Media',
      description: 'Play and manage your music library directly from OpenClaw. Supports Spotify, Apple Music, and local files.',
      downloads: '3.8k',
      author: 'community',
      stars: 98,
      version: '1.1.1',
      installCommand: 'clawhub install music'
    },
    {
      name: 'Translation',
      category: 'Utilities',
      description: 'Translate text between multiple languages using Google Translate, DeepL, or OpenAI. Supports real-time translation.',
      downloads: '7.4k',
      author: 'openclaw',
      stars: 289,
      version: '1.2.1',
      installCommand: 'clawhub install translate'
    },
    {
      name: 'RSS Reader',
      category: 'Productivity',
      description: 'Stay up to date with your favorite blogs and news sites. Full-text search and offline reading support.',
      downloads: '2.9k',
      author: 'community',
      stars: 87,
      version: '1.0.0',
      installCommand: 'clawhub install rss'
    }
  ]

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Install command copied to clipboard!')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#f1f5f9' }}>
            Skill Library
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px' }}>
            Browse thousands of high-quality, verified skills for your OpenClaw assistant.
            All skills are ready to install with a single command.
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          background: '#1e293b', 
          padding: '2rem', 
          borderRadius: '8px', 
          marginBottom: '3rem',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1',
                minWidth: '300px',
                padding: '0.75rem 1rem',
                border: '2px solid #334155',
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                background: '#0f172a',
                color: '#f1f5f9'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: selectedCategory === category ? 'none' : '1px solid #475569',
                  background: selectedCategory === category 
                    ? '#3b82f6' 
                    : '#0f172a',
                  color: selectedCategory === category ? 'white' : '#94a3b8',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {loading ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '4rem 2rem', 
              color: '#94a3b8' 
            }}>
              Loading skills...
            </div>
          ) : filteredSkills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card"
              onClick={() => navigate(`/skills/${skill.id}`)}
            >
              <div className="skill-header">
                <div>
                  <div className="skill-name">{skill.name}</div>
                  <span className="skill-category">{skill.category}</span>
                </div>
                <span style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  color: '#3b82f6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  v{skill.version}
                </span>
              </div>
              <p className="skill-description">{skill.description}</p>
              <div className="skill-meta">
                <span>
                  <i className="fas fa-download"></i>
                  {skill.downloads}
                </span>
                <span>
                  <i className="fas fa-star" style={{ color: '#ffc107' }}></i>
                  {skill.stars}
                </span>
                <span>
                  <i className="fas fa-user"></i>
                  {skill.author}
                </span>
              </div>
              <button 
                className="install-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard(skill.installCommand)
                }}
              >
                <i className="fas fa-terminal" style={{ marginRight: '0.5rem' }}></i>
                {skill.installCommand}
              </button>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            color: '#64748b' 
          }}>
            <i className="fas fa-search" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}></i>
            <h3 style={{ marginBottom: '0.5rem' }}>No skills found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills
