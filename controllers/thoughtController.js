const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: 'reactions', select: '-__v' }) // get reactions for the thought
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({_id:req.params.thoughtId})
    .populate({ path: 'reactions', select: '-__v' }) // get reactions for the thought
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then(async (thought) => {
         return User.findOneAndUpdate(
          {_id: req.body.userId},
          {$push:{thoughts:thought._id}},
          {new:true}
        ) 
        .then((User)=>{
          res.json({thought:thought.toObject(),User});
        })
       
        
      })
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json({ message: "thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
   // Adds a reaction
   addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction tag.
  removeReaction(req, res) {
    Thought.findOne(
      { _id: req.params.thoughtId }
    )
      .then((thought) =>{
            thought.reactions.splice(thought.reactions.indexOf(req.params.reactionId),1);   //removes the Friends Id     
            thought.save(); // Saves the changes
            return res.status(200).json(thought);   
          })
      
      .catch((err) => res.status(500).json(err));
  },
};
