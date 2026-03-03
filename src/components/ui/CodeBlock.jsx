import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyButton from './CopyButton'

function CodeBlock({ code, language = 'javascript', fileName }) {
  return (
    <div className="rounded-lg border border-[#3e4451] overflow-hidden my-4">
      {fileName && (
        <div className="flex items-center justify-between bg-[#21252b] px-4 py-2 border-b border-[#3e4451]">
          <span className="text-xs text-[#abb2bf] font-mono">{fileName}</span>
          <CopyButton text={code} />
        </div>
      )}
      {!fileName && (
        <div className="flex justify-end bg-[#21252b] px-4 py-1.5 border-b border-[#3e4451]">
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
          background: '#282c34',
          fontSize: '0.8125rem',
        }}
        lineNumberStyle={{ color: '#636d83', minWidth: '2.5em' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
