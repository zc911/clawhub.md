import express from 'express'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { prisma, logger } from '../server.js'

const router = express.Router()

// Passport GitHub 策略配置
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3001/api/auth/github/callback',
  scope: ['user:email']
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  try {
    const email = profile.emails?.[0]?.value

    // 查找或创建用户
    let user = await prisma.user.findUnique({
      where: { githubId: profile.id }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: profile.id,
          username: profile.username,
          email: email,
          avatarUrl: profile.photos?.[0]?.value,
          bio: profile._json?.bio,
          website: profile._json?.blog,
          location: profile._json?.location
        }
      })
      logger.info(`New user created: ${profile.username}`)
    } else {
      // 更新用户信息
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          username: profile.username,
          email: email || user.email,
          avatarUrl: profile.photos?.[0]?.value || user.avatarUrl,
          bio: profile._json?.bio || user.bio,
          website: profile._json?.blog || user.website,
          location: profile._json?.location || user.location
        }
      })
    }

    done(null, user)
  } catch (error) {
    logger.error('GitHub auth error:', error)
    done(error)
  }
}))

// 序列化用户
passport.serializeUser((user: any, done: any) => {
  done(null, user.id)
})

// 反序列化用户
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        isDeveloper: true,
        isAdmin: true
      }
    })
    done(null, user)
  } catch (error) {
    done(error)
  }
})

// GitHub 登录
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

// GitHub 回调
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // 认证成功，重定向到前端
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000')
  }
)

// 获取当前用户信息
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user })
  } else {
    res.status(401).json({ error: 'Not authenticated' })
  }
})

// 登出
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.json({ success: true })
  })
})

// 认证中间件
export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ error: 'Unauthorized' })
}

// 开发者中间件
export const isDeveloper = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated() && (req.user as any).isDeveloper) {
    return next()
  }
  res.status(403).json({ error: 'Forbidden: Developer access required' })
}

// 管理员中间件
export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated() && (req.user as any).isAdmin) {
    return next()
  }
  res.status(403).json({ error: 'Forbidden: Admin access required' })
}

export default router
