import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import Menu from './Menu'
import Playground from './Playground'
import fetchSnippets from './fetch/fetchSnippets'
import store from 'store'

class App extends Component {
  render () {
    return (
      <Layout
        side={Menu}
        main={Playground}
        state={this.state}
      />
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      snippets: [],
      solvedIds: {},
      onSolved: this.onSolved,
    }
  }

  async componentDidMount () {
    const snippets = await fetchSnippets()
    this.setState({ snippets })
    this.loadSolvedIds()
  }

  onSolved = () => {
    this.loadSolvedIds()
  }

  loadSolvedIds () {
    const { snippets } = this.state
    const solvedIds = snippets.filter((snippet) =>
      Boolean(store.get(snippet.id))
    ).reduce((obj, snippet) => Object.assign(obj, { [snippet.id]: true }), {})
    this.setState({ solvedIds })
  }
}

export default App
