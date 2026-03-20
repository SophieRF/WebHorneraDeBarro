import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Admin {
    id: string;
    email: string;
}
interface UpdateAdminData {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

interface AuthState {
    token: string | null;
    admin: Admin | null
    login: (token: string, admin: { id: string, email: string }) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
    updateAdmin: (data: UpdateAdminData) => Promise<void>;
}

export const useAuthStore = create(
    persist<AuthState>(
        (set, get) => ({
            token: null,
            admin: null,

            login: (token, admin) => {
                set({ token, admin, });
            },

            logout: () => {
                set({ token: null, admin: null });
            },

            verifyToken: async () => {
                const token = get().token;
                if (!token) throw new Error("no hay token");
                try {
                    await axios.get("http://localhost:5100/admin/verificar", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch {
                    get().logout();
                    throw new Error("Token inválido");
                }
            },
            updateAdmin: async (data: UpdateAdminData) => {
                const { token } = get();

                if (!token) throw new Error("Usuario no autenticado");

                try {
                    const response = await axios.put(
                        "http://localhost:5100/admin/cambiar-usuario",
                        data,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    set({
                        token: response.data.token,
                        admin: response.data.admin
                    });
                    
                } catch (error) {
                    console.error("Error al actualizar usuario: ", error);
                    throw error;
                }
            }
        }),
        {
            name: "admin-auth",
        }
    )
);