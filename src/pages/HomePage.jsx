import { Link } from 'react-router-dom'
import { Code } from 'lucide-react'
import frameworks from '../data/frameworks'

const dataModules = import.meta.glob('../data/*.js', { eager: true })

function getSectionCount(id) {
  const key = `../data/${id}.js`
  return dataModules[key]?.default?.sections?.length || 0
}

const colorMap = {
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
    hoverText: 'group-hover:text-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400',
  },
  cyan: {
    iconBg: 'bg-cyan-500/10',
    iconText: 'text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
    hoverText: 'group-hover:text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400',
  },
  violet: {
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-400',
    hoverBorder: 'hover:border-violet-500/50',
    hoverText: 'group-hover:text-violet-400',
    badge: 'bg-violet-500/10 text-violet-400',
  },
  yellow: {
    iconBg: 'bg-yellow-500/10',
    iconText: 'text-yellow-400',
    hoverBorder: 'hover:border-yellow-500/50',
    hoverText: 'group-hover:text-yellow-400',
    badge: 'bg-yellow-500/10 text-yellow-400',
  },
  pink: {
    iconBg: 'bg-pink-500/10',
    iconText: 'text-pink-400',
    hoverBorder: 'hover:border-pink-500/50',
    hoverText: 'group-hover:text-pink-400',
    badge: 'bg-pink-500/10 text-pink-400',
  },
  orange: {
    iconBg: 'bg-orange-500/10',
    iconText: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/50',
    hoverText: 'group-hover:text-orange-400',
    badge: 'bg-orange-500/10 text-orange-400',
  },
  teal: {
    iconBg: 'bg-teal-500/10',
    iconText: 'text-teal-400',
    hoverBorder: 'hover:border-teal-500/50',
    hoverText: 'group-hover:text-teal-400',
    badge: 'bg-teal-500/10 text-teal-400',
  },
}

function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex rounded-full bg-emerald-500/10 p-4 mb-6">
          <Code size={32} className="text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Best Practice Code</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A personal reference for best practices, folder structures, conventions,
          packages, and code patterns for web frameworks.
        </p>
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Frameworks
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw) => {
          const Icon = fw.icon
          const colors = colorMap[fw.color] || colorMap.emerald
          const sectionCount = getSectionCount(fw.id)

          return (
            <Link
              key={fw.id}
              to={`/${fw.id}`}
              className={`group block rounded-xl border border-gray-800 bg-gray-900 p-6 transition ${colors.hoverBorder} hover:bg-gray-900/80`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex rounded-lg ${colors.iconBg} p-3 ${colors.iconText}`}>
                  <Icon size={24} />
                </div>
                {sectionCount > 0 && (
                  <span className={`rounded-full ${colors.badge} px-2.5 py-0.5 text-xs font-medium`}>
                    {sectionCount} sections
                  </span>
                )}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${colors.hoverText} transition-colors`}>
                {fw.name}
              </h3>
              <p className="text-sm text-gray-400">{fw.description}</p>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

export default HomePage
