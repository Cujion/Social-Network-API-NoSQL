const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// Pulling in dayjs for date formatting
const dayjs = require('dayjs');
// Thoughts schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => dayjs(createdAt).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// Creating a virtual to count number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;