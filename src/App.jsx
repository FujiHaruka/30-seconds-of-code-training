import React, { Component } from 'react'
import './App.css'
import Layout from './Layout'
import Menu from './Menu'
import Playground from './Playground'
import fetchSnippets from './fetch/fetchSnippets'

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
    }
  }

  async componentDidMount () {
    const snippets = await fetchSnippets()
    this.setState({ snippets })
  }
}

export default App
