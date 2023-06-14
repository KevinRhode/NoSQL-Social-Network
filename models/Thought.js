const {Schema, model} = require('mongoose');
const User = require('./User');
const {formatedCreatedAt} = require('../utils/helpers');

//schema to create subdoc reactions
const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),

        },
        reactionBody:{
            type: String,
            required:true,
            maxlength:280,
        },
        username:{
            type:String,
            required:true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get:formatedCreatedAt,
        }
    }
);
//schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText:{
            
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:formatedCreatedAt,
        },
        username:{
            type: String,
            ref: 'User',
        },
        reactions:[reactionSchema]

    },
    {
        toJSON:{
            virtuals:true,
        },
        id:false,
    }
);

const Thought = model('Thought',thoughtSchema);

module.exports = Thought;