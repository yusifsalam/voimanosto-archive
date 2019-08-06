import axios from 'axios'

interface getAllProps {
  username: string
  token: string
}

const getAll = async (props: getAllProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.get(`/api/users/${props.username}/workouts`, config)
  return res.data
}

interface getByDateProps {
  username: string
  token: string
  date: Date
}

const getByDate = async (props: getByDateProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.get(
    `/api/users/${props.username}/workouts/${props.date}`,
    config
  )
  return res.data
}

interface newWorkoutExercise {
  type: string
  name: string
  variation: string
  reps: number[]
  sets: number[]
  intensity?: number[]
  RPE: number[]
}

interface newWorkoutProps {
  date: Date
  notes: string
  readiness: number
  exercises: newWorkoutExercise[]
  username: string
  token: string
}

const create = async (props: newWorkoutProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.post(
    `/api/users/${props.username}/workouts`,
    props,
    config
  )
  return res.data
}

interface getMonthProps {
  username: string
  token: string
  date: Date
}

const getMonth = async (props: getMonthProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.get(
    `/api/users/${props.username}/workouts/${props.date}/month`,
    config
  )
  return res.data
}

export default { getAll, getByDate, getMonth, create }
