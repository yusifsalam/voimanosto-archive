import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Header, Icon, Segment, Table } from 'semantic-ui-react'
import { UserContext } from '../../../context/userContext'
import workoutService from '../../../services/workoutService'

interface WorkoutProps {
  date: Date
}

const Workout: React.FC<WorkoutProps> = ({ date }) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState([-1])
  const [exercises, setExercises] = useState<IGroupedExerciseInstances[]>([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await workoutService.getByDate({
          username: user.username,
          token: user.token,
          date: date
        })
        const groupedExercises = groupData(res.exercises)
        setExercises(groupedExercises)
      }
    }
    fetchData()
  }, [user, date])

  const groupData = (
    data: IExerciseInstance[]
  ): IGroupedExerciseInstances[] => {
    let groupedArray: IGroupedExerciseInstances[] = []
    if (data) {
      data.forEach((entry, i) => {
        if (
          !groupedArray.some(
            (item: any) =>
              item.exercise.variation === entry.exercise.variation &&
              item.exercise.name === entry.exercise.name
          )
        ) {
          let newEntry = {
            exercise: entry.exercise,
            id: entry.id,
            reps: [entry.reps],
            sets: [entry.sets],
            intensity: [entry.intensity],
            RPE: [entry.RPE],
            weight: [entry.weight],
            isPR: [entry.isPR]
          }
          groupedArray.push(newEntry)
        } else {
          let oldEntry = groupedArray.pop()
          let newEntry = {
            exercise: entry.exercise,
            id: entry.id,
            reps: oldEntry ? oldEntry.reps.concat(entry.reps) : [],
            sets: oldEntry ? oldEntry.sets.concat(entry.sets) : [],
            intensity: oldEntry
              ? oldEntry.intensity.concat(entry.intensity)
              : [],
            RPE: oldEntry ? oldEntry.RPE.concat(entry.RPE) : [],
            weight: oldEntry ? oldEntry.weight.concat(entry.weight) : [],
            isPR: oldEntry ? oldEntry.isPR.concat(entry.isPR) : []
          }
          groupedArray.push(newEntry)
        }
      })
    }
    return groupedArray
  }

  const handleClick = (index: number) => {
    if (activeExerciseIndex.includes(index)) {
      setActiveExerciseIndex(activeExerciseIndex.filter(i => i !== index))
    } else {
      setActiveExerciseIndex(activeExerciseIndex.concat(index))
    }
  }
  return (
    <Segment compact inverted style={{ border: '2px solid white' }}>
      <Header inverted>{moment(date).format('MMMM Do')}</Header>
      <Accordion
        styled
        inverted
        exclusive={false}
        style={{ backgroundColor: '#1C1C1E' }}
      >
        {exercises.length === 0 ? (
          <Header inverted as='h5'>
            No workout planned
          </Header>
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
                <Table inverted unstackable collapsing textAlign='center'>
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
                    {ex.sets.map((set, i) => (
                      <Table.Row key={ex.id + i}>
                        <Table.Cell>{ex.sets[i]}</Table.Cell>
                        <Table.Cell>{ex.reps[i]}</Table.Cell>
                        <Table.Cell>{ex.weight[i]}</Table.Cell>
                        <Table.Cell>{ex.intensity[i]}</Table.Cell>
                        <Table.Cell>{ex.RPE[i]}</Table.Cell>
                        <Table.Cell>
                          {ex.isPR[i] ? <Icon name='check' /> : <div />}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Accordion.Content>
            </div>
          ))
        )}
      </Accordion>
    </Segment>
  )
}

export default Workout
