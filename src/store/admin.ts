import { create } from 'zustand'

interface AdminAuth {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAdminAuth = create<AdminAuth>((set) => ({
  isAuthenticated: localStorage.getItem('nargis_admin') === 'true',
  login: (username, password) => {
    if (username === 'nargis' && password === 'nargisstore123') {
      localStorage.setItem('nargis_admin', 'true')
      set({ isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => {
    localStorage.removeItem('nargis_admin')
    set({ isAuthenticated: false })
  },
}))
