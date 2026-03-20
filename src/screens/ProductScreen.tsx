import { useParams } from "react-router";
import { useProductStore } from "../store/useProductStore";
import { useEffect, useState } from "react";

export const ProductScreen = () => {
  const { _id } = useParams();
  const { product, getProductById } = useProductStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (_id) {
      getProductById(_id);
    }
  }, [_id, getProductById]);

  if (!product) return <p>Cargando...</p>;

  const hasImages = product.images?.length > 0;
  const hasMultipleImages = product.images?.length > 1;

  return (
    <div>
      <div className="hidden sm:flex sm:flex-row gap-3 sm:w-[410px] sm:h-[400px] mt-14 mx-auto">

        {/* Imagenes a la izquierda */}
        {hasImages && hasMultipleImages && (
          <div className="flex sm:flex-col gap-2 overflow-y-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-28 rounded border overflow-hidden transition cursor-pointer
                  ${index === currentImageIndex
                    ? "border-stone-200"
                    : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Imagen principal */}
        <div className="relative flex-1 overflow-hidden group">
          {hasImages ? (
            <>
              {/* Imágenes */}
              <div className="absolute inset-0">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${product.name} - imagen ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                    ${index === currentImageIndex
                        ? "opacity-100"
                        : "opacity-0"
                      }`}
                  />
                ))}
              </div>

              {/* Contador */}
              {hasMultipleImages && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )
          }
        </div>
      </div>

      {/* MOBILE LAYOUT */}

      <div className="sm:hidden flex flex-col gap-3 w-[300px] h-[480px] mt-10 mx-auto">
        {/* Imagen principal */}
        <div className="relative flex-1 overflow-hidden group">
          {hasImages ? (
            <>
              {/* Imágenes */}
              <div className="absolute inset-0">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${product.name} - imagen ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                    ${index === currentImageIndex
                        ? "opacity-100"
                        : "opacity-0"
                      }`}
                  />
                ))}
              </div>

              {/* Contador */}
              {hasMultipleImages && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )
          }
        </div>
        {/* Imagenes debajo */}
        {hasImages && hasMultipleImages && (
          <div className="flex gap-2 overflow-y-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-28 rounded border overflow-hidden transition cursor-pointer
                  ${index === currentImageIndex
                    ? "border-stone-200"
                    : "border-transparent opacity-60 hover:opacity-100"
                  }`}
              >
                <img
                  src={image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};