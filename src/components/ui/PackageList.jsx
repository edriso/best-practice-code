import { useState } from 'react'
import { Package, Terminal, Check } from 'lucide-react'

function InstallButton({ name }) {
  const [copied, setCopied] = useState(false)
  const cmd = `npm i ${name}`

  const handleCopy = async (e) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 rounded bg-bg-hover/80 px-2 py-0.5 text-[11px] font-mono text-text-muted hover:text-text-sub hover:bg-bg-hover transition-colors cursor-pointer"
      title={`Copy: ${cmd}`}
    >
      {copied ? <Check size={11} /> : <Terminal size={11} />}
      {copied ? 'Copied!' : cmd}
    </button>
  )
}

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
            <div className="min-w-0 flex-1">
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
              <div className="mt-2">
                <InstallButton name={pkg.name} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PackageList
