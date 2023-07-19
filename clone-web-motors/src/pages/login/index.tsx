import {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../serevices/firebaseConnection";

import toast from 'react-hot-toast'

const schema = z.object({
  email: z
    .string()
    .email("Insira um e-mail válido")
    .nonempty("O campo e-mail é obrigatório"),
  password: z.string().nonempty("Digite uma senha"),
});

type FormData = z.infer<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(()=>{
    async function handleLogout() {
      await signOut(auth)
    }
    handleLogout()
  },[])

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() => {
      toast.success('Entrando')
        navigate("/dashboard", { replace: true });
      })
      .catch((e: any) => {
        toast.error('Login ou senha incorretos')
      });
  }

  return (
    <Container>
      <div className=" w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link className="mb-6 max-w-sm w-full" to="/">
          <img className="w-full" src={logoImg} alt="logo do site" />
        </Link>

        <form
          className="bg-white max-w-xl rounded-lg w-full p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium "
            type="submit"
          >
            Acessar
          </button>
        </form>

        <Link to="/register">
          Não possui uma conta? <b className="text-red-600">Cadastre-se</b>
        </Link>
      </div>
    </Container>
  );
}

export { Login };
