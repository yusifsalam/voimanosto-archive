import React, { useState } from 'react'
import {
  Modal,
  Button,
  Form,
  Transition,
  Dimmer,
  Message
} from 'semantic-ui-react'
import exerciseLibraryService from '../../services/exerciseLibraryService'
import SuccessLottie from '../../animations/SuccessLottie'

interface NewExerciseFormProps {
  isOpen: boolean
  closePortal(): void
  user: IUser | undefined | null
}

interface customName {
  key: string
  value: string
  text: string
}

const NewExerciseForm: React.FC<NewExerciseFormProps> = ({
  isOpen,
  closePortal,
  user
}) => {
  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [inputName, setInputName] = useState('')
  const [customNames, setCustomNames] = useState<customName[]>([])
  const [variation, setVariation] = useState('')
  const [dimmed, setDimmed] = useState(false)
  const [pr, setPr] = useState(0.2)
  const [errMsg, setErrMsg] = useState('')

  const handleTypeChange = async (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setType(data.value)
    if (data.value === 'sbd') {
      setCustomNames([
        { key: 'squat', value: 'squat', text: 'Squat' },
        { key: 'bench', value: 'bench', text: 'Bench' },
        { key: 'deadlift', value: 'deadlift', text: 'Deadlift' }
      ])
    } else {
      setName('')
      if (user) {
        const names = await exerciseLibraryService.getExercises({
          username: user.username,
          type: data.value,
          token: user.token
        })
        const mapped = names.map((name: any) => ({
          ...name,
          key: name.name + '/' + name.variation
        }))
        setCustomNames(mapped)
      } else setCustomNames([])
    }
  }
  const handleNameChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setName(data.value)
  }

  const handleInputNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputName(event.currentTarget.value)
  }

  const handleVariationChange = (event: React.FormEvent<HTMLInputElement>) => {
    setVariation(event.currentTarget.value)
  }

  const handlePrChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPr(Number(event.currentTarget.value))
  }

  const handleSubmit = async () => {
    if (user && (name || inputName) && type && variation && pr) {
      setDimmed(true)

      await exerciseLibraryService.postExercise({
        username: user.username,
        token: user.token,
        type: type,
        name: name === '' || name === undefined ? inputName : name,
        variation: variation,
        reps: 1,
        weight: pr
      })

      await new Promise(resolve => {
        setTimeout(() => {
          setDimmed(false)
          closePortal()
        }, 3000)
      })
    } else {
      setErrMsg('Please fill in all fields')
      setTimeout(() => {
        setErrMsg('')
      }, 2000)
    }
  }

  return (
    <Transition visible={isOpen} animation='slide down' duration={500}>
      <Dimmer.Dimmable
        dimmed={dimmed}
        as={Modal}
        closeIcon
        dimmer='blurring'
        open={isOpen}
        centered={false}
        onClose={closePortal}
        className='inverted'
      >
        <Modal.Header>Add new exercise</Modal.Header>
        <Modal.Content>
          <Message error hidden={errMsg === ''}>
            <Message.Header>Something went wrong</Message.Header>
            <Message.Content>{errMsg}</Message.Content>
          </Message>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Dropdown
                value={type}
                label='Exercise type'
                placeholder='Exercise type'
                options={[
                  { key: 'sbd', value: 'sbd', text: 'Main' },
                  { key: 'acc', value: 'acc', text: 'Accessory' }
                ]}
                onChange={handleTypeChange}
              />
              {customNames.length > 0 ? (
                <Form.Dropdown
                  clearable
                  value={name}
                  label='Exercise name'
                  placeholder='Exercise name'
                  options={customNames}
                  onChange={handleNameChange}
                />
              ) : (
                <div />
              )}
            </Form.Group>
            {name === '' || name === undefined ? (
              <Form.Input
                value={inputName}
                placeholder='Exercise Name'
                type='text'
                onChange={handleInputNameChange}
              />
            ) : (
              <div />
            )}
            <Form.Input
              placeholder='Variation'
              type='text'
              value={variation}
              onChange={handleVariationChange}
            />
            <Form.Input
              placeholder='1RM (minimum increment is 0.5 kg)'
              type='number'
              value={pr === 0.2 ? '' : pr}
              error={pr < 0.2}
              step='0.5'
              onChange={handlePrChange}
            />
            <Button type='submit' color='green' inverted>
              Add exercise
            </Button>
            <Button color='red' inverted onClick={closePortal}>
              Cancel
            </Button>
          </Form>
        </Modal.Content>
        <Dimmer active={dimmed}>
          <SuccessLottie />
          <h4>
            {variation} {name === '' || name === undefined ? inputName : name}{' '}
            added to exercises!
          </h4>
        </Dimmer>
      </Dimmer.Dimmable>
    </Transition>
  )
}

export default NewExerciseForm
