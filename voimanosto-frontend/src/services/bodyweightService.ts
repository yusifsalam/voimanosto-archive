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

export default { addBw, getBw }
