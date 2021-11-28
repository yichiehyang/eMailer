const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const {Schema} = mongoose they are the same thing*/

const userSchema = new Schema({
    googleId : String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);