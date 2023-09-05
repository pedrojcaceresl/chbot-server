const { model, Schema } = require('mongoose');

const CustomCollectionsSchema = new Schema({
    idCustom: {
        type: Number,
        unique: true
    },
    handle: {
        type: String,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
})

 module.exports = model("custom-collections", CustomCollectionsSchema);