import axios from "axios";
import type { IProduct } from "../types/product";
import { create } from 'zustand'

interface ProductState {
    products: IProduct[];
    fetchProducts: () => Promise<void>;
    getAllProducts: () => IProduct[];
    getFeaturedProducts: () => IProduct[];
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],

    fetchProducts: async () => {
        try {
            const res = await axios.get("http://localhost:5100/products");

            set({ products: res.data }); 
        } catch (error) {
            console.error("Error al traer productos:", error);
        }
    },

    getAllProducts: () => {
        return get().products
    },

    getFeaturedProducts: () => {
        return get().products.filter(p => p.isFeatured === true);
    }
}))
