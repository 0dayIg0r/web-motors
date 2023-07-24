import { RegisterOptions, UseFormRegister } from "react-hook-form"
interface InputProps{
  type: string ,
  placeholder: string,
  name: string,
  register: UseFormRegister<any>
  error?: string,
  rules?: RegisterOptions
}
// INPUT UNCONTROLED - REACT HOOK FORM
function Input({name, placeholder, type, register, error, rules}: InputProps) {
  return (
    <div>
        <input
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name}
         />
         {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}
// ASSITIR AULA 76 A PARTIR DO MIN 8 E INSTALAR HOOK FORM
export {Input}