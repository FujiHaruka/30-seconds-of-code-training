import React from 'react'
import { Sidebar, Menu } from 'semantic-ui-react'

const Layout = ({ side: Side, main: Main, state }) => (
  <Sidebar.Pushable>
    <Sidebar
    as={Menu}
    visible
    inverted
    vertical
    >
      <Side {...state} />
    </Sidebar>
    <Sidebar.Pusher>
      <Main {...state} />
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default Layout
