const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            public_id:{
                type: String,

            },
            url:{
                type: String,
            },
        },
        category:{
            type: String,
            required: true,
        },
        stock:{
            type: Number,
            default: 1,
            required: true,
        },
    },
    {timestamps: true}
);
const ProductModel = mongoose.model("product", ProductSchema)

module.exports = ProductModel