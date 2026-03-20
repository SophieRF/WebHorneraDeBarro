import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

interface EditAdminModalProps {
  onClose: () => void;
  admin: {
    id: string;
    email: string;
  };
}

interface EditAdminForm {
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

export const EditAdminModal: FC<EditAdminModalProps> = ({ onClose, admin }) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      dirtyFields },
    reset,
    setError
  } = useForm<EditAdminForm>({
  });

  const updateAdmin = useAuthStore((state) => state.updateAdmin);

  const isDirty = Object.keys(dirtyFields).length > 0;

  const onSubmit = async (formData: EditAdminForm) => {
    if (!isDirty) return;

    const dataToSend = { ...formData };

    if (!dataToSend.currentPassword && !dataToSend.newPassword) {
      delete dataToSend.currentPassword;
      delete dataToSend.newPassword;
    }
    try {
      await updateAdmin(dataToSend);
      onClose();
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {

    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      setError("currentPassword", {
        type: "manual",
        message: message
      });
      return;
    }

    if (status === 400) {

      if (message === "Ese email ya está en uso") {
        setError("email", {
          type: "manual",
          message
        });
        return;
      }

      if (message === "Completa contraseña actual y nueva contraseña") {
        setError("currentPassword", {
          type: "manual",
          message
        });
        return;
      }

      if (message === "La contraseña debe tener al menos 8 caracteres") {
        setError("newPassword", {
          type: "manual",
          message
        });
        return;
      }
    }
  }

  console.error("Error al actualizar usuario: ", error);
}
  };

  useEffect(() => {
    if (admin) {
      reset({
        email: admin.email,
        currentPassword: "",
        newPassword: ""
      });
    }
  }, [admin, reset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay con blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-80 h-4/6 rounded-xl shadow-lg p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-2"
        >

          <label>Nuevo Email</label>
          <input
            type="email"
            {...register("email")}
            className="border p-2 rounded"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}

          <label>Contraseña actual</label>
          <input
            type="password"
            {...register("currentPassword")}
            className="border p-2 rounded"
          />
          {errors.currentPassword && (
            <span className="text-red-500 text-sm">
              {errors.currentPassword.message}
            </span>
          )}

          <label>Nueva contraseña</label>
          <input
            type="password"
            {...register("newPassword", {
              validate: (value, formValues) => {
                if (value && !formValues.currentPassword) {
                  return "Debes ingresar la contraseña actual";
                }
                return true;
              }
            })}
            className="border p-2 rounded"
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}

          <button
            type="submit"
            disabled={!isDirty}
            className="bg-amber-500 hover:bg-amber-400 transition-all duration-300 text-white py-2 mt-6 rounded disabled:opacity-50"
          >
            Guardar cambios
          </button>

        </form>
      </div>
    </div>
  );
};
