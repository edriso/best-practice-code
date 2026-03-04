import { ChevronDown } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection'

function MobileNav({ sections }) {
  const sectionIds = sections.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  const handleChange = (e) => {
    const el = document.getElementById(e.target.value)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-16 z-40 lg:hidden border-b border-border bg-bg/90 backdrop-blur px-4 py-2">
      <div className="relative">
        <select
          value={activeId || sectionIds[0]}
          onChange={handleChange}
          className="w-full appearance-none rounded-md bg-bg-alt border border-border-sub text-sm text-text pl-3 pr-9 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
        >
          {sections.map((section, index) => (
            <option key={section.id} value={section.id}>
              {String(index + 1).padStart(2, '0')} — {section.title}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub pointer-events-none"
        />
      </div>
    </div>
  )
}

export default MobileNav
