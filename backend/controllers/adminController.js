import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";

class adminController {
    constructor() { }
    //LOGIN
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email y contraseña son requeridos"
                });
            }

            let admin = await adminModel.getByEmail(email);
            if (!admin) {
                const adminExists = await adminModel.adminExists();

                if (
                    !adminExists &&
                    email === process.env.ADMIN_EMAIL &&
                    password === process.env.ADMIN_PASSWORD
                ) {
                    await adminModel.create({
                        email: process.env.ADMIN_EMAIL,
                        password: process.env.ADMIN_PASSWORD
                    });

                    admin = await adminModel.getByEmail(email); // 🔥 ESTA LÍNEA
                    console.log("Admin creado");
                } else {
                    return res.status(401).json({
                        message: "Credenciales inválidas"
                    });
                }
            }

            const isCorrectPassword = await admin.comparePassword(password);
            if (!isCorrectPassword) {
                return res.status(401).json({
                    message: "Credenciales inválidas"
                });
            }

            //Crear Token
            const token = jwt.sign(
                { id: admin._id, email: admin.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.status(200).json({
                message: "Login Exitoso",
                token,
                admin: {
                    id: admin._id,
                    email: admin.email
                }
            });
        } catch (error) {
            console.log("Error en el login: ", error);
            res.status(500).send(error);
        }
    }

    //VERIFICAR TOKEN
    async verify(req, res) {
        try {
            const admin = await adminModel.getById(req.adminId);

            if (!admin) {
                return res.status(404).json({
                    message: "Admin no encontrado"
                });
            }

            res.status(200).json({
                admin: {
                    id: admin._id,
                    email: admin.email
                }
            });
        } catch (error) {
            console.error("Error al verificar: ", error);
            res.status(500).json({
                message: "Error al verificar sesión"
            });
        }
    }

    //UPDATE EMAIL
    async updateEmail(req, res) {
        try {
            const { newEmail, password } = req.body;

            if (!newEmail || !password) {
                return res.status(400).json({
                    message: "Se requiere nuevo email y contraseña actual"
                });
            }

            const admin = await adminModel.getByEmail(req.adminEmail);
            if (!admin) {
                return res.status(404).json({
                    message: "Admin no encontrado"
                });
            }

            const isCorrectPassword = await admin.comparePassword(password);
            if (!isCorrectPassword) {
                return res.status(402).json({
                    message: "Contraseña incorrecta"
                });
            }

            const updatedAdmin = await adminModel.updateEmail(req.adminId, newEmail);
            res.status(200).json({
                message: "Email actualizado exitosamente",
                admin: {
                    id: updatedAdmin._id,
                    email: updatedAdmin.email
                }
            });
        } catch (error) {
            console.error("Error al cambiar email: ", error);

            res.status(500).json({
                message: 'Error al cambiar email'
            });
        }
    }

    //UPDATE PASSWORD
    async updatePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    message: "Se requiere la contraseña actual y la nueva"
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    message: "La contraseña debe tener al menos 6 caracteres"
                });
            }
            const admin = await adminModel.getByEmail(req.adminEmail);

            if (!admin) {
                return res.status(404).json({
                    message: "Admin no encontrado"
                });
            }

            const isCorrectPassword = await admin.comparePassword(currentPassword);
            if (!isCorrectPassword) {
                return res.status(401).json({
                    message: "Contraseña actual incorrecta"
                });
            }

            await adminModel.updatePassword(req.adminId, newPassword);
            res.status(200).json({
                message: 'Contraseña actualizada con éxito'
            });

        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            res.status(500).send(error);
        }
    }
}

export default new adminController();