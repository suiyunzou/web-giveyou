import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { BookmarkProvider } from '@/contexts/BookmarkContext'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '网站收藏',
  description: '在这里收藏和分享你喜欢的网站，发现更多优质内容'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <AuthProvider>
          <BookmarkProvider>{children}</BookmarkProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
