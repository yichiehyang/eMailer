const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const {Schema} = mongoose they are the same thing*/

const userSchema = new Schema({
    googleId : String
});

mongoose.model('users', userSchema);