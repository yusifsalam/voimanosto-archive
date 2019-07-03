import React, { useState, useEffect } from 'react'
import { ipf_params, wilks_params } from '../../util'
import {
  Button,
  Icon,
  Form,
  Divider,
  Segment,
  Grid,
  Label
} from 'semantic-ui-react'
import loginService from '../../services/login'
import workoutService from '../../services/workoutService'
import './PointCalculator.scss'

type IUser = {
  name: string
  username: string
}

const PointCalculator: React.FC = () => {
  const [points, setPoints] = useState(0)
  const [wilks, setWilks] = useState(0)
  const [total, setTotal] = useState(0)
  const [bodyweight, setBodyweight] = useState(0)
  const [sex, setSex] = useState('M')
  const [equipment, setEquipment] = useState('Raw')
  const [eventType, setEventType] = useState('SBD')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  const handleBodyweightChange = (event: any) => {
    event.preventDefault()
    setBodyweight(event.target.value)
  }

  const handleTotalChange = (event: any) => {
    event.preventDefault()
    setTotal(event.target.value)
  }

  const handleSexChange = (event: React.FormEvent<EventTarget>): void => {
    let target = event.target as HTMLInputElement
    setSex(target.value)
  }

  const handleEquipmentChange = (event: any) => {
    setEquipment(event.target.value)
  }

  const handleEventChange = (event: any) => {
    setEventType(event.target.value)
  }

  const handlePointChange = (event: any) => {
    event.preventDefault()
    setPoints(calculatePoints(total, bodyweight, sex, equipment, eventType))
    setWilks(calculateWilks(total, bodyweight, sex))
  }

  const handleLogin = async (event: any) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      workoutService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  function calculatePoints(
    total: number,
    bw: number,
    sex: string,
    equipment: string,
    eventType: string
  ): number {
    if (bodyweight === 0) alert('Please enter bodyweight')
    if (total === 0) alert('Please enter total')
    let constants = ipf_params[sex][equipment][eventType]
    let points =
      500 +
      (100 * (total - (constants[0] * Math.log(bw) - constants[1]))) /
        (constants[2] * Math.log(bw) - constants[3])
    return Math.round(points * 100) / 100
  }

  function calculateWilks(total: number, bw: number, sex: string): number {
    let constants = wilks_params[sex]
    let wilks =
      (total * 500) /
      (constants[0] +
        constants[1] * bw +
        constants[2] * Math.pow(bw, 2) +
        constants[3] * Math.pow(bw, 3) +
        constants[4] * Math.pow(bw, 4) +
        constants[5] * Math.pow(bw, 5))
    return Math.round(wilks * 100) / 100
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>

      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={handleLogin}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />

              <Button content='Login' primary />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  )

  const calculatorForm = () => (
    <div className='calculator-form'>
      <Segment vertical>
        <Label color='black' key='ipf_points' size='massive' horizontal>
          IPF points {points}
        </Label>
        <Label color='grey' key='wilks_points' size='massive' horizontal>
          Wilks points {wilks}
        </Label>
      </Segment>

      <Form onSubmit={handleBodyweightChange}>
        <Form.Group>
          <Form.Field>
            <label>Bodyweight</label>
            <input
              value={bodyweight === 0 ? '' : bodyweight}
              onChange={handleBodyweightChange}
              placeholder='Bodyweight'
              type='number'
            />
          </Form.Field>
          <Form.Field>
            <label>Total</label>
            <input
              value={total === 0 ? '' : total}
              onChange={handleTotalChange}
              placeholder='Total'
              type='number'
            />
          </Form.Field>
        </Form.Group>

        <Form.Group>
          <label>Sex </label>
          <Form.Field
            control='input'
            type='radio'
            label='Male'
            value='M'
            checked={sex === 'M'}
            onChange={handleSexChange}
          />
          <Form.Field
            control='input'
            type='radio'
            label='Female'
            value='F'
            checked={sex === 'F'}
            onChange={handleSexChange}
          />
        </Form.Group>

        <Form.Group>
          <label>Event type</label>
          <Form.Field
            control='input'
            type='radio'
            label='Full competition'
            value='SBD'
            checked={eventType === 'SBD'}
            onChange={handleEventChange}
          />
          <Form.Field
            control='input'
            type='radio'
            label='Squat'
            value='S'
            checked={eventType === 'S'}
            onChange={handleEventChange}
          />
          <Form.Field
            control='input'
            type='radio'
            label='Bench press'
            value='B'
            checked={eventType === 'B'}
            onChange={handleEventChange}
          />
          <Form.Field
            control='input'
            type='radio'
            label='Deadlift'
            value='D'
            checked={eventType === 'D'}
            onChange={handleEventChange}
          />
        </Form.Group>

        <Form.Group>
          <label>Equipment</label>
          <Form.Field
            control='input'
            type='radio'
            label='Raw'
            value='Raw'
            checked={equipment === 'Raw'}
            onChange={handleEquipmentChange}
          />
          <Form.Field
            control='input'
            type='radio'
            label='Single-Ply'
            value='Single-Ply'
            checked={equipment === 'Single-Ply'}
            onChange={handleEquipmentChange}
          />
        </Form.Group>
      </Form>

      <Button animated onClick={handlePointChange}>
        <Button.Content visible>Calculate</Button.Content>
        <Button.Content hidden>
          <Icon name='calculator' />
        </Button.Content>
      </Button>
    </div>
  )

  return <div>{user === null ? loginForm() : calculatorForm()}</div>
}

export default PointCalculator
