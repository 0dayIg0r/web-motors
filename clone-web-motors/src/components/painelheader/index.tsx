import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { auth } from "../../serevices/firebaseConnection"



function DashboardHeader() {

    async function handleLogout(){
       await signOut(auth) 
    }
    
  return (
    <div className="wfull items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4">
        <Link to='/dashboard'>
            Painel
        </Link>

        <Link to='/dashboard/new'>
            Novo carro
        </Link>

        <button onClick={handleLogout} className="ml-auto">
            Sair da conta
        </button>
    </div>
  )
}

export default DashboardHeader