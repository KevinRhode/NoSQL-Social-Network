const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:userId').get(getSingleUser);

router.route('/').post(createUser);

router.route('/:userId').put(updateUser);

router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
