import { useState } from "react";
import type { IProduct } from "../../types/product"
import type { ICart } from "../../types/cart";
import { useCartStore } from "../../store/useCartStore";

interface ProductCardProps {
    product: IProduct;
    addToCart?: (product: IProduct) => void;
    cart?: ICart;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, cart }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { removeFromCart } = useCartStore();

    const hasImages = product.images && product.images.length > 0;
    const hasMultipleImages = product.images && product.images.length > 1;
    const isInCart = cart?.products.some(p => p._id === product._id);

    const handlePrevImage = (e: React.MouseEvent) => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = (e: React.MouseEvent) => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <div
                key={product._id}
                className="group border rounded-lg h-[20rem] pb-2 shadow-md hover:shadow-neutral-400 duration-300 flex flex-col"
            >
                <div className="relative group h-64">
                    {hasImages ? (
                        <>
                            <div className="absolute inset-0">
                                {product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img.url}
                                        alt={`${product.name} - imagen ${index + 1}`}
                                        className={`absolute rounded-t-lg inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out
                      ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
                                    />
                                ))}
                            </div>

                            {hasMultipleImages && (
                                <>
                                    {/* Botones de navegación */}
                                    <div className="mx-2 absolute inset-0 flex items-center justify-between">
                                        <button
                                            onClick={handlePrevImage}
                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg
                                            hover:bg-gray-100"
                                            aria-label="Imagen anterior"
                                        >
                                            <span className="material-symbols-outlined text-black">
                                                chevron_left
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleNextImage}
                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg
                                            hover:bg-gray-100"
                                            aria-label="Imagen siguiente"
                                        >
                                            <span className="material-symbols-outlined text-black">
                                                chevron_right
                                            </span>
                                        </button>
                                    </div>

                                    {/* Indicadores de posición */}
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 ">
                                        {product.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    setCurrentImageIndex(index);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 
                                                    ${index === currentImageIndex
                                                        ? 'bg-white w-6'
                                                        : 'bg-white/50 hover:bg-white/75 '
                                                    }`}
                                                aria-label={`Ver imagen ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Contador de imágenes */}
                                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                        {currentImageIndex + 1} / {product.images.length}
                                    </div>
                                </>
                            )}
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
                            onClick={
                                isInCart
                                    ? () => removeFromCart(product._id)
                                    : () => addToCart!(product)
                            }
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
                                            ? "text-gray-700 hover:text-red-700"
                                            : "text-gray-700 hover:text-lime-600"
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

            </div>

        </>
    )
}