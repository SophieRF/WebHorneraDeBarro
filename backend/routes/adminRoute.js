import express from "express";
import adminController from "../controllers/adminController.js";
import {verifyAdmin} from "../middlewares/authMiddleware.js"

const route = express.Router();

route.post("/login", adminController.login);

route.get("/verificar", verifyAdmin, adminController.verify);
route.put("/cambiar-email", verifyAdmin, adminController.updateEmail);
route.put("/cambiar-password", verifyAdmin, adminController.updatePassword);
// route.get("/restablecer", verifyAdmin, adminController.resetPassword);

export default route;