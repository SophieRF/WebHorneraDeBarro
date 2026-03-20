import { useState, type FC } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { EditAdminModal } from "../Modals/EditAdminModal";

interface UserDropdownProps {
    open: boolean;
}

export const UserDropdown: FC<UserDropdownProps> = ({ open }) => {
    const logout = useAuthStore((state) => state.logout);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div
                className={`relative transition-all duration-200 ease-out
  ${open
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}>

                {/* DROPDOWN */}
                <div
                    className="absolute right-0 mt-4 w-56
    bg-white rounded-md shadow-lg border border-gray-200
    flex flex-col py-2 text-sm text-gray-800"
                >
                    {/*Editar Admin*/}
                    <button
                        className="flex items-center justify-between px-4 py-2
      hover:bg-gray-50 cursor-pointer"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                    >
                        <span className="font-medium">Administrador</span>
                        <span className="material-symbols-outlined text-base text-gray-500">
                            edit
                        </span>
                    </button>

                    <div className="h-px bg-gray-200 my-1" />

                    {/*Cerrar Sesión*/}
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2
      text-red-600 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined text-base">
                            logout
                        </span>
                        Cerrar sesión
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <EditAdminModal onClose={() => setIsModalOpen(false)} admin={{
                    id: "",
                    email: ""
                }} />
            )}
        </div>
    );
};
