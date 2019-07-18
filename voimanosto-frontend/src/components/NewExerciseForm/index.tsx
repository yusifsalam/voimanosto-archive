import React, { useState } from 'react'
import { Segment, Button, Form } from 'semantic-ui-react'

const NewExerciseForm: React.FC = () => {
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [variation, setVariation] = useState('')

  const handleTypeChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setType(data.value)
  }
  const handleNameChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setName(data.value)
  }

  return (
    <Segment
      style={{
        zIndex: 1000,
        border: '3px dashed green'
      }}
    >
      <h3>Add new exercise</h3>
      <Form>
        <Form.Dropdown
          value={type}
          label='Exercise type'
          placeholder='Exercise type'
          options={[
            { key: 'sbd', value: 'sbd', text: 'SBD' },
            { key: 'acc', value: 'acc', text: 'Accessory' }
          ]}
          onChange={handleTypeChange}
        />
        <Form.Dropdown
          value={name}
          label='Exercise name'
          placeholder='Exercise name'
          options={[
            { key: 'squat', value: 'squat', text: 'Squat' },
            { key: 'bench', value: 'bench', text: 'Bench' }
          ]}
          onChange={handleNameChange}
        />
        <Form.Input placeholder='Variation' type='text' />
        <Form.Input placeholder='1RM' type='number' />
        <Button type='submit' color='violet'>
          Send it bro
        </Button>
      </Form>
      <Button color='red'>cancel</Button>
    </Segment>
  )
}

export default NewExerciseForm
