const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

router.route('/:thoughtId').get(getSingleThought);

router.route('/').post(createThought);

router.route('/:thoughtId').put(updateThought);

router.route('/:thoughtId').delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions').delete(removeReaction);

module.exports = router;
