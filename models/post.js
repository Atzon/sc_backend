const Joi = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model('Post', postSchema);

function validateForum(post) {
    const schema = {
        content: Joi.string().min(1).max(2000).required(),
        // author: Joi.objectId(),
        // createDate: Joi.date().
        // updateDate: Joi.date(),
    };

    return Joi.validate(post, schema);
}

exports.postSchema = postSchema;
exports.Post = Post;
