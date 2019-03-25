// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');
const {Topic, validate} = require('../models/topic');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const topic = await Topic.find().sort('name');
    res.send(topic);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let topic = new Topic({
        name: req.body.name,
        author: req.body.author,
        post: req.body.post
    });
    topic = await topic.save();

    res.send(topic);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const topic = await Topic.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            author: req.body.author,
            post: req.body.post
        },
        {
            new: true
        });

    if (!topic) return res.status(404).send('The topic with the given ID was not found.');

    res.send(topic);
});

router.delete('/:id', async (req, res) => {
    const topic = await Topic.findByIdAndRemove(req.params.id);

    if (!topic) return res.status(404).send('The topic with the given ID was not found.');

    res.send(topic);
});

router.get('/:id', async (req, res) => {
    const topic = await Topic.findById(req.params.id);

    if (!topic) return res.status(404).send('The topic with the given ID was not found.');

    res.send(topic);
});

module.exports = router;