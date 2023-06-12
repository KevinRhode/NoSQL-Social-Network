const {Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');

//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v){
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            },
        },
        thoughts: [thoughtSchema],
        friends:[this],
    },
    {
        toJSON:{
            virtuals:true,
        },
        id:false,
    }
);
const friendCount = userSchema.virtual('friendCount');
//todo 


const User = model('user',userSchema);

module.exports = User;