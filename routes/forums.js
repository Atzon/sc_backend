const authentication = require('../middleware/authentication');
// const admin = require('../middleware/admin');
const {Forum, validate} = require('../models/forum');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', authentication, async (req, res) => {
    const forum = await Forum.find().sort('name');
    res.send(forum);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let forum = new Forum({ name: req.body.name });
    forum = await forum.save();

    res.send(forum);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const forum = await Forum.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!forum) return res.status(404).send('The forum with the given ID was not found.');

    res.send(forum);
});

router.delete('/:id', async (req, res) => {
    const forum = await Forum.findByIdAndRemove(req.params.id);

    if (!forum) return res.status(404).send('The forum with the given ID was not found.');

    res.send(forum);
});

router.get('/:id', async (req, res) => {
    const forum = await Forum.findById(req.params.id);

    if (!forum) return res.status(404).send('The forum with the given ID was not found.');

    res.send(forum);
});

module.exports = router;