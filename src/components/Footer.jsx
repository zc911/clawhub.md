import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ClawHub.md</h3>
            <p style={{ color: '#aaa', lineHeight: '1.6', marginTop: '1rem' }}>
              The ultimate Agent Skill Documentation Platform for OpenClaw ecosystem.
              Find, install, and contribute high-quality, executable agent skills.
            </p>
          </div>
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/docs">Documentation</a></li>
              <li><a href="/skills">Skill Library</a></li>
              <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer">OpenClaw Docs</a></li>
              <li><a href="https://clawhub.com" target="_blank" rel="noopener noreferrer">ClawHub Registry</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Community</h3>
            <ul>
              <li><a href="https://github.com/openclaw" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://discord.com/invite/clawd" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="https://twitter.com/openclaw_ai" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="mailto:zack.mm.chen@gmail.com" target="_blank" rel="noopener noreferrer">Contact Me</a></li>
              <li><a href="/contribute">Contribute</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/license">License</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ClawHub.md. Built with ❤️ for the OpenClaw community.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
