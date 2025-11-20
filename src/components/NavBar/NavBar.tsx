import { useState } from "react";
import { MenuProductos } from "./MenuProductos";
import { PRODUCT_CATEGORIES } from "../../data/productCategories";

export const NavBar = () => {

  const [open, setOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-[#fff] shadow-lg shadow-[#9c8a7a] z-50">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <p>Hornera De Barro</p>
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul
          className="md:flex hidden items-center gap-8 font:[Poppins] ">
          <li>
            <button className=" uppercase">
              Inicio
            </button>
          </li>

          <li className="px-3 text-left md:cursor-pointer">
            <button
              className="py-7 uppercase"
              onClick={() => setShowProducts((prev) => !prev)}>
              Productos
            </button>
            <div>
              <MenuProductos categories={PRODUCT_CATEGORIES} visible={showProducts} />
            </div>
          </li>

          <li className="px-3 text-left md:cursor-pointer">
            <div className="py-7 uppercase">
              Sobre mi
            </div>
          </li>
        </ul>

        {/*Mobile Nav*/}
        <ul
          className={`
    md:hidden bg-white fixed w-full top-0 bottom-0 py-24 pl-4
    duration-500 ${open ? "left-0" : "left-[-100%]"}
    overflow-y-scroll scrollbar-none`}
        >
          <li>
            <button className="py-7 px-3 inline-block uppercase">
              Inicio
            </button>
          </li>

          <li className="px-3 text-left md:cursor-pointer">
            <button
              className="py-7 uppercase"
              onClick={() => setShowProducts((prev) => !prev)}>
              Productos
            </button>
            <div>
              <div>
                <MenuProductos categories={PRODUCT_CATEGORIES} visible={showProducts} />
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
