import React from 'react'
import { Header, Button, Dimmer, Loader, Menu, Grid, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import './Playground.css'
import compileTest from './tester/compileTest'
import fetchTest from './fetch/fetchTest'
import doTest from './tester/doTest'
import Editor from './Editor'
import c from 'classnames'

class Playground extends React.Component {
  render () {
    const {
      busy,
      snippet,
      editorText,
      testCode,
      visibleTestCode,
    } = this.state
    if (!snippet) {
      return null
    }
    return (
      <div className='Playground'>
        <Dimmer active={busy} inverted>
          <Loader />
        </Dimmer>

        <Header as='h1'>{snippet.id}</Header>
        <p>
          {snippet.attributes.text.split('\n')[0]}
        </p>
        <Editor
          name='code'
          className='Playground-code'
          onChange={this.onChangeEditor}
          value={editorText}
        />
        <Header as='h2'>Example</Header>
        <Editor
          name='example'
          className='Playground-code'
          value={snippet.attributes.codeBlocks.example}
          readOnly
        />
        <Playground.TestCodeHeader
          onToggleVisible={this.toggleVisibleTestCode}
          active={visibleTestCode}
        />
        <Editor
          name='test'
          className={c('Playground-code', 'Playground-code-test', {
            'Playground-code-hidden': !visibleTestCode,
          })}
          value={testCode}
          readOnly
        />
        <Button
          primary
          onClick={this.submit}
        >
          Submit
        </Button>
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      busy: false,
      snippet: null,
      editorText: '',
      testCode: '',
      visibleTestCode: false,
    }
  }

  componentDidUpdate (prevProps) {
    const { match, snippets } = this.props
    if (prevProps.match !== match || prevProps.snippets !== snippets) {
      this.setState({
        testCode: '',
        snippet: null,
      })
      this.setSnippet()
      this.fetchTestCode()
    }
  }

  setSnippet () {
    const { match, snippets } = this.props
    const snippet = snippets.find(({ id }) => match.params.id === id)
    if (snippet) {
      // TODO: 引数を自動設定
      const initialCode =
`function ${snippet.id} () {
  /* Complete function! */
}`
      this.setState({
        snippet,
        editorText: initialCode,
      })
    }
  }

  async fetchTestCode () {
    await setImmediate(() => Promise.resolve())
    const { snippet } = this.state
    if (!snippet) {
      return
    }
    const testCode = await fetchTest(snippet.id)
    this.setState({ testCode })
  }

  isReady () {
    const { snippet, testCode } = this.state
    return Boolean(snippet && testCode)
  }

  onLoadEditor = () => {}

  onChangeEditor = (editorText) => this.setState({ editorText })

  toggleVisibleTestCode = () => {
    const { visibleTestCode } = this.state
    this.setState({ visibleTestCode: !visibleTestCode })
  }

  submit = async () => {
    const { editorText: code, testCode } = this.state
    let test
    try {
      test = compileTest(code, testCode)
    } catch (err) {
      // Syntax error はここで補足される
      console.error(err)
      return
    }
    this.setState({ busy: true })
    try {
      const result = await doTest(test)
      console.log(result)
    } finally {
      this.setState({ busy: false })
    }
  }

  static TestCodeHeader = ({ onToggleVisible, active }) => (
    <Grid columns='equal'>
      <Grid.Column>
        <Header as='h2'>Test code</Header>
      </Grid.Column>
      <Grid.Column width={2} textAlign='right'>
        <Menu icon='labeled' compact text size='tiny'>
          <Menu.Item
            name='show'
            active={active}
            onClick={onToggleVisible}
            color='green'
          >
            <Icon name='code' />
            Show code
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid>
  )
}

export default withRouter(Playground)
