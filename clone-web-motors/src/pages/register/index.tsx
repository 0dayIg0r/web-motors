import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../serevices/firebaseConnection";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

const schema = z.object({
  name: z.string().nonempty("Digite seu nome"),
  email: z
    .string()
    .email("Insira um e-mail válido")
    .nonempty("O campo e-mail é obrigatório"),
  password: z
    .string()
    .min(6, "A senha precisa conter no mínimo 6 caracteres")
    .nonempty("Digite uma senha"),
});

type FormData = z.infer<typeof schema>;

function Register() {
  const navigate = useNavigate()
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

 async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=>{
      await updateProfile(user.user, {
        displayName: data.name
      })
      navigate('/dashboard', {replace: true})
    })
    .catch((e: any) =>{
      console.log(e.message)
    })
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
              type="text"
              placeholder="Digite seu nome completo"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
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
            Cadastrar
          </button>
        </form>

        <Link to="/login">
          Já possui uma conta? Faça o <b className="text-red-600">login</b>
        </Link>
      </div>
    </Container>
  );
}

export { Register };
