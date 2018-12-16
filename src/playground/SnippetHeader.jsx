import React from 'react'
import { Header, Label, Grid, Menu, Icon } from 'semantic-ui-react'

const SnippetHeader = ({
  snippet,
  solved,
  hintActive,
  onToggleHint,
}) => (
  <Grid columns='equal' className='Playground-test-code-header'>
    <Grid.Column>
      <Header as='h1'>
        {snippet.id}
        {
          solved &&
          <Label color='red' tag className='Playground-solved'>
            Solved
          </Label>
        }
      </Header>
    </Grid.Column>
    <Grid.Column width={4} textAlign='right' className='Playground-header-menu'>
      <Menu icon='labeled' compact text size='tiny'>
        <Menu.Item
          name='hint'
          active={hintActive}
          onClick={onToggleHint}
          color='green'
        >
          <Icon name='question circle outline' />
          Show hint
        </Menu.Item>
        <Menu.Item
          name='answer'
          active={false}
          link
          as='a'
          href={`https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/${snippet.id}.md`}
          target='_blank'
        >
          <Icon name='external alternate' />
          Source
        </Menu.Item>
      </Menu>
    </Grid.Column>
  </Grid>
)

export default SnippetHeader
