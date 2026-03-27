import { useParams } from "react-router";
import { useProductStore } from "../store/useProductStore";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

export const ProductScreen = () => {
  const { _id } = useParams();
  const { product, getProductById } = useProductStore();
  const { products, addToCart } = useCartStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isInCart = product
    ? products.some((p) => p._id === product._id)
    : false;

  useEffect(() => {
    if (_id) {
      getProductById(_id);
    }
  }, [_id]);
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  if (!_id) return <p>ID inválido</p>;
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
      <div className="mx-10 sm:mx-20 mt-10">
        <div className=" text-4xl">
          {product.name}
        </div>
        <div className="text-3xl">
          ${product.price}
        </div>
        <div className="text-2xl mt-2">
          {product.description}
        </div>

        {/* Botón carrito */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart!(product);
          }}
          disabled={!product.available}
          className={`flex items-center justify-center w-full h-10 rounded-md bg-neutral-900 my-6 transition-all duration-300 text-white
              ${isInCart
              ? "cursor-auto  bg-zinc-600"
              : "cursor-pointer"
            }`
          }
        >
          Agregar al carrito
          <span className="material-symbols-outlined text-base ml-2">
            add
          </span>

        </button>
      </div>
    </div>
  );
};