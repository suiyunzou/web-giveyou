'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  username: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 模拟用户数据库
const USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // 在实际应用中应该使用加密密码
    isAdmin: true
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    isAdmin: false
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // 在组件挂载时检查本地存储中的用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    const foundUser = USERS.find(u => u.username === username && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
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
