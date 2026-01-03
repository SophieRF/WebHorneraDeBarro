import type { FC } from "react"
import type { IProduct } from "../../types/product"
import { Link } from "react-router";

interface FeaturedProductCardProps {
    product: IProduct
}

export const FeaturedProductCard: FC<FeaturedProductCardProps> = ({ product }) => {

    const imageUrl = product.images?.[0]?.url ?? "/placeholder.png";

    return (
        <Link
            to={`/products/${product._id}`}
            className="
                rounded-sm
                overflow-hidden 
            "
        >
            {/* Imagen */}
            <img
                className="w-full h-80 object-cover hover:scale-110 transition-all duration-500"
                src={imageUrl}
                alt={product.name}
            />
        </Link>
    );
};
