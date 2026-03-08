const BASE_URL = 'https://api.clawhub.com/v1'

const clawhubAPI = {
  /**
   * 获取技能列表
   * @param {Object} params - 查询参数
   * @param {string} params.q - 搜索关键词
   * @param {string} params.category - 分类
   * @param {number} params.page - 页码
   * @param {number} params.limit - 每页数量
   */
  async getSkills(params = {}) {
    try {
      // 暂时使用 mock 数据，等 API  ready 后替换
      // const response = await fetch(`${BASE_URL}/skills?${new URLSearchParams(params)}`)
      // return await response.json()
      
      // Mock 数据
      return {
        data: [
          {
            id: 'github',
            name: 'GitHub',
            category: 'Development',
            description: 'Manage GitHub issues, PRs, and repositories directly from OpenClaw. Create, comment, and review without leaving the terminal.',
            downloads: '12.5k',
            author: 'openclaw',
            stars: 456,
            version: '1.2.3',
            installCommand: 'clawhub install github',
            updatedAt: '2024-03-08',
            tags: ['git', 'github', 'development', 'productivity']
          },
          {
            id: 'weather',
            name: 'Weather',
            category: 'Utilities',
            description: 'Get real-time weather information and forecasts for any location. Supports multiple weather providers and units.',
            downloads: '8.2k',
            author: 'community',
            stars: 234,
            version: '1.0.1',
            installCommand: 'clawhub install weather',
            updatedAt: '2024-03-07',
            tags: ['weather', 'utilities', 'life']
          },
          {
            id: 'coding-agent',
            name: 'Coding Agent',
            category: 'Development',
            description: 'Powerful coding assistant that can write, review, and refactor code. Supports multiple languages and frameworks.',
            downloads: '15.3k',
            author: 'openclaw',
            stars: 678,
            version: '2.1.0',
            installCommand: 'clawhub install coding-agent',
            updatedAt: '2024-03-05',
            tags: ['coding', 'ai', 'development', 'programming']
          },
          {
            id: 'calendar',
            name: 'Calendar',
            category: 'Productivity',
            description: 'Manage your calendar, schedule meetings, and get reminders. Integrates with Google Calendar, Outlook, and Apple Calendar.',
            downloads: '6.7k',
            author: 'community',
            stars: 189,
            version: '1.1.0',
            installCommand: 'clawhub install calendar',
            updatedAt: '2024-03-06',
            tags: ['calendar', 'schedule', 'productivity']
          },
          {
            id: 'email',
            name: 'Email',
            category: 'Productivity',
            description: 'Read, compose, and send emails directly from OpenClaw. Supports Gmail, Outlook, and IMAP accounts.',
            downloads: '9.1k',
            author: 'community',
            stars: 345,
            version: '1.3.2',
            installCommand: 'clawhub install email',
            updatedAt: '2024-03-04',
            tags: ['email', 'communication', 'productivity']
          },
          {
            id: 'youtube-dl',
            name: 'YouTube Downloader',
            category: 'Media',
            description: 'Download YouTube videos and audio in multiple formats. Supports playlists, subtitles, and quality selection.',
            downloads: '7.8k',
            author: 'community',
            stars: 267,
            version: '1.0.0',
            installCommand: 'clawhub install youtube-dl',
            updatedAt: '2024-03-01',
            tags: ['youtube', 'media', 'download']
          },
          {
            id: 'image-generator',
            name: 'Image Generator',
            category: 'Creative',
            description: 'Generate images from text prompts using DALL-E, MidJourney, or Stable Diffusion. Supports multiple styles and resolutions.',
            downloads: '11.2k',
            author: 'openclaw',
            stars: 523,
            version: '2.0.1',
            installCommand: 'clawhub install image-generator',
            updatedAt: '2024-03-02',
            tags: ['ai', 'image', 'creative', 'generation']
          },
          {
            id: 'todo',
            name: 'Todo Manager',
            category: 'Productivity',
            description: 'Advanced todo and task management system with priorities, due dates, and project organization. Syncs with popular todo apps.',
            downloads: '5.6k',
            author: 'community',
            stars: 178,
            version: '1.2.0',
            installCommand: 'clawhub install todo',
            updatedAt: '2024-02-28',
            tags: ['todo', 'task', 'productivity', 'organization']
          },
          {
            id: 'crypto',
            name: 'Crypto Tracker',
            category: 'Utilities',
            description: 'Track cryptocurrency prices, portfolios, and market trends. Supports multiple exchanges and real-time alerts.',
            downloads: '4.3k',
            author: 'community',
            stars: 123,
            version: '1.0.0',
            installCommand: 'clawhub install crypto',
            updatedAt: '2024-02-25',
            tags: ['crypto', 'finance', 'tracking', 'utilities']
          },
          {
            id: 'music',
            name: 'Music Player',
            category: 'Media',
            description: 'Play and manage your music library directly from OpenClaw. Supports Spotify, Apple Music, and local files.',
            downloads: '3.8k',
            author: 'community',
            stars: 98,
            version: '1.1.1',
            installCommand: 'clawhub install music',
            updatedAt: '2024-02-20',
            tags: ['music', 'media', 'player']
          },
          {
            id: 'translate',
            name: 'Translation',
            category: 'Utilities',
            description: 'Translate text between multiple languages using Google Translate, DeepL, or OpenAI. Supports real-time translation.',
            downloads: '7.4k',
            author: 'openclaw',
            stars: 289,
            version: '1.2.1',
            installCommand: 'clawhub install translate',
            updatedAt: '2024-03-03',
            tags: ['translation', 'language', 'utilities']
          },
          {
            id: 'rss',
            name: 'RSS Reader',
            category: 'Productivity',
            description: 'Stay up to date with your favorite blogs and news sites. Full-text search and offline reading support.',
            downloads: '2.9k',
            author: 'community',
            stars: 87,
            version: '1.0.0',
            installCommand: 'clawhub install rss',
            updatedAt: '2024-02-18',
            tags: ['rss', 'news', 'reader', 'productivity']
          }
        ],
        pagination: {
          page: 1,
          limit: 20,
          total: 12,
          totalPages: 1
        }
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error)
      throw error
    }
  },

  /**
   * 获取单个技能详情
   * @param {string} skillId - 技能ID
   */
  async getSkill(skillId) {
    try {
      // const response = await fetch(`${BASE_URL}/skills/${skillId}`)
      // return await response.json()
      
      // Mock 数据
      const skills = await this.getSkills()
      return skills.data.find(s => s.id === skillId)
    } catch (error) {
      console.error('Failed to fetch skill:', error)
      throw error
    }
  },

  /**
   * 搜索技能
   * @param {string} query - 搜索关键词
   */
  async searchSkills(query) {
    return this.getSkills({ q: query })
  },

  /**
   * 获取分类列表
   */
  async getCategories() {
    try {
      // const response = await fetch(`${BASE_URL}/categories`)
      // return await response.json()
      
      return [
        'all', 'Development', 'Productivity', 'Utilities', 'Media', 'Creative', 'Business', 'LifeStyle'
      ]
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      throw error
    }
  },

  /**
   * 获取统计数据
   */
  async getStats() {
    try {
      // const response = await fetch(`${BASE_URL}/stats`)
      // return await response.json()
      
      return {
        totalSkills: 128,
        totalDownloads: '1.2M',
        totalDevelopers: 456,
        activeUsers: '23K'
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      throw error
    }
  }
}

export default clawhubAPI
