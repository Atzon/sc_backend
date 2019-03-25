const Joi = require('joi');
const mongoose = require('mongoose');

const subforumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    topics: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Topic' }]
});

const Subforum = mongoose.model('Subforum', subforumSchema);

function validateSubforum(subforum) {
    const schema = {
        name: Joi.string().min(3).required(),
        // topics: Joi.array().item(Joi.objectId());
    };

    // return Joi.validate(subforum, schema);
    return true;
}


exports.subforumSchema = subforumSchema;
exports.Subforum = Subforum;
exports.validate = validateSubforum;
