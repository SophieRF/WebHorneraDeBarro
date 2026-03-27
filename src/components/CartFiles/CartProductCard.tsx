import type { IProduct } from "../../types/product"
import { useCartStore } from "../../store/useCartStore";
import { Link } from "react-router";

interface CartProductCardProps {
  product: IProduct;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {

  const { removeFromCart } = useCartStore();

  const imageUrl = product.images?.[0]?.url ?? "/placeholder.png";

  return (
    <Link
      className="flex flex-col items-center"
      to={`/products/${product._id}`}>
      <div
        key={product._id}
        className="
        w-9/12
        sm:w-9/12
        md:w-9/12
        lg:w-8/12 
        border rounded-lg shadow-md hover:shadow-neutral-400 duration-300 h-24 sm:min-h-40 flex sm:flex-row mx-6"
      >
        <div className="relative group sm:w-40 h-full sm:h-auto">

          <img
            className="sm:w-36 sm:h-full w-28 h-full object-cover"
            src={imageUrl}
            alt={product.name}
          />

        </div>
        <div className="px-4 py-2 font-bigshoulders flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="font-normal text-xl sm:text-2xl md:text-3xl mb-2">
              {product.name}
            </h3>

            <p className="hidden sm:block text-zinc-600 text-lg md:text-xl mb-3 truncate">
              {product.description}
            </p>
          </div>

          <div className=" flex flex-row items-center justify-end mt-4 gap-2 lg:gap-4">
            <p className="font-bold text-neutral-800 text-lg md:text-xl">
              ${product.price}
            </p>

            <button
              className="h-6"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeFromCart(product._id);
              }}>
              <span className="material-symbols-outlined text-red-600 hover:text-red-800 transition-all duration-300">
                delete
              </span>
            </button>
          </div>

        </div>
      </div>
    </Link>
  )
}
