import type { FC } from "react"
import type { ICategory } from "../../types/category"
import { Link } from "react-router";

interface CategoryCardProps {
    category: ICategory;
    size: "large" | "small" | "wide";
}

export const CategoryCard: FC<CategoryCardProps> = ({ category, size }) => {

    const sizeClasses = {
        large: "h-[350px] md:h-[570px]",
        small: "h-[180px] md:h-[290px]",
        wide: "h-[200px] md:h-[264px] w-full"
    };

    return (
        <Link
            to={`/category/${category._id}`}>
            <div className={`relative rounded-sm overflow-hidden ${sizeClasses[size]}`}>
                <img
                    src={`http://localhost:5100/static/categories/${category.image}`}
                    className="w-full h-full object-cover brightness-90 hover:brightness-100 hover:scale-110 transition-all duration-500"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-white text-2xl md:text-3xl font-bigshoulders">
                        {category.name}
                    </p>
                </div>
            </div>
        </Link>
    );
};
