import axios from 'axios'

interface getPRProps {
  username: string
  token: string
  type?: string
  name?: string
  current: string
}

const getAll = async (props: getPRProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  let result
  if (props.type) {
    if (props.name) {
      result = await axios.get(
        `/api/users/${props.username}/prs/${props.type}/${props.name}/${
          props.current
        }`,
        config
      )
    } else {
      result = await axios.get(
        `/api/users/${props.username}/prs/${props.type}/${props.current}`,
        config
      )
    }
  } else {
    result = await await axios.get(
      `/api/users/${props.username}/prs/${props.current}`,
      config
    )
  }
  return result.data
}

export default { getAll }
