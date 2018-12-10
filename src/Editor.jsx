import React from 'react'
import AceEditor from 'react-ace'

const Editor = ({
  className,
  name,
  onChange,
  value,
  readOnly,
}) => (
  <AceEditor
    {...{
      className,
      name,
      onChange,
      value,
      readOnly,
    }}
    mode='javascript'
    theme='tomorrow_night'
    width='100%'
    minLines={1}
    maxLines={100}
    fontSize={14}
    showGutter
    highlightActiveLine
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
      useSoftTabs: true,
      printMargin: 20,
    }}
    editorProps={{
      $blockScrolling: Infinity,
    }}
  />
)
export default Editor
