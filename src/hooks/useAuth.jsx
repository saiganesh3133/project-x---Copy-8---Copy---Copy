import { createContext, useContext, useState, useEffect } from 'react'
import { auth as authApi } from '../api'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        console.error('Invalid token:', error)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const response = await authApi.login(credentials)
    const { access, refresh, user } = response.data
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    setUser(user)
    return user
  }

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData)
      if (response.data) {
        const { access, refresh, user } = response.data
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        setUser(user)
        return user
      }
      throw new Error('Invalid response from server')
    } catch (error) {
      console.error('Registration error in useAuth:', error)
      throw error
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 