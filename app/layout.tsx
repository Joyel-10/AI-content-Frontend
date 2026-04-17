import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Content Studio — Generate Blogs with AI',
  description: 'Transform any topic into a professional blog post with the power of Claude AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {children}
      </body>
    </html>
  )
}
