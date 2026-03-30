export const Footer = () => {
    return (
        <>
            <div className="flex gap-10 mb-8 mx-10 mt-24">
                <div className="flex flex-col">
                    <p className="font-semibold text-xl mb-2">
                        Redes Sociales
                    </p>
                    <div className="flex gap-4 text-2xl ml-1">
                        <a href="https://www.facebook.com/markamamacram3">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/hornera.debarro/">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>

                </div>
                <div className="flex flex-col">
                    <p className="font-semibold text-xl mb-2">
                        Contacto
                    </p>
                    <a
                        href="https://wa.me/542615434648?text=Hola!%20Quiero%20consultar%20por%20sus%20productos"
                        target="_blank"
                        className="hover:text-lime-900 transition-all duration-300"
                    >
                        542615434648
                    </a>
                    <a 
                    href="mailto:ceciferraro25@gmail.com"
                    className="hover:underline"
                    >
                        ceciferraro25@gmail.com
                    </a>
                </div>
            </div>
        </>
    )
}
