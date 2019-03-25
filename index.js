const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const forums = require('./routes/forums');
const users = require('./routes/users');
const forumroles = require('./routes/forumroles');
const posts = require('./routes/posts');
const subforums = require('./routes/subforums');
const topics = require('./routes/topics');
// const auth = require('./routes/auth');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/sc')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/forum', forums);
app.use('/api/forumroles', forumroles);
app.use('/api/post', posts);
app.use('/api/subforum', subforums);
app.use('/api/topic', topics);
// app.use('/api/customers', customers);
// app.use('/api/movies', movies);
// app.use('/api/rentals', rentals);
// app.use('/api/users', users);
// app.use('/api/auth', auth);

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));