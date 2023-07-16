import { ReactNode, createContext, useState, useEffect} from 'react'

interface AuthProviderProps{
    children: ReactNode
}

type AuthContextData = {
    signed: boolean,
}

interface UserProps {
    uid: string,
    name: string | null,
    email: string | null
}

export const AuthContex = createContext({ } as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [ user, setUser] = useState<UserProps | null>(null)
    return(
        <AuthContex.Provider 
        value={{
            signed: !!user
        }}>
            {children}
        </AuthContex.Provider>
    )

}

export default AuthProvider