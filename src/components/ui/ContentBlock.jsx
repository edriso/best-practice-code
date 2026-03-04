import CodeBlock from './CodeBlock'
import FolderTree from './FolderTree'
import PackageList from './PackageList'
import Tip from './Tip'

function ContentBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <p className="text-text-body leading-relaxed my-3">{block.content}</p>

    case 'code':
      return (
        <CodeBlock
          code={block.code}
          language={block.language}
          fileName={block.fileName}
        />
      )

    case 'folder-tree':
      return <FolderTree tree={block.tree} />

    case 'package-list':
      return <PackageList packages={block.packages} />

    case 'tip':
      return <Tip variant={block.variant} content={block.content} />

    case 'heading':
      return (
        <h3 className="text-lg font-semibold text-text mt-8 mb-3">
          {block.content}
        </h3>
      )

    case 'list':
      return (
        <ul className="list-disc list-inside space-y-1.5 my-3 text-sm text-text-body">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

export default ContentBlock
