import fotoAbout from "../../assets/fotoAbout.png";
export const AboutMe = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-2 font-rubik">
        <div className="flex items-center">
          <span className="mt-4 material-symbols-outlined">
            flare
          </span>
          <p className="mt-8 mb-6 mx-4 text-5xl">
            Sobre Mi
          </p>
          <span className="mt-4 material-symbols-outlined">
            flare
          </span>
        </div>
        <img
          src={fotoAbout}
          alt="Mi foto"
          className="w-48 h-48 object-cover rounded-full mb-6"
        />
        <p className="text-center mx-10 md:mx-20 lg:mx-36 text-lg">
          Hola! Te invito a conocer este proyecto artesanal, inspirado en mi pasión por la cerámica y el arte. Soy ceramista y estudiante de la licenciatura en cerámica de la FAD UnCuyo y busco conectar a través de este proceso creativo, creando piezas únicas para que lleguen a tus manos✨
          <br />Para realizar mi trabajo utilizo barro rojo y engobes realizados con óxidos naturales, las piezas están bruñidas con piedra pulida para darle brillo e impermeabilizar la superficie, quemadas a leña en horno de barro y finalmente curadas con cera de abejas.
          <br />Hagamos de la arcilla un punto de encuentro 💖
          <br />Ceci
        </p>
      </div>
    </>
  )
}
