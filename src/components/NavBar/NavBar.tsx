import { useEffect, useState } from "react";
import { MenuProductos } from "./MenuProductos";
import { Link } from "react-router-dom";
import axios from "axios";
import type { ICategory } from "../../types/category";
import { useCartStore } from "../../store/useCartStore";

export const NavBar = () => {

  const [open, setOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5100/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.error("Error al traer las categorías", error));

  }, []);

  const { getTotalProducts } = useCartStore();


  return (
    <nav className="sticky top-0 left-0 w-full h-20 bg-[#fff] shadow-md shadow-[#cfb7a3] z-[50]">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <Link
            to={"/"}
          >
            Hornera De Barro
          </Link>
          {/*Menú desplegable */}
          <div className="hover:cursor-pointer text-3xl md:hidden z-[10000]"
            onClick={() => setOpen(!open)}>
            <span className="material-symbols-outlined text-3xl">
              {open ? "close" : "menu"}
            </span>
          </div>
        </div>
        <ul
          className="md:flex hidden items-center gap-8 font:[Poppins] ">
          <li>
            <Link
              className=" uppercase"
              to="/">
              Inicio
            </Link>
          </li>

          <li
            className="px-3 text-left md:cursor-pointer"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}>
            <button
              className="py-7 uppercase">

              Productos
            </button>
            <div>
              <MenuProductos
                categories={categories}
                visible={showProducts}
                onClose={() => {
                  setShowProducts(false);
                  setOpen(false);
                }}
              />
            </div>
          </li>

          <li className="px-3 text-left md:cursor-pointer">
            <div className="py-7 uppercase">
              Sobre mi
            </div>
          </li>
        </ul>

        {/*Botón Carrito*/}
        <Link
          to="/cart">
          <div
            className="relative w-10 h-10 flex justify-center items-center">
            <span className="material-symbols-outlined">
              shopping_cart
            </span>
            <span
              className={`
    absolute top-2/4 right-1/2
    bg-red-500 text-white text-sm w-5 h-5 rounded-full
    flex justify-center items-center
    transition-all duration-500 ease-in-out
    ${getTotalProducts() > 0 ? "opacity-100 scale-100" : "opacity-0 scale-0"}
  `}
            >
              {getTotalProducts() > 0 ? getTotalProducts() : ""}
            </span>
          </div>
        </Link>

        {/*Mobile Nav*/}
        <ul
          className={`
        md:hidden bg-white absolute w-full h-screen top-0
        py-24 pl-4 transition-left duration-300
        ${open ? "left-0" : "-left-full"}
        overflow-y-scroll scrollbar-none z-[40]`}
        >

          <li>
            <Link
              to={"/"}
              className="py-7 px-3 inline-block uppercase"
              onClick={() => {
                setShowProducts(false);
                setOpen(false);
              }}
            >
              Inicio
            </Link>
          </li>

          <li
            className="px-3 text-left md:cursor-pointer">
            <button
              className="py-7 uppercase"
              onClick={() => setShowProducts((prev) => !prev)}>
              Productos
            </button>
            <div>
              <div>
                <MenuProductos
                  categories={categories}
                  visible={showProducts}
                  onClose={() => {
                    setShowProducts(false);
                    setOpen(false);
                  }}
                />
              </div>
            </div>
          </li>

          <li className="px-3 text-left md:cursor-pointer">
            <div className="py-7 uppercase">
              Sobre mi
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
