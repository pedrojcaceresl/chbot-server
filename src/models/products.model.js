const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
    idProduct: {
        type: Number,
        unique: true
    },
    collectionId: {
        type: Number,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    product_type: {
        type: String
    },
    status: {
        type: String
    },
    tags: {
        type: String
    },
    // images: {
    //     type: [String],
    // },
    image: {
        type: String
    },
    price: {
        type: Number
    }
})

 module.exports = model("product", ProductSchema);