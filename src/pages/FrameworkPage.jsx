import { useParams, Navigate } from 'react-router-dom'
import { useMemo } from 'react'
import frameworks from '../data/frameworks'
import DocLayout from '../components/layout/DocLayout'
import SectionRenderer from '../components/ui/SectionRenderer'

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
    return <Navigate to="/404" replace />
  }

  return (
    <DocLayout sections={data.sections}>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <p className="text-gray-400">{data.description}</p>
      </div>
      {data.sections.map((section, index) => (
        <SectionRenderer key={section.id} section={section} index={index} />
      ))}
    </DocLayout>
  )
}

export default FrameworkPage
