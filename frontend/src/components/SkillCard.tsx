import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Download, Star, User, Clock, Copy, Check } from 'lucide-react'
import { Button } from './ui/Button'
import type { Skill } from '../types'
import { toast } from 'sonner'

interface SkillCardProps {
  skill: Skill
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const navigate = useNavigate()
  const [copied, setCopied] = React.useState(false)

  const handleCardClick = () => {
    navigate(`/skills/${skill.id}`)
  }

  const handleInstallClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const command = `clawhub install ${skill.slug}`
    navigator.clipboard.writeText(command)
    setCopied(true)
    toast.success('Install command copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group rounded-lg border border-border bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{skill.name}</h3>
            {skill.isVerified && (
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                Verified
              </span>
            )}
          </div>
          <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary/30">
            {skill.category}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">v{skill.version}</span>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {skill.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Download className="h-3.5 w-3.5" />
          {skill.downloadCount.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 text-yellow-400" />
          {skill.averageRating.toFixed(1)}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {skill.author.username}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {new Date(skill.createdAt).toLocaleDateString()}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleInstallClick}
        className="w-full justify-between font-mono text-xs group-hover:border-primary group-hover:text-primary"
      >
        <span>clawhub install {skill.slug}</span>
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  )
}

export default SkillCard
