import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import { FeaturedProductCard } from "./FeaturedProductCard"

export const FeaturedProductList = () => {

    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto no-scrollbar py-4">
                {products.map(product => (
                    product.isFeatured && <FeaturedProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
    )
}
