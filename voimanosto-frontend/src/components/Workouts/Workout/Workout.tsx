import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Header, Icon, Table } from 'semantic-ui-react'
import { UserContext } from '../../../context/userContext'
import workoutService from '../../../services/workoutService'

interface WorkoutProps {
  date: Date
}

const Workout: React.FC<WorkoutProps> = ({ date }) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState([-1])
  const [exercises, setExercises] = useState<IExerciseInstance[]>([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await workoutService.getByDate({
          username: user.username,
          token: user.token,
          date: date
        })
        setExercises(res.exercises)
      }
    }
    fetchData()
  }, [user, date])

  const handleClick = (index: number) => {
    if (activeExerciseIndex.includes(index)) {
      setActiveExerciseIndex(activeExerciseIndex.filter(i => i !== index))
    } else {
      setActiveExerciseIndex(activeExerciseIndex.concat(index))
    }
  }
  return (
    <div>
      <Header inverted>{moment(date).format('MMMM Do')}</Header>
      <Accordion
        styled
        inverted
        exclusive={false}
        style={{ backgroundColor: '#1C1C1E' }}
      >
        {!exercises ? (
          <p>No workout </p>
        ) : (
          exercises.map((ex, i) => (
            <div key={i}>
              <Accordion.Title
                as={Header}
                index={i}
                active={activeExerciseIndex.includes(i)}
                key={ex.id}
                onClick={() => handleClick(i)}
                style={{
                  marginTop: '10px',
                  color: 'white',
                  borderRadius: '10px',
                  backgroundColor:
                    ex.exercise.name === 'Squat'
                      ? '#ff375f'
                      : ex.exercise.name === 'Bench'
                      ? '#ff9f0a'
                      : ex.exercise.name === 'Deadlift'
                      ? '#5e5ce6'
                      : '#2c2c2e'
                }}
              >
                <Icon name='dropdown' />
                {ex.exercise.name} ({ex.exercise.variation})
              </Accordion.Title>
              <Accordion.Content active={activeExerciseIndex.includes(i)}>
                <Table inverted unstackable collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Sets</Table.HeaderCell>
                      <Table.HeaderCell>Reps</Table.HeaderCell>
                      <Table.HeaderCell>Weight</Table.HeaderCell>
                      <Table.HeaderCell>Intensity</Table.HeaderCell>
                      <Table.HeaderCell>RPE</Table.HeaderCell>
                      <Table.HeaderCell>PR</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{ex.sets}</Table.Cell>
                      <Table.Cell>{ex.reps}</Table.Cell>
                      <Table.Cell>{ex.weight}</Table.Cell>
                      <Table.Cell>{ex.intensity}</Table.Cell>
                      <Table.Cell>{ex.RPE}</Table.Cell>
                      <Table.Cell>
                        {ex.isPR ? <Icon name='check' /> : <div />}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </div>
          ))
        )}
      </Accordion>
    </div>
  )
}

export default Workout
