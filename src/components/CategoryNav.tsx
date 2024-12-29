'use client'

import { motion } from 'framer-motion'
import { useBookmarks } from '@/contexts/BookmarkContext'

export function CategoryNav() {
  const { selectedCategory, setSelectedCategory, categories } = useBookmarks()

  return (
    <div className="mb-8 overflow-x-auto">
      <motion.div 
        className="flex space-x-2 px-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
