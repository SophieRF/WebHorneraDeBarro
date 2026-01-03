import { Link } from "react-router";
import { CartProductCard } from "../components/CartFiles/CartProductCard";
import { useCartStore } from "../store/useCartStore";

export const CartScreen = () => {

  const { products, getTotalPrice } = useCartStore();

  return (
    <>
      {products.length > 0
        ? <div className="pb-10 ">
          <div className="text-center text-4xl font-rubik mb-8 mt-6 ">
            Mi Carrito
          </div>
          <div className="flex flex-col gap-4">
            {products.map(product =>

              <CartProductCard product={product} />

            )}
          </div>
          {
            products.length > 0 && <div className="flex justify-center mt-6">
              <div
                className="
      w-8/12
      sm:w-10/12
      md:w-10/12
      lg:w-8/12
      flex flex-row justify-end gap-2
    "
              >
                <p className="font-bigshoulders text-3xl">
                  Total:
                </p>
                <p className="font-bigshoulders text-3xl text-amber-950">
                  ${getTotalPrice()}
                </p>
              </div>
            </div>
          }
        </div>
        :
        <div className="flex flex-col items-center">
          <p className="text-3xl font-rubik mb-8 mt-32 ">
            Carrito vacío
          </p>
          <Link
            to={"/categories/6942a4133b9de7771025af77"}>
            <span className="material-symbols-outlined text-3xl hover:text-4xl hover:text-lime-700 transition-all duration-300">
              add_shopping_cart
            </span>
          </Link>
        </div>
      }

    </>
  )
}
