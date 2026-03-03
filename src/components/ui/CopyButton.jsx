import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700/50 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <Check size={14} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}

export default CopyButton
