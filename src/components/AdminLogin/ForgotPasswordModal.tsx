import type { FC } from "react";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

export const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({ onClose }) => {
  return (
    <div className="w-40 h-full">
      <button
        onClick={onClose}
        className="mt-4 text-sm text-gray-500 hover:underline"
      >
        Cerrar
      </button>
    </div>
  )
}
 