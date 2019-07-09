import React, { useState } from 'react'
import { calculatePoints, calculateWilks } from '../../util'
import { Button, Icon, Form, Segment, Label } from 'semantic-ui-react'
import './PointCalculator.scss'

const PointCalculator: React.FC = () => {
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
}

export default PointCalculator
