import { useCartStore } from "../store/useCartStore";
import { useState } from "react";

export const ShopScreen = () => {
  const {
    products,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalProducts,
  } = useCartStore();

  const [deliveryType, setDeliveryType] = useState<"envio" | "retiro">("envio");
  const [paymentType, setPaymentType] = useState<"transferencia" | "efectivo">("transferencia");


  const total = getTotalPrice();
  const totalProducts = getTotalProducts();

  // Generar Mensaje
  const generateWhatsAppMessage = () => {
    if (products.length === 0) return "";

    let message = "Hola! Quiero realizar el siguiente pedido:\n\n";

    products.forEach((prod) => {
      message += `• ${prod.name} - $${prod.price}\n`;
    });

    message += `\n🛒 Cantidad de productos: ${totalProducts}`;
    message += `\n💰 Total: $${total}`;
    message += `\n📦 Medio de pago: ${paymentType === "transferencia" ? "Transferencia" : "Efectivo"}`;
    message += `\n📦 Modalidad: ${deliveryType === "envio" ? "Envío a domicilio" : "Retiro en el local"
      }`;

    return message;
  };

  const phoneNumber = "5492615434648";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Tu carrito</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <>
          {/*Lista */}
          <div className="flex flex-col gap-4">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="flex justify-between items-center border p-4 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={prod.images[0]?.url}
                    alt={prod.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                    <p className="font-semibold">{prod.name}</p>
                    <p className="text-sm text-gray-500">
                      ${prod.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(prod._id)}
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/*Medio de pago*/}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Medio de pago</h2>

            <div className="flex gap-4">
              <button
                onClick={() => setPaymentType("transferencia")}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${paymentType === "transferencia"
                  ? "bg-stone-900 text-white"
                  : "bg-white"
                  }`}
              >
                Transferencia
              </button>

              <button
                onClick={() => setPaymentType("efectivo")}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${paymentType === "efectivo"
                  ? "bg-stone-900 text-white"
                  : "bg-white"
                  }`}
              >
                Efectivo
              </button>
            </div>
          </div>

          {/*Modalidad */}
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Modalidad de entrega</h2>

            <div className="flex gap-4">
              <button
                onClick={() => setDeliveryType("envio")}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${deliveryType === "envio"
                  ? "bg-stone-900 text-white"
                  : "bg-white"
                  }`}
              >
                Envío
              </button>

              <button
                onClick={() => setDeliveryType("retiro")}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${deliveryType === "retiro"
                  ? "bg-stone-900 text-white"
                  : "bg-white"
                  }`}
              >
                Retiro
              </button>
            </div>
          </div>

          {/*Total */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-xl font-bold">${total}</p>
          </div>

          {/*WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full
              h-12
              mt-6
              rounded-md
              bg-green-900
              text-white
              flex items-center justify-center
              gap-2
              font-semibold
            "
          >
            <i className="fa-brands fa-whatsapp"></i>
            Enviar Pedido
          </a>

          {/*Vaciar */}
          <button
            onClick={clearCart}
            className="mt-4 text-sm underline text-gray-500"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};
