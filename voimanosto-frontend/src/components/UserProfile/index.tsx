import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { IUser } from '../../types'

interface UserProfileProps {
  user?: IUser | null
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      {user !== undefined && user !== null ? (
        <div>
          <Card>
            {user.avatar === 'default' ? (
              <Image src='https://res.cloudinary.com/yusif/image/upload/v1562012928/ove22swyg688lvfvnw5m.png' />
            ) : (
              <Image src={user.avatar} />
            )}

            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>Joined in 2019</Card.Meta>
              <Card.Description>Name is a powerlifter!</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />
              420 wilks!!!
            </Card.Content>
          </Card>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default UserProfile
