import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import SkillCard from '../components/SkillCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { skillsAPI } from '../lib/api'
import type { Skill } from '../types'

const Skills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ['skills', selectedCategory, searchTerm],
    queryFn: () => skillsAPI.getSkills({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      search: searchTerm || undefined,
      limit: 100,
    }),
  })

  const categories = [
    'all', 'Development', 'Productivity', 'Utilities', 'Media', 'Creative', 'Business', 'LifeStyle'
  ]

  const skills = skillsData?.data?.data || []

  const filteredSkills = skills.filter((skill: Skill) => {
    const matchesSearch = !searchTerm || 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="flex justify-center">
          <LoadingSpinner size="xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Skill Library</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse thousands of high-quality, verified skills for your OpenClaw assistant.
          All skills are ready to install with a single command.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-semibold mb-2">No skills found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill: Skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Skills
