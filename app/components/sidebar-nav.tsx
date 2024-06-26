'use client'

import { ChevronFirst, ChevronLast } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useUser } from '@clerk/nextjs'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: () => JSX.Element
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const { user } = useUser()

  return (
    <aside className='sticky top-6 z-50 h-[93vh]'>
      <nav className='flex h-full flex-col gap-6 rounded-2xl bg-white dark:bg-zinc-800'>
        <div
          className={`flex h-16 items-center px-4 ${expanded ? 'justify-between' : 'justify-center'}`}
        >
          <h1
            className={`overflow-hidden text-2xl font-bold transition-all ${expanded ? 'w-40 opacity-100' : 'w-0 opacity-20'}`}
          >
            CareerCraft
          </h1>
          <button onClick={() => setExpanded(curr => !curr)}>
            {expanded ? (
              <ChevronFirst
                size={32}
                className='rounded-lg bg-gray-50 p-1.5 transition-all hover:bg-gray-100 dark:bg-slate-700/40 dark:hover:bg-slate-700/70'
              />
            ) : (
              <ChevronLast
                size={32}
                className='rounded-lg bg-gray-50 p-1.5 transition-all hover:bg-gray-100 dark:bg-slate-700/40 dark:hover:bg-slate-700/70'
              />
            )}
          </button>
        </div>

        <ul className='relative w-full flex-1 space-y-1 px-4'>
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg py-3 pl-3 text-sm font-medium transition-all hover:bg-gray-50 dark:hover:bg-slate-700/30',
                pathname === item.href &&
                  'bg-gray-200 hover:bg-gray-200/90 dark:bg-slate-700/50 dark:hover:bg-slate-700/40'
              )}
            >
              <i>{item.icon()}</i>
              <span
                className={`overflow-hidden text-nowrap transition-all ${expanded ? 'ml-0 w-40 opacity-100' : '-ml-2 h-0 w-2 opacity-20'}`}
              >
                {item.title}
              </span>
              {!expanded && (
                <div className='invisible absolute left-[120%] z-50 w-max -translate-x-3 rounded-lg bg-zinc-200/40 dark:bg-zinc-600/40 px-3 py-2 shadow-md backdrop-blur-md transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100'>
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </ul>

        <div className='flex flex-col items-center justify-center gap-2 border-t py-3'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </nav>
    </aside>
  )
}

