const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser,
  updateUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:userId').get(getSingleUser);

router.route('/').post(createUser);

router.route('/:userId').put(updateUser);


module.exports = router;
