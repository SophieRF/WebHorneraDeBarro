import imagenHome from "../assets/imagenHome.png";
import { CategoryList } from "../components/CategoyFiles/CategoryList";
import { FeaturedProductList } from "../components/ProductFiles/FeaturedProductList";

export const Home = () => {

  return (
    <>
      <div className="bg-[#fff] mb-12 ml-10">

        <img
          src={imagenHome}
          alt="imagen de inicio"
          className="w-screen h-[26rem] object-cover" />

        <div>
          <div className="flex items-center gap-2 mt-10">
            <h2 className="font-rubik text-4xl">
              Novedades
            </h2>
            <span className="material-symbols-outlined text-3xl relative top-[2px]">
              sentiment_satisfied
            </span>
          </div>

          <FeaturedProductList />
        </div>

        <div>
          <CategoryList />
        </div>

      </div>
    </>
  )
}
