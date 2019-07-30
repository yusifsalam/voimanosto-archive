import React, { useState } from 'react'
import { Header, Accordion, Icon, Segment, Table } from 'semantic-ui-react'
import moment from 'moment'

const Workout: React.FC<IWorkout> = ({ date, exercises }) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState([-1])
  const ex = [
    {
      exercise: 'Competition Squat',
      reps: 4,
      sets: 6,
      weight: 150,
      intensity: 0.8,
      RPE: null,
      isPR: false,
      id: 1
    },
    {
      exercise: 'Competition Bench press',
      reps: 6,
      sets: 6,
      weight: 120,
      intensity: 0.8,
      RPE: null,
      isPR: false,
      id: 2
    },
    {
      exercise: 'Conventional Deadlift',
      reps: 2,
      sets: 5,
      weight: 210,
      intensity: 0.8,
      RPE: null,
      isPR: false,
      id: 3
    }
  ]

  const handleClick = (index: number) => {
    if (activeExerciseIndex.includes(index)) {
      setActiveExerciseIndex(activeExerciseIndex.filter(i => i !== index))
    } else {
      setActiveExerciseIndex(activeExerciseIndex.concat(index))
    }
  }
  return (
    <div>
      <Header inverted>
        Workout for the day: {moment(date).format('MMMM Do')}
      </Header>
      <Segment compact>
        <Accordion
          styled
          inverted
          exclusive={false}
          activeIndex={activeExerciseIndex}
        >
          {ex.map((ex, i) => (
            <div>
              <Accordion.Title
                as={Header}
                // inverted
                index={i}
                active={activeExerciseIndex.includes(i)}
                key={ex.id}
                onClick={() => handleClick(i)}
              >
                <Icon name='dropdown' />
                {ex.exercise}
              </Accordion.Title>
              <Accordion.Content active={activeExerciseIndex.includes(i)}>
                {/* <Table inverted>
                  <Table.Header>
                    <Table.HeaderCell>Exercise</Table.HeaderCell>
                    <Table.HeaderCell>Sets</Table.HeaderCell>
                    <Table.HeaderCell>Reps</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Intensity</Table.HeaderCell>
                  </Table.Header>
                  <Table.Body>
                    <Table.Cell>{ex.exercise}</Table.Cell>
                    <Table.Cell>{ex.sets}</Table.Cell>
                    <Table.Cell>{ex.reps}</Table.Cell>
                    <Table.Cell>{ex.weight}</Table.Cell>
                    <Table.Cell>{ex.intensity}</Table.Cell>
                  </Table.Body>
                </Table> */}
                <p>Reps: {ex.reps}</p>
                <p>Sets: {ex.sets}</p>
                <p>Weight: {ex.weight} kg</p>
                <p>Intensity: {ex.intensity * 100}%</p>
                <p>RPE: {ex.RPE}</p>
              </Accordion.Content>
            </div>
          ))}
        </Accordion>
      </Segment>
    </div>
  )
}

export default Workout
