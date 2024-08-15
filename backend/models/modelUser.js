import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    // favorites: {
    //     type: Array,
    //     default: [],
    // },
    favorites: [
        {
            contentId: { type: String, required: true },
            contentType: { type: String, required: true }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    avatarSelectionRequired: {
        type: Boolean,
        default: true,
    },
});

export const  User =  mongoose.model("User", userSchema);

