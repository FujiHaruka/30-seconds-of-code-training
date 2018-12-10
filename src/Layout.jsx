import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import './Layout.css'

const Layout = ({ side: Side, main: Main, state }) => (
  <Grid className='Layout'>
    <Grid.Column
      className='Layout-side'
      as={Menu}
      inverted
      vertical
      width={4}
    >
      <Side {...state} />
    </Grid.Column>
    <Grid.Column
      stretched
      width={12}
      className='Layout-main'
    >
      <Main {...state} />
    </Grid.Column>
  </Grid>
)

export default Layout
