import { LoginForm } from "../components/AdminLogin/LoginForm"

export const Login = () => {
  return (
    <div className="mt-16 place-self-center rounded-md bg-yellow-100 py-10 px-8">
      <h1 className="text-3xl text-center">
        Iniciar Sesión
        </h1>
        <LoginForm/>
    </div>
  )
}
