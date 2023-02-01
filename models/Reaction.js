const { Schema, model, Types } = require('mongoose');
// Pulling in dayjs for date formatting
const dayjs = require('dayjs');
// Reactions schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAt => dayjs(createdAt).format("MMM DD, YYYY [at] hh:mm a")
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;