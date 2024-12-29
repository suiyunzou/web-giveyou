'use client'

import { motion } from 'framer-motion'
import { useBookmarks } from '@/contexts/BookmarkContext'

export function AddBookmarkButton() {
  const { setIsAddDialogOpen } = useBookmarks()

  return (
    <motion.button
      onClick={() => setIsAddDialogOpen(true)}
      className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-lg hover:bg-primary/90"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      +
    </motion.button>
  )
}
