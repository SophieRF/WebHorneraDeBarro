import { Link, useNavigate } from "react-router";
import { CartProductCard } from "../components/CartFiles/CartProductCard";
import { useCartStore } from "../store/useCartStore";

export const CartScreen = () => {

  const { products, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  return (
    <>
      {products.length > 0
        ? <div className="pb-10 ">
          <div className="text-center text-4xl font-rubik mb-8 mt-6 text-neutral-900">
            Mi Carrito
          </div>
          <div className="flex flex-col gap-4">
            {products.map(product =>

              <CartProductCard product={product} />

            )}
          </div>
          {
            products.length > 0
            && <div className="flex justify-center mt-10">
              <div
                className="
                w-8/12
                sm:w-9/12
                md:w-9/12
                lg:w-8/12
                flex flex-row justify-end gap-2"
              >
                <p className="text-3xl">
                  Total:
                </p>
                <p className="text-3xl">
                  ${getTotalPrice()}
                </p>
              </div>
            </div>
          }
          <div className="flex flex-col items-center">
            <Link
              to={"/shop"}
              className="
                w-9/12
                md:w-9/12
                lg:w-8/12
                h-10 
                md:h-11 rounded-md bg-neutral-900 mt-10 mb-4 mx-14 flex items-center justify-center text-center text-white md:text-lg"
            >
              Iniciar compra
            </Link>
            <button
              className="underline"
              onClick={() => navigate("/categories/all")}
            >
              Seguir comprando
            </button>
          </div>
        </div>
        :
        <div className="flex flex-col items-center">
          <p className="text-3xl font-rubik mb-8 mt-32 ">
            Carrito vacío
          </p>
          <Link
            to={"/categories/all"}>
            <span className="material-symbols-outlined text-3xl hover:text-4xl hover:text-lime-700 transition-all duration-300">
              add_shopping_cart
            </span>
          </Link>
        </div>
      }

    </>
  )
}
