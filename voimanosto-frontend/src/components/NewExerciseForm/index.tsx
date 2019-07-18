import React, { useState } from 'react'
import { Modal, Button, Form, Transition } from 'semantic-ui-react'

interface NewExerciseFormProps {
  isOpen: boolean
  closePortal(): void
}

const NewExerciseForm: React.FC<NewExerciseFormProps> = ({
  isOpen,
  closePortal
}) => {
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
    <Transition visible={isOpen} animation='swing down' duration={500}>
      <Modal
        dimmer='blurring'
        open={isOpen}
        centered={false}
        onClose={closePortal}
      >
        <Modal.Header>Add new exercise</Modal.Header>
        <Modal.Content>
          <Form onSubmit={() => console.log('submitted le form')}>
            <Form.Group>
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
            </Form.Group>
            <Form.Input placeholder='Variation' type='text' />
            <Form.Input placeholder='1RM' type='number' />
            <Button type='submit' color='violet' inverted>
              Send it bro
            </Button>
            <Button color='green' inverted onClick={closePortal}>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Transition>
  )
}

export default NewExerciseForm
