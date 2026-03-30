import { useEffect } from "react"
import { useCategoryStore } from "../../store/useCategoryStore"
import { CategoryCard } from "./CategoryCard";

export const CategoryList = () => {

    const { fetchCategories, categories } = useCategoryStore();
    const featured = categories.filter(category => category.isFeatured);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 px-0">

            <div className="w-full h-full">
                {featured[0] && (
                    <CategoryCard 
                        category={featured[0]}
                        size="large"
                    />
                )}
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-4">

                {featured[1] && (
                    <CategoryCard 
                        category={featured[1]}
                        size="small"
                    />
                )}

                {featured[2] && (
                    <CategoryCard 
                        category={featured[2]}
                        size="small"
                    />
                )}

                <div className="col-span-2">
                    {featured[3] && (
                        <CategoryCard 
                            category={featured[3]}
                            size="wide"
                        />
                    )}
                </div>
            </div>

        </div>
    );
}
