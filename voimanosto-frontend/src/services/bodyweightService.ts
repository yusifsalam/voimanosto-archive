import axios from 'axios'

interface addBwProps {
  date: Date
  bodyweight: number
  username: string
  token: string
}

const addBw = async (bw: addBwProps) => {
  const config = {
    headers: { Authorization: `bearer ${bw.token}` }
  }
  const result = await axios.post(
    `/api/users/${bw.username}/bodyweight`,
    bw,
    config
  )
  return result.data
}

const getBw = async (username: string) => {
  const result = await axios.get(`/api/users/${username}/bodyweight`)
  return result.data
}

export default { addBw, getBw }
