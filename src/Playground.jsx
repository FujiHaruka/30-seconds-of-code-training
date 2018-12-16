import React from 'react'
import { Header, Button, Dimmer, Loader } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import './Playground.css'
import compileTest from './tester/compileTest'
import fetchTest from './fetch/fetchTest'
import doTest from './tester/doTest'
import Editor from './Editor'
import c from 'classnames'
import { formatTestResult } from './helpers'
import store from 'store'
import TestCodeHeader from './playground/TestCodeHeader'
import ShareModal from './playground/ShareModal'
import SnippetHeader from './playground/SnippetHeader'

class Playground extends React.Component {
  render () {
    const {
      ready,
      busyResult,
      snippet,
      editorText,
      testCode,
      visibleTestCode,
      visibleHint,
      resultText,
      succeeded,
      shareActive,
    } = this.state
    if (!snippet) {
      return null
    }
    return (
      <div className='Playground' ref={this.ref} id='Playground'>
        <Header as='h1' color='grey' size='small'>30-seconds-of-code Training</Header>

        <SnippetHeader
          snippet={snippet}
          solved={succeeded}
          onToggleHint={this.toggleHintVisible}
          hintActive={visibleHint}
        />
        <p>
          {snippet.attributes.text.split('\n')[0]}
        </p>
        {
          visibleHint &&
          <p>{snippet.attributes.text.split('\n').filter(Boolean)[1]}</p>
        }
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
        <TestCodeHeader
          onToggleVisible={this.toggleVisibleTestCode}
          active={visibleTestCode}
        />
        <Editor
          name='test'
          className={c('Playground-code', {
            'Playground-code-hidden': !visibleTestCode,
            'Playground-code-test': ready,
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

        {
          resultText &&
          <pre className='Playground-result'>
            <Dimmer active={busyResult} inverted>
              <Loader />
            </Dimmer>
            <code dangerouslySetInnerHTML={{ __html: resultText }} />
          </pre>
        }

        <ShareModal
          open={shareActive}
          onClose={this.closeShare}
          snippet={snippet}
        />
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      busyResult: false,
      snippet: null,
      editorText: '',
      testCode: '',
      visibleTestCode: false,
      visibleHint: false,
      resultText: '',
      succeeded: false,
      shareActive: false,
    }
    this.ref = React.createRef()
  }

  componentDidUpdate (prevProps) {
    const { match, snippets } = this.props
    if (prevProps.match !== match || prevProps.snippets !== snippets) {
      this.setState({
        testCode: '',
        snippet: null,
        resultText: '',
        ready: false,
        visibleTestCode: false,
        succeeded: false,
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
`\nconst ${snippet.id} = /* Complete code */\n`
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
    const succeeded = store.get(snippet.id)
    this.setState({
      testCode,
      ready: true,
      succeeded,
    })
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

  toggleHintVisible = () => {
    const { visibleHint } = this.state
    this.setState({ visibleHint: !visibleHint })
  }

  submit = async () => {
    const { editorText: code, testCode, snippet } = this.state
    let test
    try {
      test = compileTest(code, testCode)
    } catch (err) {
      // Syntax error はここで補足される
      console.error(err)
      this.showResult('SyntaxError: ' + err.message)
      return
    }
    const results = await doTest(test)
    const succeeded = results.every(({ ok }) => ok)
    if (succeeded) {
      store.set(snippet.id, true)
      this.props.onSolved()
      setTimeout(() => {
        this.setState({ shareActive: true })
      }, 500)
    }
    this.showResult(formatTestResult(results), true)
  }

  scrollToBottom = () => {
    const self = this.ref.current
    setTimeout(() => {
      self.scrollTop = self.scrollHeight
    }, 20)
  }

  closeShare = () => {
    this.setState({ shareActive: false })
  }

  showResult = (resultText, succeeded = false) => {
    // 表示する前に少しロードアニメーション
    this.setState({
      busyResult: true,
    })
    setTimeout(() => {
      this.setState({
        busyResult: false,
        resultText,
      })
      if (succeeded) {
        this.setState({ succeeded })
      }
      this.scrollToBottom()
    }, 300)
  }
}

export default withRouter(Playground)
