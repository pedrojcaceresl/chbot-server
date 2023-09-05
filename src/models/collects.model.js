const { model, Schema } = require('mongoose');

const CollectsSchema = new Schema({
    idCollects: {
        type: Number,
        unique: true
    },
    collectionId: {
        type: Number,
    },
    productsId: {
        type: Number,
    }
})

 module.exports = model("collects", CollectsSchema);