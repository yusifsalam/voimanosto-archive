import React, { useEffect, useState } from 'react'
import { Dropdown, Table, Button, Icon } from 'semantic-ui-react'
import exerciseLibraryService from '../../services/exerciseLibraryService'
import NewExerciseForm from '../NewExerciseForm'

interface ExerciseLibraryProps {
  user: IUser | null | undefined
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ user }) => {
  interface exercise {
    etype: string
    name: string
    variation: string
    id: string
  }

  const [exercises, setExercises] = useState<exercise[]>([])
  const [exerciseType, setExerciseType] = useState('sbd')
  const [exerciseName, setExerciseName] = useState('')
  const [portalOpen, setPortalOpen] = useState(false)
  const names = exercises.map(ex => {
    return {
      key: ex.name,
      value: ex.name,
      text: ex.name.charAt(0).toUpperCase() + ex.name.slice(1)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await exerciseLibraryService.getExercises({
          username: user.username,
          token: user.token,
          type: exerciseType,
          name: exerciseName
        })

        setExercises(res)
      }
    }
    fetchData()
  }, [user, exerciseType, exerciseName])

  const handleTypeSelect = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setExerciseType(data.value)
  }

  const handleExerciseSelect = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setExerciseName(data.value)
  }

  return (
    <div>
      <h3>My exercise library</h3>
      <Dropdown
        clearable
        selection
        placeholder='Select exercise type'
        options={[
          { key: 'sbd', value: 'sbd', text: 'SBD' },
          { key: 'acc', value: 'acc', text: 'Accessory' }
        ]}
        value={exerciseType}
        onChange={handleTypeSelect}
      />
      <Dropdown
        clearable
        selection
        placeholder='Select exercise'
        options={names}
        onChange={handleExerciseSelect}
      />

      <Table celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Exercise</Table.HeaderCell>
            <Table.HeaderCell>Variation</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {exercises.map(exercise => (
            <Table.Row key={exercise.id}>
              <Table.Cell collapsing>
                {exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
              </Table.Cell>
              <Table.Cell collapsing>
                {exercise.variation.charAt(0).toUpperCase() +
                  exercise.variation.slice(1)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <Button
                primary
                floated='left'
                onClick={() => setPortalOpen(!portalOpen)}
              >
                <Icon name='add circle' />
                Add new exercise
              </Button>

              <NewExerciseForm
                isOpen={portalOpen}
                closePortal={() => setPortalOpen(false)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default ExerciseLibrary
