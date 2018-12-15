import React from 'react'
import AceEditor from 'react-ace'

const Editor = ({
  className,
  name,
  onChange,
  value,
  readOnly,
  showGutter = true,
  mode = 'javascript',
  theme = 'tomorrow_night',
}) => (
  <AceEditor
    {...{
      className,
      name,
      onChange,
      value,
      readOnly,
      showGutter,
      mode,
      theme,
    }}
    width='100%'
    minLines={1}
    maxLines={100}
    fontSize={14}
    highlightActiveLine={!readOnly}
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
      useSoftTabs: true,
      printMargin: 20,
      useWorker: false,
    }}
    editorProps={{
      $blockScrolling: Infinity,
    }}
  />
)
export default Editor
