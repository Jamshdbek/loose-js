import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    portal:String,
    author: { type: String, required: true },
    comment: String,
    like: {
        type: String, 
        default:0,
    },
}, { timestamps: true })

export default mongoose.model('Comments' , CommentSchema)