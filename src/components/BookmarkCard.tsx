'use client'

import { motion } from 'framer-motion'
import { Bookmark, Share2, ExternalLink } from 'lucide-react'

interface BookmarkCardProps {
  title: string
  description: string
  url: string
  tags: string[]
}

export function BookmarkCard({ title, description, url, tags }: BookmarkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-lg transition-all hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
    >
      <div className="absolute right-4 top-4 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Bookmark className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="line-clamp-2 text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center text-primary-light hover:text-primary dark:text-primary-light dark:hover:text-primary"
      >
        <span className="line-clamp-1 mr-1">{url}</span>
        <ExternalLink className="h-4 w-4" />
      </a>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.span
            key={tag}
            whileHover={{ scale: 1.05 }}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
