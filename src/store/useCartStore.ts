import type { IProduct } from "../types/product";
import { create } from 'zustand'

interface CartState {
    products: IProduct[],
    addToCart: (product: IProduct) => void
    removeFromCart: (productId: string) => void
    clearCart: () => void
    getTotalProducts: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
    products: [],

    addToCart: product => {
        set(state => {
            const productExists = state.products.find(p => p._id === product._id);

            if (productExists) {
                return state;
            }
            else {
                return {
                    products: [...state.products, product]
                }
            }
        })
    },

    removeFromCart: (productId: string) => {
        set(state => ({
            products: state.products.filter(p => p._id !== productId)
        }))
    },

    clearCart: () => {
        set(({
            products: [] 
        }))
    },

    getTotalProducts: () => {
        return get().products.length
    },

    getTotalPrice: () => {
        return get().products.reduce((total, product) => total + product.price, 0)
    }
}))
