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

interface IExercise {
  type: String
  name: String
  variation: String
  prs: IPR[]
}

interface IExerciseInstance {
  exercise: IExercise
  reps: Number
  sets: Number
  weight: Number
  intensity: Number
  RPE: Number
  isPR: boolean
}

interface IPR {
  date: Date
  reps: Number
  weight: Number
  exercise: IExercise
  _id?: string
}

interface ICompetitionResult {
  squat: Number
  bench: Number
  deadlfit: Number
  ipf: Number
  wilks: Number
}

interface ICompetition {
  date: Date
  type: String
  name: String
  venue: String
  result: ICompetitionResult
  bodyweight: Number
}

interface IWorkout {
  date: Date
  exercises: IExerciseInstance[]
}
