import React from 'react'
import { Menu } from 'semantic-ui-react'
import { uniq } from 'ramda'
import { NavLink, withRouter } from 'react-router-dom'

class Sideber extends React.PureComponent {
  render () {
    const { menus } = this.state
    return menus.map(([title, snippets]) => (
      <Menu.Item key={title}>
        {title}
        <Menu.Menu>
          {
            snippets.map((snippet) =>
              <Menu.Item
                key={snippet.id}
                as={NavLink}
                to={`/snippets/${snippet.id}`}
              >
                {snippet.id}
              </Menu.Item>
            )
          }
        </Menu.Menu>
      </Menu.Item>
    ))
  }

  constructor (props) {
    super(props)
    this.state = { menus: [] }
  }

  componentDidUpdate (prevProps) {
    const { snippets } = this.props
    if (snippets !== prevProps.snippets) {
      // category is the top tag
      let categories = snippets
        .map((s) => s.attributes.tags[0])
        .filter(Boolean)
      categories = uniq(categories).sort()

      let menus = categories.reduce((obj, name) => Object.assign(obj, { [name]: [] }), {})
      snippets.forEach((snippet) => {
        const category = snippet.attributes.tags[0]
        menus[category].push(snippet)
      })
      menus = Object.entries(menus)

      this.setState({ menus })
    }
  }
}

// PureComponent に match を渡して URL 更新時に update させる
export default withRouter(Sideber)
