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
import bodyweightService from '../../services/bodyweightService'
import LoadingLottie from '../../animations/LoadingLottie'
import { NavLink } from 'react-router-dom'
import BodyweightChart from '../../components/Bodyweight/Chart'

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext)

  const [data, setData] = useState<IBodyweight[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [notifications, setNotifications] = useState([
    { message: 'moi', iconName: 'info', id: '1' },
    { message: 'oho', iconName: 'trophy', id: '2' }
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
            {dataLoaded ? (
              <BodyweightChart data={data} />
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
            notifications.concat({
              message: 'uwu',
              iconName: 'trophy',
              id: '3'
            })
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
