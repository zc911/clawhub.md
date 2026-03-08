import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Terminal, Book, Users, Search, Zap, Shield, Code, Layers } from 'lucide-react'
import { Button } from '../components/ui/Button'
import SkillCard from '../components/SkillCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { skillsAPI } from '../lib/api'

const Home: React.FC = () => {
  const { data: skillsData, isLoading } = useQuery({
    queryKey: ['popular-skills'],
    queryFn: () => skillsAPI.getSkills({ limit: 6, sort: 'downloads' }),
  })

  const features = [
    {
      icon: <Book className="h-10 w-10 text-primary" />,
      title: 'Comprehensive Documentation',
      description: 'High-quality, well-maintained documentation for every OpenClaw skill. Learn how to use and customize skills for your needs.'
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: 'One-Click Installation',
      description: 'Install any skill directly to your OpenClaw instance with a single command. No complicated setup required.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Community Driven',
      description: 'Skills are contributed and reviewed by the OpenClaw community. Get the best and most useful skills from developers around the world.'
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: 'Powerful Search',
      description: 'Find exactly what you need with advanced search and filtering. Search by category, popularity, functionality, and more.'
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Verified Quality',
      description: 'All skills go through a rigorous review process to ensure quality, security, and compatibility with OpenClaw.'
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: 'Version Control',
      description: 'Track skill versions, update easily, and roll back if needed. Always know what you\'re installing.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm text-primary">
              <Terminal className="h-4 w-4" />
              <span>Welcome to the future of AI assistants</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              The Ultimate <span className="text-primary">Agent Skill</span> Marketplace
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, learn, and install thousands of high-quality skills for your OpenClaw assistant.
              All skills are verified, documented, and ready to use with one click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/skills">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Search className="h-4 w-4" />
                  Browse Skills
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                  <Book className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why ClawHub.md?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for the OpenClaw community, by the OpenClaw community.
              We make it easy to find, use, and share AI assistant skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
                Popular Skills
              </h2>
              <p className="text-muted-foreground">
                Check out the most downloaded skills from our community
              </p>
            </div>
            <Link to="/skills">
              <Button variant="outline">View All Skills</Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="xl" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData?.data?.data?.slice(0, 6).map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent border-t border-border">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to supercharge your OpenClaw assistant?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of developers and users building the future of AI assistants.
              Start using skills today or publish your own skills for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/skills">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Now
                </Button>
              </Link>
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                  <Code className="h-4 w-4" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
