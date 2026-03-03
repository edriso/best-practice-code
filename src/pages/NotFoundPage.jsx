import { Link } from 'react-router-dom'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex rounded-full bg-gray-800 p-5 mb-8">
          <FileQuestion size={48} className="text-gray-500" />
        </div>

        <h1 className="text-7xl font-bold text-gray-700 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-300 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium hover:bg-emerald-500 transition-colors"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
