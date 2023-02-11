import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    name: String,
    text: String,
    author: { type: String },
    viewsCunt: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },

    imageUrl: String,
},
    { timestamps: true },
)

export default mongoose.model('Portal', PostSchema)
