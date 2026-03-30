// import imagenHome from "../assets/imagenHome.png";
import { CategoryList } from "../components/CategoyFiles/CategoryList";
import { FeaturedProductList } from "../components/ProductFiles/FeaturedProductList";

export const Home = () => {

  return (
    <>
      <div className="bg-[#fff] mb-12 mx-10 text-neutral-900">
              
        {/* <img
          src={imagenHome}
          alt="imagen de inicio"
          className="w-screen h-[26rem] object-cover" />*/}

        {/*Info General */}
        <div className="py-16 bg-[#ecc87f] -mx-10 px-10">
          <h2 className="font-rubik italic text-4xl text-center">
            Mi trabajo
          </h2>
          <p className="font-rubik text-xl sm:text-2xl text-center mt-4 mx-6 lg:mx-20 italic">
            Todas las piezas que creo son resultado de un proceso artesanal en el que busco vincularme permanentemente con la naturaleza. Utilizo barro rojo, engobes realizados con óxidos naturales, están bruñidas con piedra pulida para darle brillo e impermeabilizar la superficie, quemadas a leña en horno de barro y finalmente curadas con cera de abejas.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mt-16 mb-2">
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
