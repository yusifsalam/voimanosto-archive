import axios from 'axios'

interface getPRProps {
  username: string
  token: string
  type?: string
  name?: string
}

const getAll = async (props: getPRProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  let result
  if (props.type) {
    if (props.name) {
      result = await axios.get(
        `/api/users/${props.username}/prs/${props.type}/${props.name}`,
        config
      )
    } else {
      result = await axios.get(
        `/api/users/${props.username}/prs/${props.type}`,
        config
      )
    }
  } else {
    result = await await axios.get(`/api/users/${props.username}/prs`, config)
  }
  return result.data
}

export default { getAll }
