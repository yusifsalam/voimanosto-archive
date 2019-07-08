import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const UserProfile: React.FC = () => {
  return (
    <Card>
      <Image src='https://res.cloudinary.com/yusif/image/upload/v1562012928/ove22swyg688lvfvnw5m.png' />
      <Card.Content>
        <Card.Header>Name</Card.Header>
        <Card.Meta>Joined in 2019</Card.Meta>
        <Card.Description>Name is a powerlifter!</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        420 wilks!!!
      </Card.Content>
    </Card>
  )
}

export default UserProfile
