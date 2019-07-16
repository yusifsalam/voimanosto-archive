import React, { useEffect, useState } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { IUser } from '../../types'
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from 'recharts'
import moment from 'moment'
import bodyweightService from '../../services/bodyweightService'
import LoadingLottie from '../../animations/LoadingLottie'

interface UserProfileProps {
  user?: IUser | null
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  interface bodyweight {
    date: Date
    bodyweight: number
    id: string
  }

  const [data, setData] = useState<bodyweight[]>([])
  const [dateLoaded, setDataLoaded] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await bodyweightService.getBw({
          username: user.username,
          token: user.token
        })
        setData(res)
        setDataLoaded(true)
      }
    }
    fetchData()
  }, [user])

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
              <Card.Description>{user.name} is a powerlifter!</Card.Description>
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
        {dateLoaded ? (
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey='date'
                tickFormatter={tick => moment(tick).format('MMM DD')}
              >
                <Label
                  value='Bodyweight'
                  position='insideBottom'
                  offset={-10}
                />
              </XAxis>
              <YAxis />
              <Area
                type='monotone'
                dataKey='bodyweight'
                stroke='#8884d8'
                fill='#8884d8'
                fillOpacity={0.7}
              />
              <Tooltip
                labelFormatter={value =>
                  'Date: ' + moment(value).format('MMM DD')
                }
              />
              <CartesianGrid strokeDasharray='3 3' />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div>
            <LoadingLottie />
            <h2>Loading data...</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile
