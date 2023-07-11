import { ReactNode } from "react"
//COMPONENTE PARA CENTRALIZAR CONTEÚDO COM O HEADER
function Container({children}: {children: ReactNode}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
        {children}
    </div>
  )
}

export {Container}