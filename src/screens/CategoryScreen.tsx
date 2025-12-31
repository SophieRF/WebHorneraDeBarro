import { useParams } from "react-router";
import type { ICategory } from "../types/category";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsList } from "../components/ProductFiles/ProductsList";

export const CategoryScreen = () => {
  const { _id } = useParams();

  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    if (_id) {
      axios
        .get(`http://localhost:5100/categories/${_id}`)
        .then((res) => setCategory(res.data))
        .catch((error) =>
          console.error("Error al traer la categoría", error)
        );
    }
  }, [_id]);
  
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
