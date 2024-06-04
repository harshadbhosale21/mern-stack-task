import mongoose from "mongoose";

const transctionModel = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean
},
    { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transctionModel);
export default Transaction