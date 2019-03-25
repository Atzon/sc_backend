// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');
const {Subforum, validate} = require('../models/subforum');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const subforum = await Subforum.find().sort('name');
    res.send(subforum);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let subforum = new Subforum({
        name: req.body.name,
        topics: req.body.topics
    });
    subforum = await subforum.save();

    res.send(subforum);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const subforum = await Subforum.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            topics: req.body.topics
        },
        {
            new: true
        });

    if (!subforum) return res.status(404).send('The subforum with the given ID was not found.');

    res.send(subforum);
});

router.delete('/:id', async (req, res) => {
    const subforum = await Subforum.findByIdAndRemove(req.params.id);

    if (!subforum) return res.status(404).send('The subforum with the given ID was not found.');

    res.send(subforum);
});

router.get('/:id', async (req, res) => {
    const subforum = await Subforum.findById(req.params.id);

    if (!subforum) return res.status(404).send('The subforum with the given ID was not found.');

    res.send(subforum);
});

module.exports = router;