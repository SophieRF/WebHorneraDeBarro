import type React from "react";
import type { ICategory } from "../../types/category";
import { Link } from "react-router-dom";

interface MenuProductosProps {
  visible: boolean;
  onClose: () => void;
  categories: ICategory[];
}

export const MenuProductos: React.FC<MenuProductosProps> = ({ visible, onClose, categories }) => {

  return (
    <div className={`flex justify-start transition-all duration-500 md:duration-300 items-center
      ${visible ? "opacity-100 scale-100 " : "opacity-0 scale-95 pointer-events-none"}
      ${visible ? "max-h-[500px]" : "max-h-0 overflow-hidden"} 
      md:absolute md:overflow-visible md:max-h-none
      `}>
      {/*Flechita*/}
      <div className="md:py-2">
        <div className="md:w-4 md:h-4 md:left-3 absolute md:mt-0.5 bg-[#fff] md:rotate-45"></div>
      </div>

      {/*Contenido*/}
      <ul className="rounded-sm bg-[#fff] md:p-8 md:mt-0
      [@media(min-width:760px)_and_(max-width:974px)]:gap-x-8 pr-0">
        <div className="flex flex-col">
          <li className="hidden md:block">
              <Link
                to="/categories/all"
                onClick={onClose}
                className="flex items-center gap-2 mb-4">
                <p className="text-xl">
                  PRODUCTOS
                </p>
                <p className="text-zinc-800">
                  (ver todo)
                </p>
              </Link>

            <hr className="border-zinc-500 mt-3 mb-6" />

          </li>
          <div className="grid grid-cols-2 md:gap-x-14 gap-y-4">
            {categories.map((category) => (
              <li key={category._id}>
                <Link
                  className="capitalize text-lg text-zinc-800 duration-500 hover:text-[#f0be4b]"
                  to={`/categories/${category._id}`}
                  state={{ category }}
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </div>

        </div>
      </ul>
    </div>
  )
}
