import React from 'react'
import './SideBar.scss'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import SettingsLottie from '../../animations/SettingsLottie'

interface SideBarProps {
  loggedIn?: boolean
  isMobile: boolean
}

const SideBar: React.FC<SideBarProps> = ({ loggedIn, isMobile }) => {
  return (
    <Menu
      borderless
      vertical={isMobile ? false : true}
      stackable={isMobile ? false : true}
      fixed={isMobile ? 'bottom' : 'left'}
      className={isMobile ? 'side-bar mobile' : 'side-bar'}
      icon='labeled'
    >
      <Menu.Item
        className='white-item'
        disabled={!loggedIn}
        as={NavLink}
        to='/profile'
      >
        <Icon className='white-icon' name='user' />
        <p className='white-font'>My profile</p>
      </Menu.Item>
      <Menu.Item disabled={!loggedIn} as={NavLink} to='/calendar'>
        <Icon name='calendar alternate' />
        My workouts
      </Menu.Item>
      <Menu.Item disabled={!loggedIn} as={NavLink} to='/calculator'>
        <Icon name='calculator' />
        IPF points calcualtor
      </Menu.Item>
      <Menu.Item disabled={!loggedIn} as={NavLink} to='/settings'>
        {/* <Icon name='settings' /> */}
        <SettingsLottie />
        Settings
      </Menu.Item>
    </Menu>
  )
}

export default SideBar
