import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import Sidebar from './Sidebar'

class App extends Component {
  render () {
    return (
      <Layout
        side={Sidebar}
        main={() => <div>main</div>}
        state={this.state}
      />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      snippets: [],
    }
  }

  async componentDidMount () {
    const resp = await window.fetch('/snippets.json')
    let snippets = await resp.json()
    snippets = snippets.data.filter(({ type, meta }) => type === 'snippet' && !meta.archived)
    this.setState({ snippets })
  }
}

export default App
