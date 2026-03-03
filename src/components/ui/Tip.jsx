import { Lightbulb, AlertTriangle, Info } from 'lucide-react'

const variants = {
  tip: {
    icon: Lightbulb,
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/5',
    iconColor: 'text-emerald-400',
    label: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/5',
    iconColor: 'text-amber-400',
    label: 'Warning',
  },
  note: {
    icon: Info,
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/5',
    iconColor: 'text-blue-400',
    label: 'Note',
  },
}

function Tip({ variant = 'tip', content }) {
  const v = variants[variant] || variants.tip
  const Icon = v.icon

  return (
    <div className={`my-4 rounded-lg border-l-4 ${v.border} ${v.bg} p-4`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={`${v.iconColor} shrink-0 mt-0.5`} />
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${v.iconColor} mb-1`}>
            {v.label}
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default Tip
