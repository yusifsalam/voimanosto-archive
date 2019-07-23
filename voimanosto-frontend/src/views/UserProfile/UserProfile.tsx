import React, { useEffect, useState, useContext } from 'react'
import {
  Card,
  Icon,
  Image,
  Label,
  Grid,
  Header,
  Button
} from 'semantic-ui-react'
import ExerciseLibrary from '../../components/ExerciseLibrary'
import NotificationGroup from '../../components/NotificationGroup'
import { UserContext } from '../../context/userContext'
import {
  AreaChart,
  Area,
  Label as ChartLabel,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from 'recharts'
import moment from 'moment'
import bodyweightService from '../../services/bodyweightService'
import LoadingLottie from '../../animations/LoadingLottie'
import { NavLink } from 'react-router-dom'

const UserProfile: React.FC = () => {
  interface bodyweight {
    date: Date
    bodyweight: number
    id: string
  }
  const { user } = useContext(UserContext)

  const [data, setData] = useState<bodyweight[]>([])

  const [dateLoaded, setDataLoaded] = useState(false)
  const [notifications, setNotifications] = useState([
    { message: 'moi', iconName: 'info' },
    { message: 'oho', iconName: 'trophy' }
  ])

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
    <div>
      <Grid doubling columns={2} style={{ margin: '2%' }}>
        <Grid.Row>
          {user !== undefined && user !== null ? (
            <Grid.Column width={4}>
              <Card className='inverted'>
                <Image
                  src={
                    user.avatar === 'default'
                      ? 'https://res.cloudinary.com/yusif/image/upload/v1562012928/ove22swyg688lvfvnw5m.png'
                      : user.avatar
                  }
                  label={
                    <Label
                      as={NavLink}
                      to='/settings#second'
                      corner='left'
                      icon='cog'
                      className='inverted'
                      color='pink'
                    />
                  }
                />

                <Card.Content>
                  <Card.Header>{user.name}</Card.Header>
                  <Card.Meta>Joined in 2019</Card.Meta>
                  <Card.Description>
                    {user.name} is a powerlifter!
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name='user' />
                  420 wilks!!!
                </Card.Content>
              </Card>
            </Grid.Column>
          ) : (
            <div />
          )}

          <Grid.Column width={12}>
            <Header inverted>Recent bodyweight</Header>
            {dateLoaded ? (
              <ResponsiveContainer height={300} width='100%'>
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis
                    dataKey='date'
                    tickFormatter={tick => moment(tick).format('MMM DD')}
                    stroke='white'
                  >
                    <ChartLabel
                      value='Date'
                      position='insideBottom'
                      offset={-10}
                      fill='white'
                    />
                  </XAxis>
                  <YAxis
                    stroke='white'
                    label={{
                      value: 'Bodyweight, kg',
                      angle: -90,
                      fill: 'white',
                      position: 'insideLeft'
                    }}
                  />
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
                  <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div>
                <LoadingLottie />
                <Header as='h2' inverted>
                  Loading data...
                </Header>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <ExerciseLibrary user={user} />
        </Grid.Row>
      </Grid>

      <Button
        onClick={() =>
          setNotifications(
            notifications.concat({ message: 'uwu', iconName: 'trophy' })
          )
        }
      >
        add notification!
      </Button>

      <NotificationGroup notifications={notifications} />
    </div>
  )
}

export default UserProfile