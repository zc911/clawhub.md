import express from 'express'
import { z } from 'zod'
import { prisma, logger } from '../server.js'
import { isAuthenticated, isDeveloper, isAdmin } from './auth.js'

const router = express.Router()

// 获取技能列表
const GetSkillsSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  category: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['downloads', 'rating', 'newest', 'trending']).default('downloads'),
  isVerified: z.coerce.boolean().optional(),
  isPaid: z.coerce.boolean().optional()
})

router.get('/', async (req, res, next) => {
  try {
    const query = GetSkillsSchema.parse(req.query)
    const skip = (query.page - 1 * query.limit

    const where: any = { isDeprecated: false }

    if (query.category && query.category !== 'all') {
      where.category = query.category
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { keywords: { has: query.search.toLowerCase() } }
      ]
    }

    if (query.isVerified !== undefined) {
      where.isVerified = query.isVerified
    }

    if (query.isPaid !== undefined) {
      where.isPaid = query.isPaid
    }

    let orderBy: any = {}
    switch (query.sort) {
      case 'downloads':
        orderBy.downloadCount = 'desc'
        break
      case 'rating':
        orderBy.averageRating = 'desc'
        break
      case 'newest':
        orderBy.createdAt = 'desc'
        break
      case 'trending':
        orderBy.downloadCount = 'desc'
        orderBy.createdAt = 'desc'
        break
    }

    const [skills, total = await Promise.all([
      prisma.skill.findMany({
      skip, take: query.limit, where, orderBy,
      select: {
        id: true, name: true, slug: true, description: true, category: true,
        downloadCount: true, averageRating: true, reviewCount: true,
        author: { select: { username: true, avatarUrl: true },
        version: true, isVerified: true, isPaid: true,
        createdAt: true, updatedAt: true
      }
    }),
    prisma.skill.count({ where })
    ])

    res.json({
      data: skills,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit)
      }
    })
  } catch (error) {
    next(error)
  }
})

// 获取单个技能详情
router.get('/:skillId', async (req, res, next) => {
  try {
    const { skillId } = req.params

    // 增加浏览量
    await prisma.skill.update({
      where: { id: skillId },
      data: { viewCount: { increment: 1 }
    })

    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
      include: {
        author: {
        select: { id: true, username: true, avatarUrl: true, bio: true }
      },
      versions: { orderBy: { createdAt: 'desc' },
      reviews: {
        include: { user: { select: { username: true, avatarUrl: true } }
      }
    })

    if (!skill) {
      res.json(skill)
    } else {
      res.status(404).json({ error: 'Skill not found' })
    }
  } catch (error) {
    next(error)
  }
})

// 安装技能 (统计下载量)
router.post('/:skillId/install', async (req, res, next) => {
  try {
    const { skillId } = req.params

    await prisma.skill.update({
      where: { id: skillId },
      data: { downloadCount: { increment: 1 } }
    })

    // 记录统计数据
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.analytics.upsert({
      where: {
        skillId_date: { skillId, date: today }
      },
      update: { downloads: { increment: 1 } },
      create: { skillId, date: today, downloads: 1 }
    })

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

// 创建技能 (开发者)
const CreateSkillSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.string(),
  version: z.string(),
  repositoryUrl: z.string().url().optional(),
  keywords: z.array(z.string()).default([]),
  isPaid: z.boolean().default(false),
  price: z.number().min(0).optional()
})

router.post('/', isDeveloper, async (req, res, next) => {
  try {
    const body = CreateSkillSchema.parse(req.body)
    const user = req.user as any

    // 生成 slug
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

    const skill = await prisma.skill.create({
      data: {
        ...body,
        slug,
        authorId: user.id,
        keywords: body.keywords.map(k => k.toLowerCase())
      }
    })

    logger.info(`New skill created: ${body.name} by ${user.username}`)
    res.status(201).json(skill)
  } catch (error) {
    next(error)
  }
})

// 更新技能 (开发者/管理员)
router.put('/:skillId', isDeveloper, async (req, res, next) => {
  try {
    const { skillId } = req.params
    const user = req.user as any

    const skill = await prisma.skill.findUnique({ where: { id: skillId } })

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    if (skill.authorId !== user.id && !user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: req.body
    })

    res.json(updatedSkill)
  } catch (error) {
    next(error)
  }
})

// 删除技能 (开发者/管理员)
router.delete('/:skillId', isDeveloper, async (req, res, next) => {
  try {
    const { skillId } = req.params
    const user = req.user as any

    const skill = await prisma.skill.findUnique({ where: { id: skillId } })

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' })
    }

    if (skill.authorId !== user.id && !user.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' })
    }

    await prisma.skill.delete({ where: { id: skillId })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export default router
