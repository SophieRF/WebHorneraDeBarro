import "dotenv/config";
import express from "express";
import cors from "cors";                     
import routeProducts from "./routes/productRoute.js";
import routeCategory from "./routes/categoryRoute.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";

const app = express();

app.use(cors());                             

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", routeProducts);
app.use("/categories", routeCategory);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        console.log("Servidor activo en el puerto " + PORT)
    );
} catch (error) {
    console.log(error);
}

process.on("SIGINT", async () => {
    dbClient.cerrarConexion();
    process.exit(0);
});
