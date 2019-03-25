const Joi = require('joi');
const mongoose = require('mongoose');

const forumrolesSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        reguired: true
    },
    roles: {
        type: String,
        enum: ['USER', 'ADMIN', 'MOD']
    }
});

const Forumroles = mongoose.model('Forumroles', forumrolesSchema);

function validateForumroles(forumroles) {
    const schema = {
        // name: Joi.string().min(3).required()
        roles: Joi.string().valid('USER', 'ADMIN', 'MOD')
    };

    // return Joi.validate(forumroles, schema);
    return true;
}


exports.forumrolesSchema = forumrolesSchema;
exports.Forumroles = Forumroles;
exports.validate = validateForumroles
