import axios from 'axios'
const baseUrl: string = '/api/login'

const login = async (credentials: any) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }
