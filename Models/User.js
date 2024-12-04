const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, min: [5, 'password should at least be 5 characters long.']},
    role: {type: String, required: true, enum: ['user', 'admin', 'superuser'], default: 'user'}
}, {timestamps:true});


const User = mongoose.model('User', UserSchema);

module.exports = User;