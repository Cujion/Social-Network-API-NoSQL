const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get All Users
    getAllUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a Single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((users) =>
          !users
            ? res.status(404).json({ message: 'No User with that ID' })
            : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
}

