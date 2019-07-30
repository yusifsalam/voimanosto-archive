import React, { useContext, useEffect, useState } from 'react'
import { Form, Icon, Segment, Statistic, Table } from 'semantic-ui-react'
import { UserContext } from '../../../../context/userContext'
import exerciseLibraryService from '../../../../services/exerciseLibraryService'
import prService from '../../../../services/prService'

interface ExerciseTable {
  name: string
  variation?: string
  pr?: number
  sets: number[]
  reps: number[]
  weight: number[]
  intensity: number[]
  rpe?: number[]
}

interface WorkoutPlainFormProps {
  date: Date
  setOpen(value: boolean): void
}
const WorkoutPlainForm: React.FC<WorkoutPlainFormProps> = ({
  date,
  setOpen
}) => {
  const { user } = useContext(UserContext)
  const [exName, setExName] = useState('Squat')
  const [exVariations, setExVariations] = useState<IExercise[]>([])
  const [exVariation, setExVariation] = useState('Competition')
  const [pr, setPr] = useState<IPR | null>(null)
  const [added, setAdded] = useState<ExerciseTable[]>([])
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [intensity, setIntensity] = useState(0)
  const [RPE, setRPE] = useState(0)

  const variations = exVariations.map(ex => ({
    key: ex.id,
    value: ex.variation,
    text: ex.variation
  }))

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await exerciseLibraryService.getExercises({
          username: user.username,
          token: user.token,
          type: exName === 'Accessories' ? 'acc' : 'sbd',
          name: exName === 'Accessories' ? '' : exName
        })
        const pr = await prService.getOne({
          current: 'current',
          token: user.token,
          username: user.username,
          name: exName,
          type: exName === 'Accessories' ? 'acc' : 'sbd',
          variation: exVariation
        })
        setPr(pr)
        setExVariations(res)
      }
    }
    fetchData()
  }, [user, exName, exVariation])

  const handleVariationChage = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setExVariation(data.value)
  }

  const handleAddSet = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    let index
    if (
      added.some((set, i) => {
        if (set.name === exName && set.variation === exVariation) {
          index = i
          return true
        } else return false
      })
    ) {
      if (index !== null && index !== undefined) {
        const addedCopy = [...added]
        const oldSet = addedCopy[index]
        oldSet.sets = oldSet.sets.concat(sets)
        oldSet.reps = oldSet.reps.concat(reps)
        oldSet.weight = pr
          ? oldSet.weight.concat(
              2.5 * Math.ceil((pr.weight * intensity) / 100 / 2.5)
            )
          : oldSet.weight.concat(0)
        oldSet.intensity = oldSet.intensity.concat(intensity)
        addedCopy[index] = oldSet
        console.log(addedCopy)
        setAdded(addedCopy)
      }
    } else {
      const newSet: ExerciseTable = {
        name: exName,
        variation: exVariation,
        sets: [sets],
        reps: [reps],
        weight: pr
          ? [2.5 * Math.ceil((pr.weight * intensity) / 100 / 2.5)]
          : [],
        intensity: [intensity]
      }
      setAdded(added.concat(newSet))
    }
  }
  return (
    <div>
      <Form inverted>
        <Form.Group inline>
          <label> Exercise</label>
          <Form.Radio
            label='Squat'
            value='Squat'
            checked={exName === 'Squat'}
            onChange={() => {
              setExName('Squat')
              setExVariation('Competition')
            }}
          />
          <Form.Radio
            label='Bench'
            value='Bench'
            checked={exName === 'Bench'}
            onChange={() => {
              setExName('Bench')
              setExVariation('Competition')
            }}
          />
          <Form.Radio
            label='Deadlift'
            value='Deadlift'
            checked={exName === 'Deadlift'}
            onChange={() => {
              setExName('Deadlift')
              setExVariation('Competition')
            }}
          />
          <Form.Radio
            label='Accessory'
            value='acc'
            checked={exName === 'Accessory'}
            onChange={() => {
              setExName('Accessory')
              setExVariation('')
            }}
          />
        </Form.Group>

        <Form.Select
          placeholder='Variation'
          options={variations}
          value={exVariation}
          clearable
          onChange={handleVariationChage}
        />

        <Statistic inverted size='small'>
          <Statistic.Label>
            {exVariation} {exName}
          </Statistic.Label>
          <Statistic.Value>1RM: {pr ? pr.weight : null} kg</Statistic.Value>
        </Statistic>

        <Form.Group inline>
          <Form.Input
            placeholder='Sets'
            type='number'
            style={{ width: '75px' }}
            value={sets === 0 ? '' : sets}
            onChange={(e, data) => setSets(Number(data.value))}
          />
          <Form.Input
            placeholder='Reps'
            type='number'
            style={{ width: '75px' }}
            value={reps === 0 ? '' : reps}
            onChange={(e, data) => setReps(Number(data.value))}
          />
          <Form.Input
            placeholder='RPE'
            type='number'
            style={{ width: '75px' }}
            value={RPE === 0 ? '' : RPE}
            onChange={(e, data) => setRPE(Number(data.value))}
          />
          <Form.Input
            step='1'
            placeholder='%'
            type='number'
            style={{ width: '75px' }}
            value={intensity === 0 ? '' : intensity}
            onChange={(e, data) => setIntensity(Number(data.value))}
          />
          <Form.Button icon inverted color='blue' onClick={handleAddSet}>
            <Icon name='add circle' />
          </Form.Button>
        </Form.Group>
        <Segment.Group>
          {added.map(ex => (
            <Segment inverted key={ex.name + ex.variation}>
              {ex.name} {ex.variation}
              <Table inverted collapsing unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Sets</Table.HeaderCell>
                    <Table.HeaderCell>Reps</Table.HeaderCell>
                    <Table.HeaderCell>Weight</Table.HeaderCell>
                    <Table.HeaderCell>Intensity</Table.HeaderCell>
                    <Table.HeaderCell>RPE</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {ex.sets.map((set, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{set}</Table.Cell>
                      <Table.Cell>{ex.reps[i]}</Table.Cell>
                      <Table.Cell>{ex.weight[i]} kg</Table.Cell>
                      <Table.Cell>{ex.intensity[i]}%</Table.Cell>
                      <Table.Cell>{ex.rpe ? ex.rpe[i] : null}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          ))}
        </Segment.Group>
        <Form.TextArea placeholder='Workout notes' />
        <Form.Group inline>
          <Form.Button inverted color='green'>
            Save
          </Form.Button>
          <Form.Button inverted color='red' onClick={() => setOpen(false)}>
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default WorkoutPlainForm
