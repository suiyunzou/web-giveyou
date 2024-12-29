'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useBookmarks } from '@/contexts/BookmarkContext'
import { useAuth } from '@/contexts/AuthContext'

export function AddBookmarkButton() {
  const { setIsAddDialogOpen } = useBookmarks()
  const { user } = useAuth()

  if (!user?.isAdmin) return null

  return (
    <motion.button
      onClick={() => setIsAddDialogOpen(true)}
      className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Plus className="h-6 w-6" />
    </motion.button>
  )
}
