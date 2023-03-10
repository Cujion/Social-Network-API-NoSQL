const { User, Thought } = require('../models');

module.exports = {
    // Get All Thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a Single Thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
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
                    { $push: { thoughts: thought._id } },
                    { runValidators: true, new: true }
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
    // Update a Thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a Thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID :(' })
                    : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                )
                    .then((user) => {
                        if(!user) {
                            res.status(404).json({ message: 'issue'})
                        } else {
                        res.json({ message: 'Successfully removed thought from user' })}
                    })
                    .catch((err) => res.status(500).json(err));
            })
    },
    // Create a Reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a Reaction by ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No Thoughts with that ID :(' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}