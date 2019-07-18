import axios from 'axios'

interface getExerciseProps {
  username: string
  token: string
  type?: string
  name?: string
}

const getExercises = async (props: getExerciseProps) => {
  const baseURL: string = `/api/users/${props.username}/exercises`
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  let result
  if (props.type && props.name) {
    result = await axios.get(baseURL + `/${props.type}/${props.name}`, config)
  } else if (props.type) {
    result = await axios.get(baseURL + `/${props.type}`, config)
  } else {
    result = await axios.get(baseURL, config)
  }
  return result.data
}

interface postExerciseProps {
  username: string
  token: string
  type: string
  name: string
  variation: string
  reps: number
  weight: number
}

const postExercise = async (props: postExerciseProps) => {
  const baseURL: string = `/api/users/${props.username}/exercises`
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.post(baseURL, props, config)
  return res.data
}

export default { getExercises, postExercise }
