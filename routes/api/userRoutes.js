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

router.route('/').get(getUsers); //get many

router.route('/:userId').get(getSingleUser); //get single

router.route('/').post(createUser); //create user

router.route('/:userId').put(updateUser); //update user

router.route('/:userId').delete(deleteUser); //delete user

router.route('/:userId/friends/:friendId').post(addFriend); //add friend to user

router.route('/:userId/friends/:friendId').delete(removeFriend);//delete friend from user by friend id

module.exports = router;
