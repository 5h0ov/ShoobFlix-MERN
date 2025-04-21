import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    mediaId: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        required: true,
        enum: ['movie', 'tv']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    replyToId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    replyToUsername: {
        type: String,
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reports: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        reason: String
    }],
    isVisible: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);