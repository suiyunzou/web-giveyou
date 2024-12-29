'use client'

import { Navbar } from '@/components/Navbar'
import { CategoryNav } from '@/components/CategoryNav'
import { BookmarkCard } from '@/components/BookmarkCard'
import { AddBookmarkButton } from '@/components/AddBookmarkButton'
import { AddBookmarkDialog } from '@/components/AddBookmarkDialog'
import { useBookmarks } from '@/contexts/BookmarkContext'

export default function Home() {
  const { filteredBookmarks } = useBookmarks()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          发现精彩网站
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          在这里收藏和分享你喜欢的网站，发现更多优质内容
        </p>

        <CategoryNav />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map(bookmark => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
            />
          ))}
        </div>
      </main>

      <AddBookmarkButton />
      <AddBookmarkDialog />
    </div>
  )
}
