const { Schema, model } = require("mongoose");
const User = require("./User");
const { formatedCreatedAt } = require("../utils/helpers");

//schema to create subdoc reactions
const reactionSchema = new Schema({

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatedCreatedAt,
  },
},
{
  toJSON: {
    getters:true,
  },
});
//schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required:true,
      minlength:1,
      maxlength:280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatedCreatedAt,
    },
    username: {
      type: String,
      required:true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required:true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
    id: false,
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
