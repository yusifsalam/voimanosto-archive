import React, { useState } from 'react'
import { calculatePoints, calculateWilks } from '../../util'
import {
  Button,
  Icon,
  Form,
  Statistic,
  Container,
  Header,
  Grid
} from 'semantic-ui-react'
import './PointCalculator.scss'

interface calculatorProps {
  moi: boolean
}

const PointCalculator: React.FC<calculatorProps> = ({ moi }) => {
  const [points, setPoints] = useState(0)
  const [wilks, setWilks] = useState(0)
  const [total, setTotal] = useState(0)
  const [bodyweight, setBodyweight] = useState(0)
  const [sex, setSex] = useState('M')
  const [equipment, setEquipment] = useState('Raw')
  const [eventType, setEventType] = useState('SBD')

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

  return (
    <Container text className='calculator-form'>
      <Grid divided>
        <Grid.Row>
          <Statistic.Group inverted size='small'>
            <Statistic inverted key='ipf_points'>
              <Statistic.Value>
                IPF points: {points === 0 ? '' : points}
              </Statistic.Value>
            </Statistic>
            <Statistic key='wilks_points'>
              <Statistic.Value>
                Wilks points: {wilks === 0 ? '' : wilks}
              </Statistic.Value>
            </Statistic>
          </Statistic.Group>
        </Grid.Row>
        <Grid.Row>
          <Form inverted size='large' onSubmit={handleBodyweightChange}>
            <Grid.Row divided>
              <Form.Group inline={true}>
                <Grid.Column>
                  <Form.Field>
                    <Header inverted>Bodyweight</Header>
                    <Form.Input
                      value={bodyweight === 0 ? '' : bodyweight}
                      onChange={handleBodyweightChange}
                      placeholder='Bodyweight'
                      type='number'
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <Header inverted>Total</Header>
                    <Form.Input
                      value={total === 0 ? '' : total}
                      onChange={handleTotalChange}
                      placeholder='Total'
                      type='number'
                    />
                  </Form.Field>
                </Grid.Column>
              </Form.Group>
            </Grid.Row>

            <Grid.Row>
              <Form.Group>
                <Header inverted>Sex </Header>
                <Form.Radio
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
            </Grid.Row>
            <Grid.Row>
              <Form.Group>
                <Header inverted>Event type</Header>
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
            </Grid.Row>
            <Grid.Row>
              <Form.Group>
                <Header inverted>Equipment</Header>
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
            </Grid.Row>
            <Button
              inverted
              color='violet'
              animated
              onClick={handlePointChange}
            >
              <Button.Content visible>Calculate</Button.Content>
              <Button.Content hidden>
                <Icon name='calculator' />
              </Button.Content>
            </Button>
          </Form>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default PointCalculator
