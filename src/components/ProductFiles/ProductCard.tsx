import type { IProduct } from "../../types/product"
import type { ICart } from "../../types/cart";
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router";

interface ProductCardProps {
    product: IProduct;
    addToCart?: (product: IProduct) => void;
    cart?: ICart;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, cart }) => {
    const { removeFromCart } = useCartStore();
    const isInCart = cart?.products.some(p => p._id === product._id);
    const hasImages = product.images?.length > 0;
    return (
        <>
            <Link
                key={product._id}
                className="group border h-[20rem] pb-2 shadow-md hover:shadow-neutral-400 duration-300 flex flex-col"
                to={`/products/${product._id}`}
            >
                <div className="relative group h-64">
                    {hasImages ? (
                        <>
                            <div>
                                <img
                                    src={`${product.images[0].url}`}
                                    alt={`${product.name}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">Sin imagen</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col px-4 pt-2 font-bigshoulders">
                    <div>
                        <h3 className="font-semibold text-lg mb-1">
                            {product.name}
                        </h3>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-auto">
                        <p className="font-bold text-[#e4a921] text-lg">
                            ${product.price}
                        </p>
                        {/* Botón carrito */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isInCart) {
                                    removeFromCart(product._id);
                                } else {
                                    addToCart!(product);
                                }
                            }}
                            disabled={!product.available}
                            className={`
                            transition-all duration-300 
                            ${!product.available
                                    ? "cursor-auto"
                                    : "cursor-pointer"
                                }`
                            }
                        >
                            <span
                                className={`
                                material-symbols-outlined 
                                transition-all duration-300
                                ${!product.available
                                        ? "text-gray-600 hover:text-gray-600"
                                        : isInCart
                                            ? " text-red-700"
                                            : " text-lime-700"
                                    }
                            `}
                            >
                                {isInCart
                                    ?
                                    "remove_shopping_cart"
                                    : "add_shopping_cart"}
                            </span>
                        </button>

                    </div>

                </div>

            </Link>

        </>
    )
}