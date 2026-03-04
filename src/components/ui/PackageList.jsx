import { Package } from 'lucide-react'

function PackageList({ packages }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 my-4">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="rounded-lg border border-border bg-bg-alt/50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-blue-500/10 p-2 text-blue-400 shrink-0">
              <Package size={16} />
            </div>
            <div className="min-w-0">
              <h4 className="font-mono text-sm font-medium text-text">
                {pkg.url ? (
                  <a
                    href={pkg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {pkg.name}
                  </a>
                ) : (
                  pkg.name
                )}
              </h4>
              <p className="text-xs text-text-sub mt-1">{pkg.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PackageList
