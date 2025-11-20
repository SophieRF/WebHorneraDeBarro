import type React from "react";
import type { ICategory } from "../../types/category";

interface MenuProductosProps {
  categories: ICategory[];
  visible: boolean;
}

export const MenuProductos: React.FC<MenuProductosProps> = ({ 
  categories, visible }) => {
  return (
    <div className={`transition-all duration-500 md:duration-300
      ${visible ? "opacity-100 scale-100 " : "opacity-0 scale-95 pointer-events-none"}
      ${visible ? "max-h-[500px]" : "max-h-0 overflow-hidden"} 
      md:absolute md:overflow-visible md:max-h-none
      `}>
      {/*Flechita*/}
      <div className="md:py-2">
        <div className="md:w-4 md:h-4 md:left-3 absolute md:mt-0.5 bg-[#fff] md:rotate-45"></div>
      </div>

      {/*Nombre Categoría*/}
      <ul className="grid grid-cols-2 md:gap-x-14 gap-y-4 bg-[#fff] md:p-4 md:pl-6 md:mt-0
      [@media(min-width:760px)_and_(max-width:974px)]:gap-x-8 pr-0">
        {categories.map((category) =>(
          <li key={category.id}> 
            <a className="capitalize text-lg text-zinc-700 duration-200 hover:text-[#f0be4b]" href={category.link}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
