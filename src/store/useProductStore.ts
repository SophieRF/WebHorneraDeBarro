import axios from "axios";
import type { IProduct } from "../types/product";
import { create } from 'zustand'

interface ProductState {
    products: IProduct[];
    product: IProduct | null;
    fetchProducts: () => Promise<void>;
    getAllProducts: () => IProduct[];
    getProductById: (_id:string) => Promise<void>;
    getFeaturedProducts: () => IProduct[];
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    product: null,

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

    getProductById: async(_id:string) => {
        try {
            const res = await axios.get(`http://localhost:5100/products/${_id}`);
            set({product: res.data});
        } catch (error) {
            console.error("Error al traer el producto: ", error);
        }
    },

    getFeaturedProducts: () => {
        return get().products.filter(p => p.isFeatured === true);
    }
}))
