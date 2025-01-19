'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Cloud, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">WeatherHub</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#current" className="text-sm font-medium hover:text-primary transition-colors">Current Weather</a>
          <a href="#forecast" className="text-sm font-medium hover:text-primary transition-colors">Forecast</a>
          <a href="#details" className="text-sm font-medium hover:text-primary transition-colors">Details</a>
          <a href="#map" className="text-sm font-medium hover:text-primary transition-colors">Map</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <a href="#current" className="flex w-full">Current Weather</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#forecast" className="flex w-full">Forecast</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#details" className="flex w-full">Details</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#map" className="flex w-full">Map</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

