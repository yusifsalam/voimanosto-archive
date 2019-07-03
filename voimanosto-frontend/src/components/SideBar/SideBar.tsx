import React from 'react'
import './SideBar.scss'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const SideBar: React.FC = () => {
  return (
    <Menu
      borderless
      vertical
      stackable
      fixed='left'
      className='side-bar'
      icon='labeled'
    >
      <Menu.Item as={NavLink} to='/profile'>
        <Icon name='user' />
        My profile
      </Menu.Item>
      <Menu.Item as={NavLink} to='/calendar'>
        <Icon name='calendar alternate' />
        My workouts
      </Menu.Item>
      <Menu.Item as={NavLink} to='/calculator'>
        <Icon name='calculator' />
        IPF points calcualtor
      </Menu.Item>
      <Menu.Item as={NavLink} to='/settings'>
        <Icon name='settings' />
        Settings
      </Menu.Item>
    </Menu>
  )
}

export default SideBar
