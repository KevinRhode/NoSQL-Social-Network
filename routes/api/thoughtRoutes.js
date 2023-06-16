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

router.route('/').get(getThoughts);//get many

router.route('/:thoughtId').get(getSingleThought);//get single

router.route('/').post(createThought);//create thought

router.route('/:thoughtId').put(updateThought);//update thought

router.route('/:thoughtId').delete(deleteThought); //delete thought

router.route('/:thoughtId/reactions').post(addReaction); //add reaction to thought

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction); //delete reaction from thought by reaction id

module.exports = router;
