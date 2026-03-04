import ContentBlock from './ContentBlock'

function SectionRenderer({ section, index }) {
  return (
    <section id={section.id} className="mb-16 scroll-mt-32 lg:scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-sm font-mono text-gray-600">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="text-2xl font-bold text-gray-100">{section.title}</h2>
      </div>
      <div className="space-y-1">
        {section.blocks.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </div>
    </section>
  )
}

export default SectionRenderer
