import axios from 'axios'
const baseUrl: string = '/api/login'

interface loginProps {
  username: string
  password: string
}

const login = async (credentials: loginProps) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

const verify = async (token: string) => {
  const res = await axios.post(baseUrl + '/verify', { token: token })
  return res.data
}

export default { login, verify }
