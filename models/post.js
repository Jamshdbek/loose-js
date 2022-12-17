import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    title:String,
    text: String,
    blog: { type: Array, required: true },
    viewsCunt: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    
    imageUrl: String,
    user:String,
},
    { timestamps: true },
)

export default mongoose.model('Posts', PostSchema)