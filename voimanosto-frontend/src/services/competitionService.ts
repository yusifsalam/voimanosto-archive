import axios from 'axios'

interface getCompetitionProps {
  username: String
  token: String
  type: String
}

const getCompsByType = async (props: getCompetitionProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const result = await axios.get(
    `/api/users/${props.username}/competitions/${props.type}`,
    config
  )

  return result.data
}

export default { getCompsByType }
