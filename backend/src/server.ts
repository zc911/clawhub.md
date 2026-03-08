import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import passport from 'passport'
import pgSession from 'connect-pg-simple'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import winston from 'winston'

// 加载环境变量
dotenv.config()

// 初始化 Prisma
export const prisma = new PrismaClient()

// 初始化日志
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// 初始化 Express
const app = express()
const PORT = process.env.PORT || 3001
const PGStore = pgSession(session)

// 中间件
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// 限流
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 100个请求
  standardHeaders: true,
  legacyHeaders: false
})
app.use(limiter)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Session 配置
app.use(session({
  store: new PGStore({
    prisma: prisma,
    tableName: 'sessions'
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30天
    httpOnly: true,
    sameSite: 'lax'
  }
}))

// Passport 初始化
app.use(passport.initialize())
app.use(passport.session())

// 路由
import authRoutes from './routes/auth.js'
import skillsRoutes from './routes/skills.js'
import usersRoutes from './routes/users.js'
import searchRoutes from './routes/search.js'
import adminRoutes from './routes/admin.js'

app.use('/api/auth', authRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/admin', adminRoutes)

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  })
})

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err)
  res.status(err.statusCode || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  })
})

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// 启动服务器
async function startServer() {
  try {
    await prisma.$connect()
    logger.info('Database connected successfully')

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`)
      logger.info(`📊 Health check: http://localhost:${PORT}/api/health`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

// 优雅关闭
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})
