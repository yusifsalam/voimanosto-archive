import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { IUser } from '../../types'
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import moment from 'moment'

interface UserProfileProps {
  user?: IUser | null
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const data = [
    {
      bodyweight: 73.5,
      date: '2019-06-27T10:49:56.350+00:00'
    },
    {
      bodyweight: 80.0,
      date: '2019-07-01T10:59:08.362+00:00'
    },
    {
      bodyweight: 77.8,
      date: '2019-07-12T10:59:08.362+00:00'
    }
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
      <div style={{ width: '500px', height: '300px', display: 'flex' }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis
              dataKey='date'
              tickFormatter={tick => moment(tick).format('MMM DD')}
            >
              <Label value='Bodyweight' position='insideBottom' offset={-10} />
            </XAxis>
            <YAxis />
            <Area type='monotone' dataKey='bodyweight' />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default UserProfile
