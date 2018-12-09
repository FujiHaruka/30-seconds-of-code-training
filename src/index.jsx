import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'brace/mode/javascript'
import 'brace/theme/tomorrow_night'

const Index = () => (
  <Router>
    <div style={{ width: '100%', height: '100%' }}>
      <Route path='/' exact render={() => <Redirect to={`/snippets/all`} />} />
      <Route path='/snippets/:id' exact component={App} />
    </div>
  </Router>
)

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
