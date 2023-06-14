const { User } = require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
        .then((users)=>res.json(users))
        .catch((err) => {
            console.error({message:err});
            return res.status(500).json(err);
        });
    },
    getSingleUser(req,res){
        User.findOne()
        .then((users)=>res.json(users))
        .catch((err) => {
            console.error({message:err});
            return res.status(500).json(err);
        });
    },
    createUser(req, res){
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
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },   
};