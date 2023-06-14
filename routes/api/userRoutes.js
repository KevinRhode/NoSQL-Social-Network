const router = require('express').Router();
const {
  getSingleUser,
  getUsers,
  createUser
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:username').get(getSingleUser);

router.route('/').post(createUser);

module.exports = router;
