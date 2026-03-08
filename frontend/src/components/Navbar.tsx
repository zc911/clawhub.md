import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Search, Terminal, User, LogOut, Settings } from 'lucide-react'
import { useAuthStore } from '../store/auth-store'
import { Button } from './ui/Button'

const Navbar: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ClawHub<span className="text-primary">.md</span></span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4 md:justify-between">
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/skills"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Skills
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:zack.mm.chen@gmail.com"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-64"
            >
              <Search className="h-4 w-4 mr-2" />
              <span className="text-muted-foreground">Search skills...</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="relative group">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <img
                      src={user?.avatarUrl || 'https://github.com/shadcn.png'}
                      alt={user?.username || 'User'}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="hidden md:inline">{user?.username}</span>
                  </Button>
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover p-2 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent text-left">
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                    </Link>
                    <Link to="/settings">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent text-left">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </Link>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-destructive/10 hover:text-destructive text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={login} className="gap-2">
                <Github className="h-4 w-4" />
                Login with GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
