import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from './CopyButton'

function CodeBlock({ code, language = 'javascript', fileName }) {
  return (
    <div className="rounded-lg border border-gray-800 overflow-hidden my-4">
      {fileName && (
        <div className="flex items-center justify-between bg-gray-800/60 px-4 py-2 border-b border-gray-800">
          <span className="text-xs text-gray-400 font-mono">{fileName}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!fileName && (
        <div className="flex justify-end bg-gray-800/60 px-4 py-1.5 border-b border-gray-800">
          <CopyButton text={code} />
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.8125rem',
        }}
        lineNumberStyle={{ color: '#4b5563', minWidth: '2.5em' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
