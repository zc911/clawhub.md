export interface User {
  id: string
  githubId: number
  username: string
  email?: string
  avatarUrl?: string
  bio?: string
  website?: string
  location?: string
  isDeveloper: boolean
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  slug: string
  description: string
  longDescription?: string
  category: string
  authorId: string
  version: string
  license: string
  readme?: string
  repositoryUrl?: string
  homepageUrl?: string
  keywords: string[]
  downloadCount: number
  viewCount: number
  averageRating: number
  reviewCount: number
  isVerified: boolean
  isFeatured: boolean
  isDeprecated: boolean
  isPaid: boolean
  price: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  author: {
    id: string
    username: string
    avatarUrl?: string
  }
}

export interface SkillVersion {
  id: string
  skillId: string
  version: string
  changelog?: string
  manifest: Record<string, any>
  downloadUrl?: string
  size?: number
  sha256?: string
  createdAt: string
}

export interface Review {
  id: string
  skillId: string
  userId: string
  rating: number
  content?: string
  createdAt: string
  updatedAt: string
  user: {
    username: string
    avatarUrl?: string
  }
}

export interface Collection {
  id: string
  userId: string
  name: string
  description?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  skills: {
    skill: Skill
  }[]
}

export interface Purchase {
  id: string
  userId: string
  skillId: string
  amount: number
  currency: string
  stripeId?: string
  status: string
  createdAt: string
  skill: {
    id: string
    name: string
  }
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  pagination?: PaginationInfo
  success?: boolean
}

export interface SkillsResponse {
  data: Skill[]
  pagination: PaginationInfo
}
