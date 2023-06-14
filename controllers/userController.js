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
        User.find()
        .then((users)=>res.json(users))
        .catch((err) => {
            console.error({message:err});
            return res.status(500).json(err);
        });
    },
};