const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get All Thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get a Single Thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'No Thought with that ID' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
}