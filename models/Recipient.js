const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recepientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});
//subschema 
module.exports = recepientSchema;