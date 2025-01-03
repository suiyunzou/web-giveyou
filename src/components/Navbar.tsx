'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginDialog } from './LoginDialog'
import { Menu, Search, Sun, Moon, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const { user, logout } = useAuth()
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Web GiveYou
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden flex-1 items-center justify-center px-16 md:flex">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="搜索网站..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user.isAdmin ? '管理员' : '用户'}: {user.username}
                </span>
                <button
                  onClick={logout}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  退出
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginDialogOpen(true)}
                className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
              >
                登录
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden"
        >
          <div className="container mx-auto space-y-2 px-4 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索网站..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user.isAdmin ? '管理员' : '用户'}: {user.username}
                </span>
                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  退出
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginDialogOpen(true)}
                className="flex w-full items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                登录
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{isDark ? '切换到亮色模式' : '切换到暗色模式'}</span>
            </button>
          </div>
        </motion.div>
      )}

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </nav>
  )
}
