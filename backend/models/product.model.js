import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    price:  {
        type: String,
        required: true
    },
    category:   {
        type: String,
        required: true
    },
    stock:  {
        type: String,
        required: true,
        default: 0
    },
    description:    {
        type: String,
        required: true
    }},
    {
        timestamps: true
    });

    export default mongoose.model('Product', productSchema);