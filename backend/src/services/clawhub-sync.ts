import axios from 'axios'
import { prisma, logger } from '../server.js'

class ClawHubSyncService {
  private baseUrl = 'https://api.clawhub.com/v1'

  /**
   * 同步所有技能
   */
  async syncAllSkills() {
    try {
      logger.info('Starting ClawHub sync...')

      // 获取所有技能
      const response = await axios.get(`${this.baseUrl}/skills`, {
        params: { limit: 1000 }
      })

      const skills = response.data.data
      let createdCount = 0
      let updatedCount = 0

      for (const skillData of skills) {
        const existingSkill = await prisma.skill.findUnique({
          where: { slug: skillData.name.toLowerCase().replace(/\s+/g, '-') }
        })

        if (!existingSkill) {
          // 创建新技能
          await this.createSkill(skillData)
          createdCount++
        } else {
          // 更新现有技能
          await this.updateSkill(existingSkill.id, skillData)
          updatedCount++
        }
      }

      logger.info(`Sync completed: ${skills.length} skills processed, ${createdCount} created, ${updatedCount} updated`)

      return {
        success: true,
        total: skills.length,
        synced: skills.length,
        created: createdCount,
        updated: updatedCount
      }
    } catch (error) {
      logger.error('ClawHub sync failed:', error)
      throw error
    }
  }

  /**
   * 创建新技能
   */
  private async createSkill(skillData: any) {
    try {
      // 查找或创建系统用户作为作者
      let systemUser = await prisma.user.findUnique({
        where: { username: 'clawhub' }
      })

      if (!systemUser) {
        systemUser = await prisma.user.create({
          data: {
            githubId: 0, // 系统用户特殊ID
            username: 'clawhub',
            email: 'official@clawhub.com',
            isDeveloper: true,
            isAdmin: true,
            bio: 'Official ClawHub System User'
          }
        })
      }

      // 生成 slug
      const slug = skillData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

      const skill = await prisma.skill.create({
        data: {
          name: skillData.name,
          slug,
          description: skillData.description || '',
          longDescription: skillData.longDescription,
          category: skillData.category || 'Utilities',
          authorId: systemUser.id,
          version: skillData.version || '1.0.0',
          license: skillData.license || 'MIT',
          readme: skillData.readme,
          repositoryUrl: skillData.repositoryUrl,
          homepageUrl: skillData.homepageUrl,
          keywords: skillData.keywords || [],
          downloadCount: skillData.downloadCount || 0,
          isVerified: true, // 官方技能默认认证
          isFeatured: skillData.isFeatured || false,
          publishedAt: new Date()
        }
      })

      // 创建版本记录
      await prisma.skillVersion.create({
        data: {
          skillId: skill.id,
          version: skillData.version || '1.0.0',
          changelog: skillData.changelog,
          manifest: skillData.manifest || {},
          downloadUrl: skillData.downloadUrl,
          size: skillData.size
        }
      })

      logger.info(`Created new skill: ${skillData.name}`)
      return skill
    } catch (error) {
      logger.error(`Failed to create skill ${skillData.name}:`, error)
      throw error
    }
  }

  /**
   * 更新现有技能
   */
  private async updateSkill(skillId: string, skillData: any) {
    try {
      const skill = await prisma.skill.update({
        where: { id: skillId },
        data: {
          description: skillData.description,
          longDescription: skillData.longDescription,
          category: skillData.category,
          version: skillData.version,
          license: skillData.license,
          readme: skillData.readme,
          repositoryUrl: skillData.repositoryUrl,
          homepageUrl: skillData.homepageUrl,
          keywords: skillData.keywords,
          downloadCount: skillData.downloadCount,
          isFeatured: skillData.isFeatured,
          updatedAt: new Date()
        }
      })

      // 检查版本是否更新
      const latestVersion = await prisma.skillVersion.findFirst({
        where: { skillId },
        orderBy: { createdAt: 'desc' }
      })

      if (!latestVersion || latestVersion.version !== skillData.version) {
        await prisma.skillVersion.create({
          data: {
            skillId,
            version: skillData.version,
            changelog: skillData.changelog,
            manifest: skillData.manifest || {},
            downloadUrl: skillData.downloadUrl,
            size: skillData.size
          }
        })
        logger.info(`Created new version for ${skill.name}: ${skillData.version}`)
      }

      logger.debug(`Updated skill: ${skill.name}`)
      return skill
    } catch (error) {
      logger.error(`Failed to update skill ${skillId}:`, error)
      throw error
    }
  }

  /**
   * 同步单个技能
   */
  async syncSkill(skillName: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/skills/${skillName}`)
      const skillData = response.data

      const existingSkill = await prisma.skill.findUnique({
        where: { slug: skillName.toLowerCase() }
      })

      if (existingSkill) {
        await this.updateSkill(existingSkill.id, skillData)
      } else {
        await this.createSkill(skillData)
      }

      return { success: true }
    } catch (error) {
      logger.error(`Failed to sync skill ${skillName}:`, error)
      throw error
    }
  }

  /**
   * 获取热门技能
   */
  async getTrendingSkills(limit = 20) {
    try {
      const response = await axios.get(`${this.baseUrl}/trending`, {
        params: { limit }
      })
      return response.data
    } catch (error) {
      logger.error('Failed to fetch trending skills:', error)
      return []
    }
  }
}

export default ClawHubSyncService
