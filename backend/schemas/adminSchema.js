import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Comparar contraseñas para el login
adminSchema.methods.comparePassword = async function(passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

export default mongoose.model('Admin', adminSchema);