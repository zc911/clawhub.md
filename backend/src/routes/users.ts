import express from 'express'
import { z } from 'zod'
import { prisma } from '../server.js'
import { isAuthenticated } from './auth.js'

const router = express.Router()

// 获取用户公开信息
router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        bio: true,
        website: true,
        location: true,
        isDeveloper: true,
        createdAt: true,
        _count: {
          select: { skills: true, reviews: true, collections: true }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // 获取用户公开的技能
    const skills = await prisma.skill.findMany({
      where: { authorId: user.id, isDeprecated: false },
      select: {
        id: true, name: true, slug: true, description: true,
        downloadCount: true, averageRating: true, createdAt: true
      }
    })

    res.json({ user, skills })
  } catch (error) {
    next(error)
  }
})

// 获取当前用户的个人信息
router.get('/me/profile', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        skills: { orderBy: { createdAt: 'desc' } },
        collections: { include: { _count: { select: { skills: true } } } },
        purchases: { include: { skill: { select: { id: true, name: true } } } }
      }
    })

    res.json(profile)
  } catch (error) {
    next(error)
  }
})

// 更新用户个人信息
const UpdateProfileSchema = z.object({
  bio: z.string().max(500).optional(),
  website: z.string().url().optional(),
  location: z.string().max(100).optional(),
  isDeveloper: z.boolean().optional()
})

router.put('/me/profile', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any
    const body = UpdateProfileSchema.parse(req.body)

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: body
    })

    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

// 获取用户收藏的技能
router.get('/me/collections', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any

    const collections = await prisma.collection.findMany({
      where: { userId: user.id },
      include: {
        skills: {
          include: {
            skill: {
              select: {
                id: true, name: true, slug: true, description: true,
                downloadCount: true, averageRating: true
              }
            }
          }
        }
      }
    })

    res.json(collections)
  } catch (error) {
    next(error)
  }
})

// 创建收藏夹
const CreateCollectionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false)
})

router.post('/me/collections', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any
    const body = CreateCollectionSchema.parse(req.body)

    const collection = await prisma.collection.create({
      data: {
        ...body,
        userId: user.id
      }
    })

    res.status(201).json(collection)
  } catch (error) {
    next(error)
  }
})

// 添加技能到收藏夹
router.post('/me/collections/:collectionId/add/:skillId', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any
    const { collectionId, skillId } = req.params

    // 验证收藏夹属于当前用户
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId, userId: user.id }
    })

    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' })
    }

    await prisma.collectionSkill.create({
      data: { collectionId, skillId }
    })

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

// 移除技能从收藏夹
router.delete('/me/collections/:collectionId/remove/:skillId', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any
    const { collectionId, skillId } = req.params

    await prisma.collectionSkill.delete({
      where: {
        collectionId_skillId: { collectionId, skillId },
        collection: { userId: user.id }
      }
    })

    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

// 获取用户的评论
router.get('/me/reviews', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any

    const reviews = await prisma.review.findMany({
      where: { userId: user.id },
      include: {
        skill: { select: { id: true, name: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

// 添加评论
const CreateReviewSchema = z.object({
  skillId: z.string(),
  rating: z.number().int().min(1).max(5),
  content: z.string().max(2000).optional()
})

router.post('/me/reviews', isAuthenticated, async (req, res, next) => {
  try {
    const user = req.user as any
    const body = CreateReviewSchema.parse(req.body)

    // 检查是否已经评论过
    const existingReview = await prisma.review.findUnique({
      where: {
        skillId_userId: { skillId: body.skillId, userId: user.id }
      }
    })

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this skill' })
    }

    const review = await prisma.review.create({
      data: {
        ...body,
        userId: user.id
      }
    })

    // 更新技能的平均评分和评论数
    const reviews = await prisma.review.findMany({
      where: { skillId: body.skillId }
    })

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await prisma.skill.update({
      where: { id: body.skillId },
      data: {
        averageRating,
        reviewCount: reviews.length
      }
    })

    res.status(201).json(review)
  } catch (error) {
    next(error)
  }
})

export default router
