import { ReactNode, createContext, useState, useEffect} from 'react'
import { auth } from '../serevices/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'

interface AuthProviderProps{
    children: ReactNode
}

type AuthContextData = {
    signed: boolean,
    loadingAuth: boolean
}

interface UserProps {
    uid: string,
    name: string | null,
    email: string | null
}

export const AuthContex = createContext({ } as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [ user, setUser] = useState<UserProps | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })
                setLoadingAuth(false)
            } else{
                setUser(null)
                setLoadingAuth(false)
            }
        })

        return () => {
            unsub()
        }
    },[])

    return(
        <AuthContex.Provider 
        value={{
            signed: !!user,
            loadingAuth, 
        }}>
            {children}
        </AuthContex.Provider>
    )

}

export default AuthProvider