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
      <Accordion styled inverted exclusive={false}>
        {!exercises ? (
          <p>No workout </p>
        ) : (
          exercises.map((ex, i) => (
            <div key={i}>
              <Accordion.Title
                as={Header}
                // inverted
                index={i}
                active={activeExerciseIndex.includes(i)}
                key={ex.id}
                onClick={() => handleClick(i)}
              >
                <Icon name='dropdown' />
                {ex.exercise.name} ({ex.exercise.variation})
              </Accordion.Title>
              <Accordion.Content active={activeExerciseIndex.includes(i)}>
                <Table inverted>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Exercise</Table.HeaderCell>
                      <Table.HeaderCell>Sets</Table.HeaderCell>
                      <Table.HeaderCell>Reps</Table.HeaderCell>
                      <Table.HeaderCell>Weight</Table.HeaderCell>
                      <Table.HeaderCell>Intensity</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{ex.exercise.name}</Table.Cell>
                      <Table.Cell>{ex.sets}</Table.Cell>
                      <Table.Cell>{ex.reps}</Table.Cell>
                      <Table.Cell>{ex.weight}</Table.Cell>
                      <Table.Cell>{ex.intensity}</Table.Cell>
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
