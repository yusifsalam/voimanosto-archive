import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Header, Icon, Table } from 'semantic-ui-react'
import exerciseLibraryService from '../../services/exerciseLibraryService'
import NewExerciseForm from '../NewExerciseForm'

interface ExerciseLibraryProps {
  user: IUser | null | undefined
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({ user }) => {
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [exerciseType, setExerciseType] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [portalOpen, setPortalOpen] = useState(false)

  const uniqueNames = Array.from(
    new Set(exercises.map(exercise => exercise.name))
  )
  const names = uniqueNames.map(ex => ({
    key: ex,
    value: ex,
    text: ex.charAt(0).toUpperCase() + ex.slice(1)
  }))

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
      <Header inverted>My exercise library</Header>
      <Dropdown
        clearable
        selection
        placeholder='Select exercise type'
        options={[
          { key: '', value: '', text: 'All' },
          { key: 'sbd', value: 'sbd', text: 'Main' },
          { key: 'acc', value: 'acc', text: 'Accessory' }
        ]}
        value={exerciseType}
        onChange={handleTypeSelect}
        className='inverted'
      />
      <Dropdown
        clearable
        selection
        placeholder='Select exercise'
        options={names}
        onChange={handleExerciseSelect}
        className='inverted'
      />

      <Table inverted celled collapsing selectable unstackable>
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
                inverted
                color='violet'
                floated='left'
                onClick={() => setPortalOpen(!portalOpen)}
              >
                <Icon name='add circle' />
                Add new exercise
              </Button>

              <NewExerciseForm
                isOpen={portalOpen}
                closePortal={() => setPortalOpen(false)}
                user={user}
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
