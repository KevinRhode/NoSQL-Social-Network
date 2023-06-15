const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', select: '-__v' })
      .populate({ path: 'friends', select: '-__v' })
      .then((users) => res.json(users))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.json({ message: "User successfully deleted" })
          
          // Thought.find(
          //     { users: req.params.userId },
          //     { $pull: { users: req.params.userId } },
          //     { new: true }
          //   )
          //   .then((thought) =>
          //   !thought
          //     ? res.status(404).json({
          //         message: "User deleted, but no thoughts found",
          //       })
          //     : res.json({ message: "User successfully deleted" })
          // )
      )
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Self Ref - Friends
  addFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        user.friends.push(req.params.friendId);
        user.save();
        return res.status(200).json(user);
      })
      
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  //Self Ref - Friends
  removeFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        user.friends.splice(user.friends.indexOf(req.params.userId),1);   //removes the Friends Id     
        user.save(); // Saves the changes
        return res.status(200).json(user);        
      })
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
};
