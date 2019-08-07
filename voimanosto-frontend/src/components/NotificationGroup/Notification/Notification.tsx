import React, { useState } from 'react'
import { Transition, Icon } from 'semantic-ui-react'

interface NotificationProps {
  message: string
  iconName: string
}

const Notification: React.FC<NotificationProps> = ({ message, iconName }) => {
  const [open, setOpen] = useState(true)
  return (
    <Transition
      visible={open}
      animation='zoom'
      duration={500}
      unmountOnHide={true}
      transitionOnMount={true}
    >
      <div className='toast-box compact visible'>
        <div className='icon info ui toast blue'>
          <Icon onClick={() => setOpen(false)} name='close' />
          {iconName === 'trophy' ? (
            <Icon name='trophy' />
          ) : iconName === 'info' ? (
            <Icon name='info' />
          ) : (
            <div />
          )}
          <div className='content'>
            <div>{message}</div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Notification
