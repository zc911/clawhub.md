import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: 'fa-book',
      title: 'Comprehensive Documentation',
      description: 'High-quality, well-maintained documentation for every OpenClaw skill. Learn how to use and customize skills for your needs.'
    },
    {
      icon: 'fa-magic',
      title: 'One-Click Installation',
      description: 'Install any skill directly to your OpenClaw instance with a single command. No complicated setup required.'
    },
    {
      icon: 'fa-users',
      title: 'Community Driven',
      description: 'Skills are contributed and reviewed by the OpenClaw community. Get the best and most useful skills from developers around the world.'
    },
    {
      icon: 'fa-search',
      title: 'Powerful Search',
      description: 'Find exactly what you need with advanced search and filtering. Search by category, popularity, functionality, and more.'
    },
    {
      icon: 'fa-star',
      title: 'Verified Quality',
      description: 'All skills go through a rigorous review process to ensure quality, security, and compatibility with OpenClaw.'
    },
    {
      icon: 'fa-code-branch',
      title: 'Version Control',
      description: 'Track skill versions, update easily, and roll back if needed. Always know what you\'re installing.'
    }
  ]

  const popularSkills = [
    {
      name: 'GitHub',
      category: 'Development',
      description: 'Manage GitHub issues, PRs, and repositories directly from OpenClaw. Create, comment, and review without leaving the terminal.',
      downloads: '12.5k',
      author: 'openclaw',
      installCommand: 'clawhub install github'
    },
    {
      name: 'Weather',
      category: 'Utilities',
      description: 'Get real-time weather information and forecasts for any location. Supports multiple weather providers and units.',
      downloads: '8.2k',
      author: 'community',
      installCommand: 'clawhub install weather'
    },
    {
      name: 'Coding Agent',
      category: 'Development',
      description: 'Powerful coding assistant that can write, review, and refactor code. Supports multiple languages and frameworks.',
      downloads: '15.3k',
      author: 'openclaw',
      installCommand: 'clawhub install coding-agent'
    },
    {
      name: 'Calendar',
      category: 'Productivity',
      description: 'Manage your calendar, schedule meetings, and get reminders. Integrates with Google Calendar, Outlook, and Apple Calendar.',
      downloads: '6.7k',
      author: 'community',
      installCommand: 'clawhub install calendar'
    },
    {
      name: 'Email',
      category: 'Productivity',
      description: 'Read, compose, and send emails directly from OpenClaw. Supports Gmail, Outlook, and IMAP accounts.',
      downloads: '9.1k',
      author: 'community',
      installCommand: 'clawhub install email'
    },
    {
      name: 'YouTube Downloader',
      category: 'Media',
      description: 'Download YouTube videos and audio in multiple formats. Supports playlists, subtitles, and quality selection.',
      downloads: '7.8k',
      author: 'community',
      installCommand: 'clawhub install youtube-dl'
    }
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Install command copied to clipboard!')
  }

  return (
    <>
      <section className="hero">
        <h1>
          The Ultimate Agent Skill <br />
          Documentation Platform
        </h1>
        <p>
          Discover, learn, and install thousands of high-quality skills for your OpenClaw assistant.
          All skills are verified, documented, and ready to use with one click.
        </p>
        <div className="hero-buttons">
          <Link to="/skills" className="btn-primary">
            <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>
            Browse Skills
          </Link>
          <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <i className="fas fa-book" style={{ marginRight: '0.5rem' }}></i>
            Get Started
          </a>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why ClawHub.md?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="skills-container">
          <h2 className="section-title">Popular Skills</h2>
          <div className="skills-grid">
            {popularSkills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <div>
                    <div className="skill-name">{skill.name}</div>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                </div>
                <p className="skill-description">{skill.description}</p>
                <div className="skill-meta">
                  <span>
                    <i className="fas fa-download"></i>
                    {skill.downloads}
                  </span>
                  <span>
                    <i className="fas fa-user"></i>
                    {skill.author}
                  </span>
                </div>
                <button 
                  className="install-btn"
                  onClick={() => copyToClipboard(skill.installCommand)}
                >
                  <i className="fas fa-terminal" style={{ marginRight: '0.5rem' }}></i>
                  {skill.installCommand}
                </button>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/skills" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              View All Skills <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
