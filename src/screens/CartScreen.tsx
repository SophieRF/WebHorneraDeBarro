import { CartProductCard } from "../components/CartFiles/CartProductCard";
import { useCartStore } from "../store/useCartStore";

export const CartScreen = () => {

  const { products } = useCartStore();

  return (
    <>
      <div className="pb-10 ">
        <div className="text-center text-4xl font-rubik mb-8 mt-6 ">
          Mi Carrito
        </div>
        <div className="flex flex-col gap-4">
          {products.map(product =>

            <CartProductCard product={product} />

          )}
        </div>
      </div>
    </>
  )
}
