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
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No Thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((users) => {
            !users
            ? res.status(404).json({ message: 'No User with that ID' })
            : res.json(users)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
}