import {create} from "zustand"

interface IUserAuthStore {
    token: string | null
    userIsAuth: boolean
    setToken: (newToken: string | null) => void
    setUserIsAuth: (isAuth: boolean) => void
}
const UserAuthStore = create<IUserAuthStore>((set) => ({
    token: null,
    userIsAuth: false,
    setToken: (newToken) => set({token: newToken}),
    setUserIsAuth: (isAuth) => set({userIsAuth: isAuth})
}))
export default UserAuthStore