'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useBookmarks } from '@/contexts/BookmarkContext'
import { Bookmark } from '@/contexts/BookmarkContext'
import { ExternalLink } from 'lucide-react'

interface BookmarkCardProps {
  bookmark: Bookmark
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { user } = useAuth()
  const { removeBookmark } = useBookmarks()

  const handleDelete = () => {
    if (window.confirm('确定要删除这个书签吗？')) {
      removeBookmark(bookmark.id)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      {user?.isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute right-2 top-2 hidden rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 group-hover:block dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
          {bookmark.description}
        </p>
      </div>

      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center text-sm text-primary hover:text-primary/90"
      >
        <span className="line-clamp-1 mr-1">{bookmark.url}</span>
        <ExternalLink className="h-4 w-4" />
      </a>

      <div className="flex flex-wrap gap-2">
        {bookmark.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
