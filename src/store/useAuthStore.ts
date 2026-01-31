import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    admin: {
        id: string;
        email: string;
    } | null
    login: (token: string, admin: { id: string, email: string }) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
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
            }
        }),
        {
            name: "admin-auth",
        }
    )
);