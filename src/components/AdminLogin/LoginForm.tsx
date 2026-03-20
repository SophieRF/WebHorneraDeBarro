import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange"
  })

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login)

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5100/admin/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data;

      login(result.token, result.admin);
      navigate("/admin");

    } catch (error) {
      console.error(error);
      alert("Email o contraseña incorrectos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-6 lg:gap-6 w-96 ">
      <div>
        <p>Email</p>
        <input
          {...register("email", {
            required: "Email requerido",
            pattern: {
              value: /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/,
              message: "Email inválido"
            },
            minLength: {
              value: 6,
              message: "Mínimo 6 caracteres",
            },
            maxLength: {
              value: 200,
              message: "Máximo 200 caracteres"
            },
          })}
          className={`p-2 outline-2 rounded border focus:outline-primary w-full cursor-pointer ${errors.email
            ? "border-red-500 outline-red-500 focus:outline-red-500"
            : ""
            }`}
          type="email"
          name="email"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2 ml-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative">
        <p>Contraseña</p>
        <input
          {...register("password", {
            required: "Contraseña requerida",
            minLength: {
              value: 8,
              message: "Mínimo 8 caracteres",
            },
            maxLength: {
              value: 80,
              message: "Máximo 80 caracteres",
            },
          })}
          className={`mb-2 p-2 outline-2 rounded border focus:outline-primary w-full cursor-pointer ${errors.password
            ? "border-red-500 outline-red-500 focus:outline-red-500"
            : ""
            }`}
          autoComplete="current-password"
          placeholder="Contraseña"
          type={showPassword ? "text" : "password"}
        />

        <button
          onClick={() => setShowPassword(prev => !prev)}
          aria-label={
            showPassword
              ? "Ocultar contraseña"
              : "Mostrar contraseña"
          }
          type="button"
          className="cursor-pointer absolute right-4 top-[20px] transform translate-y-3"
        >
          {showPassword
            ? <span className="material-symbols-outlined">
              visibility
            </span>
            : <span className="material-symbols-outlined">
              visibility_off
            </span>}
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm mt-2 ml-1">
            {errors.password?.message}
          </p>
        )}
      </div>
      <button
        className="btn bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 w-2/3 h-12 mt-6 self-center rounded"
        type="submit">
        Ingresar
      </button>

    </form>
  )
}
