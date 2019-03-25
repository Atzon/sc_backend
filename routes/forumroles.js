// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');
const {Forumroles, validate} = require('../models/forumroles');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const forumroles = await Forumroles.find().sort('name');
    res.send(forumroles);
});

router.get('/:id', async (req, res) => {
    const forumroles = await Forumroles.findById(req.params.id);

    if (!forumroles) return res.status(404).send('The forumroles with the given ID was not found.');

    res.send(forumroles);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let forumroles = new Forumroles({ author: req.body.author,
                                       forum: req.body.forum,
                                       roles: req.body.roles });
    forumroles = await forumroles.save();

    res.send(forumroles);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const forumroles = await Forumroles.findByIdAndUpdate(req.params.id,
        { author: req.body.author,
                  forum: req.body.forum,
                  roles: req.body.roles },
        {
                    new: true
        });

    if (!forumroles) return res.status(404).send('The forumroles with the given ID was not found.');

    res.send(forumroles);
});

router.delete('/:id', async (req, res) => {
    const forumroles = await Forumroles.findByIdAndRemove(req.params.id);

    if (!forumroles) return res.status(404).send('The forumroles with the given ID was not found.');

    res.send(forumroles);
});



module.exports = router;