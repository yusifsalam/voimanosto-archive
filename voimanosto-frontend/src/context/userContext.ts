import { createContext } from 'react'

export const UserContext = createContext({
  user: {
    name: '',
    username: '',
    avatar: '',
    email: '',
    token: '',
    loggedIn: false
  },
  setUser: (user: IUser) => {}
})
