import React, { useState, useEffect } from 'react'
import Notification from '../Notification'

interface Notification {
  message: string
  iconName: string
}

interface NotificationGroupProps {
  notifications: Notification[]
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({
  notifications
}) => {
  const [children, setChildren] = useState<Notification[]>([])

  useEffect(() => {
    setChildren(notifications)
  }, [notifications])

  return (
    <div className='ui bottom right toast-container'>
      {children.map(el => (
        <Notification iconName={el.iconName} message={el.message} />
      ))}
    </div>
  )
}

export default NotificationGroup
