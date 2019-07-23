/// <reference types="react-scripts" />

type IUser = {
  name: string
  username: string
  avatar: string
  email: string
  token: string
  loggedIn: boolean
}

interface IBodyweight {
  date: Date
  bodyweight: number
  id: string
}

interface IBodyweightProps {
  data: IBodyweight[]
}

interface IBodyweightTableProps {
  data: IBodyweight[]
  setData: (data: IBodyweight[]) => void
}
