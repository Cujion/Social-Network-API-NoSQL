const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    // createUser,
    // updateUser,
    // deleteUser,
    // deleteUsersThoughts, //Bonus
    // addFriend,
    // deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/')
    .get(getAllUsers)
    // .post(createUser);

// /api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
//     .put(updateUser)
//     .delete(deleteUser);

// /api/users/:userId/thoughts/:thoughtsId
// router.route('/:userId/thoughts/:thoughtsId')
//     .delete(deleteUsersThoughts);

// /api/users/:userId/friends/:friendsId
// router.route('/:userId/friends/:friendsId')
//     .post(addFriend)
//     .delete(deleteFriend);

module.exports = router;