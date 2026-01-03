import { useEffect } from "react";
import { ProductsList } from "../components/ProductFiles/ProductsList";
import { useCategoryStore } from "../store/useCategoryStore";
import { useProductStore } from "../store/useProductStore";
import { useParams } from "react-router";

export const CategoryScreen = () => {

  const { _id } = useParams();
  const categoryId = _id || "all";

  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // si es /categories/all → mostrar todos los productos
  if (categoryId === "all") {
    return (
      <div className="overflow-visible">
        <div className="text-center text-4xl font-rubik mb-8 mt-6">
          Todos los productos
        </div>

        <ProductsList products={products} />
      </div>
    );
  }

  const category = categories.find(c => c._id === categoryId);

  return (
    <div className="overflow-visible">
      <div className="text-center text-4xl font-rubik mb-8 mt-6">
        {category?.name}
      </div>

      {category?.products && (
        <ProductsList products={category.products} />
      )}
    </div>
  );
};

export default CategoryScreen;
