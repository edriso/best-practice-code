import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

function DocLayout({ sections, children }) {
  return (
    <>
      <MobileNav sections={sections} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:flex lg:gap-10">
        <Sidebar sections={sections} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  )
}

export default DocLayout
