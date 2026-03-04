import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Sun, Moon } from 'lucide-react'

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold hover:text-emerald-400 transition-colors"
        >
          <BookOpen size={20} />
          <span className="hidden sm:inline">Best Practice Code</span>
        </Link>

        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-text-sub hover:text-text hover:bg-bg-hover transition-colors cursor-pointer"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
