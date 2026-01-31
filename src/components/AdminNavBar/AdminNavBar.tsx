import { Link } from "react-router";
import { useState } from "react";
import { UserDropdown } from "./UserDropdown";

export const AdminNavBar = () => {

  const [userOpen, setUserOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full h-20 bg-[#fff] mt-6 z-[50]">
      <div className="flex items-center font-medium justify-around">
        <Link to={"/admin/products"}>
          Productos
        </Link>
        <Link to={"/admin/categories"}>
          Categorías
        </Link>

        <div className="relative">
          <button
            onClick={()=> setUserOpen(!userOpen)}>
            <span className="material-symbols-outlined">
            account_circle
            </span>
          </button>

          <UserDropdown open={userOpen}/>
        </div>
      </div>
    </nav>
  )
}
