import React from 'react'
import { Grid, Icon, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const Tools: React.FC = () => {
  return (
    <div>
      <Grid doubling columns={3}>
        <Grid.Column as={NavLink} to='/tools/bodyweight'>
          <Icon size='huge' inverted name='weight' />
          <Header inverted as='h3'>
            Bodyweight
          </Header>
        </Grid.Column>
        <Grid.Column as={NavLink} to='/tools/prs'>
          <Icon size='huge' inverted name='table' />
          <Header inverted as='h3'>
            PR table
          </Header>
        </Grid.Column>

        <Grid.Column as={NavLink} to='/tools/volume'>
          <Icon size='huge' inverted name='chart bar' />
          <Header inverted as='h3'>
            Volume
          </Header>
        </Grid.Column>
        <Grid.Column as={NavLink} to='/tools/intensity'>
          <Icon size='huge' inverted name='pie chart' />
          <Header inverted as='h3'>
            Intensity
          </Header>
        </Grid.Column>

        <Grid.Column as={NavLink} to='/tools/competitions'>
          <Icon size='huge' inverted name='trophy' />
          <Header inverted as='h3'>
            Competitions
          </Header>
        </Grid.Column>
        <Grid.Column as={NavLink} to='/tools/pointsCalculator'>
          <Icon size='huge' inverted name='calculator' />
          <Header inverted as='h3'>
            IPF points
          </Header>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Tools
