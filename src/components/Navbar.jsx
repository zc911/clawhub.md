import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <i className="fas fa-claw"></i>
          <span>ClawHub.md</span>
        </Link>
        <div className="nav-links">
          <Link to="/skills">Skills</Link>
          <Link to="/docs">Documentation</Link>
          <a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:zack.mm.chen@gmail.com" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
          <Link to="/skills" className="btn-primary">
            Browse Skills
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
