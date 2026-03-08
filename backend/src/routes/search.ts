import express from 'express'
import { z } from 'zod'
import { prisma } from '../server.js'

const router = express.Router()

const SearchSchema = z.object({
  q: z.string().min(1),
  type: z.enum(['all', 'skills', 'users']).default('all'),
  limit: z.coerce.number().min(1).max(50).default(20)
})

router.get('/', async (req, res, next) => {
  try {
    const query = SearchSchema.parse(req.query)
    const searchTerm = query.q.toLowerCase()

    const results: { skills: any[], users: any[] } = { skills: [], users: [] }

    // 搜索技能
    if (query.type === 'all' || query.type === 'skills') {
      results.skills = await prisma.skill.findMany({
        where: {
          isDeprecated: false,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { keywords: { has: searchTerm } }
          ]
        },
        select: {
          id: true, name: true, slug: true, description: true, category: true,
          downloadCount: true, averageRating: true, author: { select: { username: true } }
        },
        take: query.limit,
        orderBy: [
          { isVerified: 'desc' },
          { downloadCount: 'desc' },
          { averageRating: 'desc' }
        ]
      })
    }

    // 搜索用户
    if (query.type === 'all' || query.type === 'users') {
      results.users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: searchTerm, mode: 'insensitive' } },
            { bio: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true, username: true, avatarUrl: true, bio: true, isDeveloper: true,
          _count: { select: { skills: true } }
        },
        take: query.limit,
        orderBy: {
          isDeveloper: 'desc'
        }
      })
    }

    res.json({
      query: query.q,
      results,
      total: results.skills.length + results.users.length
    })
  } catch (error) {
    next(error)
  }
})

// 自动补全
router.get('/suggest', async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.json({ suggestions: [] })
    }

    const skills = await prisma.skill.findMany({
      where: {
        isDeprecated: false,
        name: { startsWith: q, mode: 'insensitive' }
      },
      select: { name: true, category: true },
      take: 10
    })

    const suggestions = skills.map(s => ({
      text: s.name,
      category: s.category,
      type: 'skill'
    }))

    res.json({ suggestions })
  } catch (error) {
    next(error)
  }
})

export default router
