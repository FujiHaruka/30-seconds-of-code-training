import React from 'react'
import { Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import './Playground.css'
import AceEditor from 'react-ace'

class Playground extends React.Component {
  render () {
    const {
      snippet,
      editorText,
    } = this.state
    if (!snippet) {
      return null
    }
    return (
      <div className='Playground'>
        <Header as='h2'>{snippet.id}</Header>
        <p>
          {snippet.attributes.text.split('\n')[0]}
        </p>
        <AceEditor
           mode='javascript'
           theme='tomorrow_night'
           name='code-editor'
           width='95%'
           minLines={1}
           maxLines={100}
           onLoad={this.onLoadEditor}
           onChange={this.onChangeEditor}
           fontSize={14}
           showGutter
           highlightActiveLine
           value={editorText}
           setOptions={{
            enableBasicAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
           }}
        />
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      snippet: null,
      editorText: '',
    }
  }

  componentDidMount () {
    this.setSnippet()
  }

  componentDidUpdate (prevProps) {
    const { match, snippets } = this.props
    if (prevProps.match !== match || prevProps.snippets !== snippets) {
      this.setSnippet()
    }
  }

  setSnippet () {
    const { match, snippets } = this.props
    const snippet = snippets.find(({ id }) => match.params.id === id)
    if (snippet) {
      this.setState({ snippet })
    }
  }

  onLoadEditor = () => {}

  onChangeEditor = (editorText) => this.setState({ editorText })
}

export default withRouter(Playground)
