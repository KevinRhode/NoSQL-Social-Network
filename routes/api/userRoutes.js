const router = require('express').Router();
const {
  getSingleUser,
  getUsers
  
} = require('../../controllers/userController');

router.route('/').get(getUsers);

router.route('/:username').get(getSingleUser);

module.exports = router;
