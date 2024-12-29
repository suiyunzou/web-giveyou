import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Bookmark {
  id: string
  title: string
  description: string
  url: string
  tags: string[]
  category: string
}

interface BookmarkState {
  bookmarks: Bookmark[]
  selectedCategory: string
}

interface BookmarkActions {
  setSelectedCategory: (category: string) => void
}

type BookmarkStore = BookmarkState & BookmarkActions

// 示例数据
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

export const useBookmarkStore = create<BookmarkStore>()(
  devtools(
    (set) => ({
      bookmarks: initialBookmarks,
      selectedCategory: 'all',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    { name: 'bookmark-store' }
  )
)

// Selectors
export const useFilteredBookmarks = () =>
  useBookmarkStore((state) => 
    state.selectedCategory === 'all'
      ? state.bookmarks
      : state.bookmarks.filter((bookmark) => bookmark.category === state.selectedCategory)
  )

export const useSelectedCategory = () =>
  useBookmarkStore((state) => state.selectedCategory)
