import express from 'express'
import { z } from 'zod'
import { prisma, logger } from '../server.js'
import { isAdmin } from './auth.js'
import ClawHubSyncService from '../services/clawhub-sync.js'

const router = express.Router()

// 管理后台仪表盘统计
router.get('/dashboard', isAdmin, async (req, res, next) => {
  try {
    const [totalUsers, totalSkills, totalDownloads, totalReviews, newUsersToday, newSkillsToday] = await Promise.all([
      prisma.user.count(),
      prisma.skill.count(),
      prisma.skill.aggregate({ _sum: { downloadCount: true } }),
      prisma.review.count(),
      prisma.user.count({
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
      }),
      prisma.skill.count({
        where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } }
      })
    ])

    res.json({
      stats: {
        totalUsers,
        totalSkills,
        totalDownloads: totalDownloads._sum.downloadCount || 0,
        totalReviews,
        newUsersToday,
        newSkillsToday
      }
    })
  } catch (error) {
    next(error)
  }
})

// 同步 ClawHub 技能
router.post('/sync/clawhub', isAdmin, async (req, res, next) => {
  try {
    const syncService = new ClawHubSyncService()
    const result = await syncService.syncAllSkills()

    logger.info(`ClawHub sync completed: ${result.synced} skills synced, ${result.created} created, ${result.updated} updated`)

    res.json({
      success: true,
      ...result
    })
  } catch (error) {
    logger.error('ClawHub sync failed:', error)
    next(error)
  }
})

// 审核技能
const VerifySkillSchema = z.object({
  isVerified: z.boolean(),
  isFeatured: z.boolean().optional(),
  notes: z.string().optional()
})

router.put('/skills/:skillId/verify', isAdmin, async (req, res, next) => {
  try {
    const { skillId } = req.params
    const body = VerifySkillSchema.parse(req.body)

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        isVerified: body.isVerified,
        isFeatured: body.isFeatured || false
      }
    })

    logger.info(`Skill ${skill.name} ${body.isVerified ? 'verified' : 'unverified'} by admin`)
    res.json(skill)
  } catch (error) {
    next(error)
  }
})

// 获取所有用户
router.get('/users', isAdmin, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, username: true, email: true, avatarUrl: true,
          isDeveloper: true, isAdmin: true, createdAt: true,
          _count: { select: { skills: true } }
        }
      }),
      prisma.user.count()
    ])

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    })
  } catch (error) {
    next(error)
  }
})

// 更新用户权限
const UpdateUserRoleSchema = z.object({
  isDeveloper: z.boolean().optional(),
  isAdmin: z.boolean().optional()
})

router.put('/users/:userId/role', isAdmin, async (req, res, next) => {
  try {
    const { userId } = req.params
    const body = UpdateUserRoleSchema.parse(req.body)

    const user = await prisma.user.update({
      where: { id: userId },
      data: body
    })

    logger.info(`User ${user.username} role updated: ${JSON.stringify(body)}`)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// 获取系统日志
router.get('/logs', isAdmin, async (req, res, next) => {
  try {
    // 这里可以集成日志系统，比如 Elasticsearch 或直接读取日志文件
    res.json({ logs: [] })
  } catch (error) {
    next(error)
  }
})

// 系统设置
router.get('/settings', isAdmin, async (req, res, next) => {
  try {
    res.json({
      settings: {
        siteName: 'ClawHub.md',
        siteDescription: 'Agent Skill Marketplace for OpenClaw',
        allowNewRegistrations: true,
        requireEmailVerification: false,
        skillSubmissionEnabled: true,
        paymentEnabled: false,
        platformFeePercentage: 15
      }
    })
  } catch (error) {
    next(error)
  }
})

// 更新系统设置
router.put('/settings', isAdmin, async (req, res, next) => {
  try {
    // 这里可以实现设置更新逻辑，保存到数据库或配置文件
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export default router
