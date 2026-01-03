import "dotenv/config";
import express from "express";
import cors from "cors";                     
import routeProducts from "./routes/productRoute.js";
import routeCategory from "./routes/categoryRoute.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", routeProducts);
import path from "path";
app.use(
  "/static/categories",
  express.static(path.join(__dirname, "public/categories"))
);
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
