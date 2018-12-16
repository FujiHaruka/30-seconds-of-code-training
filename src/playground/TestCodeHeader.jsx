import React from 'react'
import { Grid, Menu, Header, Icon } from 'semantic-ui-react'

const TestCodeHeader = ({ onToggleVisible, active }) => (
  <Grid columns='equal' className='Playground-test-code-header'>
    <Grid.Column>
      <Header as='h2'>Test code</Header>
    </Grid.Column>
    <Grid.Column width={2} textAlign='right' className='Playground-header-menu'>
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

export default TestCodeHeader
