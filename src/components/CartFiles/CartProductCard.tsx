import { useState, type FC } from "react"
import type { IProduct } from "../../types/product"
import { useCartStore } from "../../store/useCartStore";

interface CartProductCardProps {
  product: IProduct;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { removeFromCart } = useCartStore();

  const hasImages = product.images && product.images.length > 0;
  const hasMultipleImages = product.images && product.images.length > 1;

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
    <div className="flex flex-col items-center">
      <div
        key={product._id}
        className="
        w-8/12
        sm:w-10/12
        md:w-10/12
        lg:w-8/12 
        border rounded-lg shadow-md hover:shadow-neutral-400 duration-300 h-full flex flex-col sm:flex-row mx-6"
      >
        <div className="relative group w-full sm:w-40 h-40 sm:h-auto">
          {hasImages ? (
            <>
              <div className="absolute inset-0">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${product.name} - imagen ${index + 1}`}
                    className={`absolute rounded-s-md inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out
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
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-full 
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
                      className="w-6 h-6 flex items-center justify-center bg-white rounded-full 
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
        <div className="px-4 py-2 font-bigshoulders flex flex-col justify-between flex-1">

          <div>
            <h3 className="font-normal text-2xl md:text-3xl mb-2">
              {product.name}
            </h3>

            <p className="text-zinc-600 text-lg md:text-xl mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex flex-row items-center justify-end mt-4 gap-2 lg:gap-4">
            <p className="font-bold text-[#f0be4b] text-lg md:text-xl">
              ${product.price}
            </p>

            <button
              className="h-6"
              onClick={() => removeFromCart(product._id)}>
              <span className="material-symbols-outlined hover:text-red-600 transition-all duration-300">
                delete
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
