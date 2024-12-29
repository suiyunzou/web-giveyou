'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export interface Bookmark {
  id: string
  title: string
  description: string
  url: string
  tags: string[]
  category: string
}

const initialBookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'GitHub',
    description: '世界最大的代码托管平台，数百万开发者的家园。在这里你可以找到任何你想要的开源项目。',
    url: 'https://github.com',
    tags: ['开发', '代码', '开源'],
    category: 'development'
  },
  {
    id: '2',
    title: 'Stack Overflow',
    description: '最受欢迎的程序员问答社区，解决你的技术难题，分享你的编程经验。',
    url: 'https://stackoverflow.com',
    tags: ['开发', '问答', '社区'],
    category: 'development'
  },
  {
    id: '3',
    title: 'MDN Web Docs',
    description: 'Mozilla 开发者网络提供的 Web 技术权威文档，最全面的 Web 开发学习资源。',
    url: 'https://developer.mozilla.org',
    tags: ['文档', 'Web开发', '学习'],
    category: 'development'
  },
  {
    id: '4',
    title: 'Dribbble',
    description: '设计师必备的灵感源泉，展示和发现世界顶级的设计作品。',
    url: 'https://dribbble.com',
    tags: ['设计', '创意', '灵感'],
    category: 'design'
  },
  {
    id: '5',
    title: 'Notion',
    description: '一体化的生产力工具，集笔记、任务管理、知识库于一身。',
    url: 'https://notion.so',
    tags: ['效率', '笔记', '协作'],
    category: 'productivity'
  },
  {
    id: '6',
    title: 'Coursera',
    description: '全球顶尖大学的在线课程平台，提供高质量的学习资源。',
    url: 'https://coursera.org',
    tags: ['教育', '课程', '学习'],
    category: 'education'
  }
]

// 初始分类
const initialCategories = [
  { id: 'all', name: '全部' },
  { id: 'development', name: '开发' },
  { id: 'design', name: '设计' },
  { id: 'productivity', name: '效率' },
  { id: 'education', name: '教育' },
  { id: 'entertainment', name: '娱乐' },
  { id: 'news', name: '新闻' },
  { id: 'social', name: '社交' },
  { id: 'email', name: '临时邮箱' }
]

interface Category {
  id: string
  name: string
}

interface BookmarkContextType {
  bookmarks: Bookmark[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  filteredBookmarks: Bookmark[]
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void
  removeBookmark: (id: string) => void
  isAddDialogOpen: boolean
  setIsAddDialogOpen: (open: boolean) => void
  categories: Category[]
  addCategory: (category: Category) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

// 从 localStorage 加载数据
const loadData = () => {
  if (typeof window === 'undefined') {
    return {
      bookmarks: initialBookmarks,
      categories: initialCategories
    }
  }

  const savedBookmarks = localStorage.getItem('bookmarks')
  const savedCategories = localStorage.getItem('categories')

  return {
    bookmarks: savedBookmarks ? JSON.parse(savedBookmarks) : initialBookmarks,
    categories: savedCategories ? JSON.parse(savedCategories) : initialCategories
  }
}

// 保存数据到 localStorage
const saveData = (bookmarks: Bookmark[], categories: Category[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    localStorage.setItem('categories', JSON.stringify(categories))
  }
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // 初始化数据
  useEffect(() => {
    const { bookmarks: loadedBookmarks, categories: loadedCategories } = loadData()
    setBookmarks(loadedBookmarks)
    setCategories(loadedCategories)
  }, [])

  // 保存数据
  useEffect(() => {
    if (bookmarks.length > 0 && categories.length > 0) {
      saveData(bookmarks, categories)
    }
  }, [bookmarks, categories])

  const filteredBookmarks = selectedCategory === 'all'
    ? bookmarks
    : bookmarks.filter(bookmark => bookmark.category === selectedCategory)

  const addBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    const newBookmark = {
      ...bookmark,
      id: Math.random().toString(36).substr(2, 9)
    }
    setBookmarks(prev => [...prev, newBookmark])
    
    // 如果是新分类，自动添加到分类列表
    if (!categories.some(cat => cat.id === bookmark.category)) {
      addCategory({
        id: bookmark.category,
        name: bookmark.category // 使用分类ID作为显示名称，你可以根据需要修改
      })
    }
  }

  const addCategory = (category: Category) => {
    if (!categories.some(cat => cat.id === category.id)) {
      setCategories(prev => [...prev, category])
    }
  }

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        selectedCategory,
        setSelectedCategory,
        filteredBookmarks,
        addBookmark,
        removeBookmark,
        isAddDialogOpen,
        setIsAddDialogOpen,
        categories,
        addCategory,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
