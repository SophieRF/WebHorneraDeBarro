import mongoose from "mongoose";
import Product from "../schemas/productSchema.js"

class ProductModel {

    //CREAR
    async create(product) {
        return await Product.create(product);
    }

    //GET ALL
    async getAll() {
        return await Product.find();
    }

    //GET BY ID
    async getById(id) {
        return await Product.findById(id);
    }

    //UPDATE
    async update(id, product) {
        return await Product.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: product },
            { new: true });
    }

    //DELETE
    async delete(id) {
        return await Product.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }
}

export default new ProductModel;