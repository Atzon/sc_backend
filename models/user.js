const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'MOD'],
        default: 'USER'
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, name:this.name, role: this.role }, 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().valid('USER', 'ADMIN', 'MOD')
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;