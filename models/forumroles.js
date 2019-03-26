const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
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
        enum: ['USER', 'ADMIN', 'MOD'],
        required: true
    }
});

const Forumroles = mongoose.model('Forumroles', forumrolesSchema);

function validateForumroles(forumroles) {
    const schema = {
        author: Joi.objectId().required(),
        forum: Joi.objectId().required(),
        roles: Joi.string().valid('USER', 'ADMIN', 'MOD').required()
    };
    return Joi.validate(forumroles, schema);
}


exports.forumrolesSchema = forumrolesSchema;
exports.Forumroles = Forumroles;
exports.validate = validateForumroles
