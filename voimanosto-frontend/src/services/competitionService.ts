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

interface addCompProps {
  username: String
  token: String
  date: Date
  type: String
  name: String
  venue: String
  squat: Number
  bench: Number
  deadlift: Number
  ipf: Number
  wilks: Number
  bodyweight: Number
}

const addComp = async (props: addCompProps) => {
  const config = {
    headers: { Authorization: `bearer ${props.token}` }
  }
  const res = await axios.post(
    `/api/users/${props.username}/competitions`,
    props,
    config
  )
  return res.data
}

export default { getCompsByType, addComp }
