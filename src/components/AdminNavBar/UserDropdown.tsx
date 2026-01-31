import type { FC } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface UserDropdownProps {
    open: boolean;
}

export const UserDropdown: FC<UserDropdownProps> = ({ open }) => {
    const logout = useAuthStore((state) => state.logout);

    return (
        <div
            className={`relative transition-all duration-200 ease-out
  ${open
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}>

            {/* Dropdown */}
            <div
                className="absolute right-0 mt-3 w-56
    bg-white rounded-md shadow-lg border border-gray-200
    flex flex-col py-2 text-sm text-gray-800"
            >

                <div
                    className="flex items-center justify-between px-4 py-2
      hover:bg-gray-50 cursor-pointer"
                >
                    <span className="font-medium">Administrador</span>
                    <span className="material-symbols-outlined text-base text-gray-500">
                        edit
                    </span>
                </div>

                <div className="h-px bg-gray-200 my-1" />

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

    );
};
