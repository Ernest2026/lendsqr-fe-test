import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('lendsqr_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call - in production, validate credentials against backend
    if (email && password) {
      setIsAuthenticated(true)
      localStorage.setItem('lendsqr_auth', 'true')
      localStorage.setItem('lendsqr_user_email', email)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('lendsqr_auth')
    localStorage.removeItem('lendsqr_user_email')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
