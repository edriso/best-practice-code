import { useState } from 'react'
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react'

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2)
  const isFolder = node.children && node.children.length > 0
  const paddingLeft = depth * 20

  if (isFolder) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 w-full text-left py-1 px-2 rounded hover:bg-gray-800/50 transition-colors text-sm"
          style={{ paddingLeft }}
        >
          {open ? (
            <ChevronDown size={14} className="text-gray-500 shrink-0" />
          ) : (
            <ChevronRight size={14} className="text-gray-500 shrink-0" />
          )}
          {open ? (
            <FolderOpen size={16} className="text-amber-400 shrink-0" />
          ) : (
            <Folder size={16} className="text-amber-400 shrink-0" />
          )}
          <span className="text-gray-200">{node.name}</span>
          {node.comment && (
            <span className="text-gray-600 text-xs ml-2">{'// ' + node.comment}</span>
          )}
        </button>
        {open && (
          <div>
            {node.children.map((child, i) => (
              <TreeNode key={child.name + i} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-1.5 py-1 px-2 text-sm"
      style={{ paddingLeft: paddingLeft + 18 }}
    >
      <FileText size={16} className="text-gray-500 shrink-0" />
      <span className="text-gray-300">{node.name}</span>
      {node.comment && (
        <span className="text-gray-600 text-xs ml-2">{'// ' + node.comment}</span>
      )}
    </div>
  )
}

function FolderTree({ tree }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 my-4 font-mono">
      <TreeNode node={tree} />
    </div>
  )
}

export default FolderTree
