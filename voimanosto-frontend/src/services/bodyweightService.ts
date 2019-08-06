import axios from 'axios'

interface addBwProps {
  date: Date
  bodyweight: number
  username: string
  token: string
}

const addBw = async (props: addBwProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const result = await axios.post(
    `/api/users/${props.username}/bodyweight`,
    props,
    config
  )
  return result.data
}

interface getBwProps {
  username: string
  token: string
}

const getBw = async (props: getBwProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const result = await axios.get(
    `/api/users/${props.username}/bodyweight`,
    config
  )
  return result.data
}

interface deleteBwProps {
  username: string
  token: string
  id: string
}

const deleteBw = async (props: deleteBwProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.delete(
    `/api/users/${props.username}/bodyweight/${props.id}`,
    config
  )
  return res
}

interface editBwProps {
  username: string
  token: string
  bodyweight: number
  date: Date
  id: string
}

const editBw = async (props: editBwProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.put(
    `/api/users/${props.username}/bodyweight/${props.id}`,
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
    `/api/users/${props.username}/bodyweight/${props.date}/month`,
    config
  )
  return res.data
}

export default { addBw, getBw, deleteBw, editBw, getMonth }
