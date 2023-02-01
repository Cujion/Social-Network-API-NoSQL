const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get All Users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a Single User by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No User with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a User
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Update a User by ID
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a User by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a Users Associated Thoughts
    deleteUsersThoughts(req, res) {

    },
    // Add a Friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a Friend by ID
    deleteFriend(req, res) {

    }
}

