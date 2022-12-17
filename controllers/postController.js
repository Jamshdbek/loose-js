import postModule from "../models/post.js";
import bcrypt from "bcrypt"

export const getPosts = async (req, res) => {
    try {
        const posts = await postModule.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "problem get posts" })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = await req.params.id
        postModule.findOneAndUpdate({
            _id: postId
        },
        {
            $inc: { viewsCunt: 1 }
        },
        {
         returnDocument:'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({message:"problem update post"})
                }
                if (!doc) {
                    return res.status(404).json({ message: "document not found" })

                }
                res.status(200).json(doc)
        }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "problem get posts" })
    }
}
export const createPost = async (req, res) => {

    try {
        const userId = req.body.user
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(userId, salt)
        const doc = await  postModule.create({
            title: req.body.title,
            text: req.body.text,
            blog: req.body.blog,
            imageUrl: req.body.imageUrl,
            user: hash
        })
        const post = await doc.save()
        res.json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "one user create only one post" })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = await req.params.id
        postModule.findOneAndDelete({
           _id: postId
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({message:"problem deleting"}) 
            }
            if (!doc) {
                return res.status(404).json({message:"problem not found"})
            }
            res.json({success:true})
       })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "problem get posts" })
    }
}
export const update = async (req, res) => {
    try {
        const postId = await req.params.id
        postModule.updateOne({
            _id: postId,
        },
            {
                title: req.body.title,
                text: req.body.text,
                blog: req.body.blog,
                imageUrl: req.body.imageUrl
            },  (err, docs) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated Docs : ", docs);
                }
            })
        res.json({ success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"problem updating "})
    }
}