import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import './Layout.css'
import About from './About'

const Layout = ({ side: Side, main: Main, state }) => (
  <Grid className='Layout'>
    <Grid.Column
      className='Layout-side'
      width={4}
    >
      <Grid.Row
        className='Layout-side-upper'
        as={Menu}
        inverted
        vertical
        stretched
      >
        <Side {...state} />
      </Grid.Row>
      <Grid.Row
        as={About}
      />
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
