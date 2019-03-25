const Joi = require('joi');
const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Forum = mongoose.model('Forum', forumSchema);

function validateForum(forum) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(forum, schema);
}

exports.forumSchema = forumSchema;
exports.Forum = Forum;
