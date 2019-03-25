const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }

});

const Topic = mongoose.model('Topic', topicSchema);

function validateTopic(topic) {
    const schema = {
        name: Joi.string().min(3).required(),
        // author: Joi.objectId(),
        // post: Joi.objectId()
    };

    return Joi.validate(topic, schema);
}

exports.topicSchema = topicSchema;
exports.Topic = Topic;
