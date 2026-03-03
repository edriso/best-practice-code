import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import frameworks from '../data/frameworks'
import DocLayout from '../components/layout/DocLayout'
import SectionRenderer from '../components/ui/SectionRenderer'
import NotFoundPage from './NotFoundPage'

const dataModules = import.meta.glob('../data/*.js', { eager: true })

function getFrameworkData(id) {
  const key = `../data/${id}.js`
  return dataModules[key]?.default
}

function FrameworkPage() {
  const { frameworkId } = useParams()
  const framework = frameworks.find((fw) => fw.id === frameworkId)
  const data = useMemo(() => getFrameworkData(frameworkId), [frameworkId])

  if (!framework || !data) {
    return <NotFoundPage />
  }

  const Icon = framework.icon

  return (
    <DocLayout sections={data.sections}>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Icon size={28} className="text-gray-400" />
          <h1 className="text-3xl font-bold">{data.name}</h1>
        </div>
        <p className="text-gray-400">{data.description}</p>
        <p className="text-sm text-gray-600 mt-1">{data.sections.length} sections</p>
      </div>
      {data.sections.map((section, index) => (
        <SectionRenderer key={section.id} section={section} index={index} />
      ))}
    </DocLayout>
  )
}

export default FrameworkPage
