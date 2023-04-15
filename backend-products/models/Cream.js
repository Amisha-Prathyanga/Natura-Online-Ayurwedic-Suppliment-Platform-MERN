const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const creamSchema = new Schema({
    name: {type: String},
    description: {type: String},
    price: {type: Number},
    quantity: {type: Number},
    type: {type: String},
    mfd: {type: Date},
    exp: {type: Date},
    weight: {type: Number}
});

const Cream = mongoose.model("Cream", creamSchema);
module.exports = Cream;