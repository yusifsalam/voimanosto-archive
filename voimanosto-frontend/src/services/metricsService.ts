import axios from 'axios'

interface getAllVolumeProps {
  username: string
  token: string
}

const getAllVolume = async (props: getAllVolumeProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.get(`/api/users/${props.username}/stats`, config)
  return res.data
}

export default { getAllVolume }
