import { Link } from 'react-router-dom'
import { Code } from 'lucide-react'
import frameworks from '../data/frameworks'

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
          return (
            <Link
              key={fw.id}
              to={`/${fw.id}`}
              className="group block rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-emerald-500/50 hover:bg-gray-900/80"
            >
              <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
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
