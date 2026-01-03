import axios from "axios";
import { create } from 'zustand'
import type { ICategory } from "../types/category";

interface CategoryState {
    categories: ICategory[],
    fetchCategories: () => Promise<void>;
    getAllCategories: () => ICategory[];
    //addToCategory: (product: IProduct) => void
    //removeFromCategory: (productId: string) => void
    //getTotalProducts: () => number
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],

    fetchCategories: async () => {
        try {
            const res = await axios.get("http://localhost:5100/categories");

            set({ categories: res.data });
        } catch (error) {
            console.error("Error al traer las categorias:", error);
        }
    },

    getAllCategories: () => {
        return get().categories
    },

}))
