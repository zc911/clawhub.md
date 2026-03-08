import { create } from 'zustand'
import type { User } from '../types'
import { authAPI } from '../lib/api'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  init: () => Promise<void>
  login: () => void
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  init: async () => {
    try {
      const response = await authAPI.getMe()
      set({
        user: response.data?.user || null,
        isAuthenticated: !!response.data?.user,
        isLoading: false,
        error: null
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      })
    }
  },

  login: () => {
    window.location.href = authAPI.getGitHubLoginUrl()
  },

  logout: async () => {
    try {
      await authAPI.logout()
      set({
        user: null,
        isAuthenticated: false,
        error: null
      })
    } catch (error) {
      set({
        error: 'Logout failed. Please try again.'
      })
      throw error
    }
  },

  clearError: () => set({ error: null })
}))
