import app from "@server/server";
import dotenv from "dotenv";

dotenv.config()
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});