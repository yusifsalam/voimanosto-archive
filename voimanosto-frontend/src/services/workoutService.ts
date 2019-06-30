import axios from 'axios'
const baseUrl: string = '/api/workouts'

let token: string | null = null

interface IWorkout {
  user: string
  exercises: [string]
  date: Date
}

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async (newObject: IWorkout) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id: string, newObject: IWorkout) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

export default { getAll, create, update, setToken }
