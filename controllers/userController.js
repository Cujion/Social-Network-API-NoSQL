const { User, Thought } = require('../models');


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
        .populate('friends')
        .populate('thoughts')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No User with that ID :(' })
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
                ? res.status(404).json({ message: 'No User with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a User by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => { 
            !user
                ? res.status(404).json({ message: 'No User with that ID :(' })
                : Thought.deleteMany({ _id: { $in: user.thoughts }})
                .then((thought) => {
                    res.json({ message: 'Successfully removed user and thoughts' })
                })
                .catch((err) => res.status(500).json(err));
        })
    },
    // Add a Friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendsId }},
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a Friend by ID
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendsId }},
            { runValidators: true, new: true }
            )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No User with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
}

