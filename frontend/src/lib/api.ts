import axios from 'axios'
import type { ApiResponse, Skill, SkillsResponse, User, Review, Collection } from '../types'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未认证，处理登录逻辑
      console.warn('Unauthorized request')
    }
    return Promise.reject(error)
  }
)

// 认证 API
export const authAPI = {
  getMe: () => api.get<ApiResponse<{ user: User }>>('/auth/me'),
  logout: () => api.post('/auth/logout'),
  getGitHubLoginUrl: () => '/api/auth/github',
}

// 技能 API
export const skillsAPI = {
  getSkills: (params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sort?: 'downloads' | 'rating' | 'newest' | 'trending'
    isVerified?: boolean
    isPaid?: boolean
  }) => api.get<SkillsResponse>('/skills', { params }),

  getSkill: (skillId: string) => api.get<ApiResponse<Skill>>(`/skills/${skillId}`),

  recordInstall: (skillId: string) => api.post(`/skills/${skillId}/install`),

  createSkill: (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<ApiResponse<Skill>>('/skills', data),

  updateSkill: (skillId: string, data: Partial<Skill>) => 
    api.put<ApiResponse<Skill>>(`/skills/${skillId}`, data),

  deleteSkill: (skillId: string) => api.delete(`/skills/${skillId}`),
}

// 用户 API
export const usersAPI = {
  getUser: (username: string) => api.get<ApiResponse<{ user: User; skills: Skill[] }>>(`/users/${username}`),

  getProfile: () => api.get<ApiResponse<User>>('/users/me/profile'),

  updateProfile: (data: Partial<User>) => api.put<ApiResponse<User>>('/users/me/profile', data),

  getCollections: () => api.get<ApiResponse<Collection[]>>('/users/me/collections'),

  createCollection: (data: { name: string; description?: string; isPublic?: boolean }) =>
    api.post<ApiResponse<Collection>>('/users/me/collections', data),

  addToCollection: (collectionId: string, skillId: string) =>
    api.post(`/users/me/collections/${collectionId}/add/${skillId}`),

  removeFromCollection: (collectionId: string, skillId: string) =>
    api.delete(`/users/me/collections/${collectionId}/remove/${skillId}`),

  getReviews: () => api.get<ApiResponse<Review[]>>('/users/me/reviews'),

  createReview: (data: { skillId: string; rating: number; content?: string }) =>
    api.post<ApiResponse<Review>>('/users/me/reviews', data),
}

// 搜索 API
export const searchAPI = {
  search: (params: { q: string; type?: 'all' | 'skills' | 'users'; limit?: number }) =>
    api.get('/search', { params }),

  suggest: (q: string) => api.get('/search/suggest', { params: { q } }),
}

// 管理 API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),

  syncClawhub: () => api.post('/admin/sync/clawhub'),

  verifySkill: (skillId: string, data: { isVerified: boolean; isFeatured?: boolean }) =>
    api.put(`/admin/skills/${skillId}/verify`, data),

  getUsers: (params?: { page?: number; limit?: number }) =>
    api.get('/admin/users', { params }),

  updateUserRole: (userId: string, data: { isDeveloper?: boolean; isAdmin?: boolean }) =>
    api.put(`/admin/users/${userId}/role`, data),
}

export default api
