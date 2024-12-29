'use client'

import { BookmarkCard } from '@/components/BookmarkCard'
import { Navbar } from '@/components/Navbar'
import { CategoryNav } from '@/components/CategoryNav'
import { AddBookmarkDialog } from '@/components/AddBookmarkDialog'
import { AddBookmarkButton } from '@/components/AddBookmarkButton'
import { BookmarkProvider, useBookmarks } from '@/contexts/BookmarkContext'

function BookmarkList() {
  const { filteredBookmarks } = useBookmarks()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredBookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          title={bookmark.title}
          description={bookmark.description}
          url={bookmark.url}
          tags={bookmark.tags}
        />
      ))}
    </div>
  )
}

function HomeContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            发现精彩网站
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            在这里收藏和分享你喜欢的网站，发现更多优质内容
          </p>
        </div>
        
        <CategoryNav />
        <BookmarkList />
        <AddBookmarkButton />
        <AddBookmarkDialog />
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <BookmarkProvider>
      <HomeContent />
    </BookmarkProvider>
  )
}
