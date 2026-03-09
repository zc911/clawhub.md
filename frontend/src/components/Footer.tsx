import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">C</span>
              </div>
              <span className="font-bold text-lg">ClawHub.md</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The ultimate Agent Skill Marketplace for the OpenClaw ecosystem.
              Find, install, and publish high-quality, executable agent skills.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/openclaw_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:zack.mm.chen@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skill Library
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.openclaw.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  OpenClaw Docs
                </a>
              </li>
              <li>
                <a
                  href="https://clawhub.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  ClawHub Registry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/openclaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/invite/clawd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/openclaw_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <Link to="/contribute" className="text-muted-foreground hover:text-primary transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/license" className="text-muted-foreground hover:text-primary transition-colors">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500" /> for the OpenClaw community
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} ClawHub.md. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
