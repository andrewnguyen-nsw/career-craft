import { ClerkProvider } from '@clerk/nextjs'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/app/components/theme/theme-provider'
import { Toaster } from 'react-hot-toast'
import ReactQueryProvider from './providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerCraft | Smart Tools for Smart Job Seekers',
  description:
    "Optimize your job search with CareerCraft's AI-driven tools. Track applications, tailor resumes, prepare for interviews, and get personalized LinkedIn tips—all in one place!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html
          lang='en'
          className='scroll-smooth antialiased'
          suppressHydrationWarning
        >
          <body
            className={`flex min-h-screen flex-col  bg-[#161618] ${inter.className}`}
          >
            <Toaster
              position='top-center'
              toastOptions={{
                style: {
                  padding: '12px'
                }
              }}
            />
            {children}
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  )
}
