import Portal from "../models/portal.js"


export const addPortal = async (req, res) => {
    try {
        const newPost = await Portal.create({ text: req.body.text, title: req.body.title, blog: req.body.blog, url: req.body.blog, author: req.body.author })
        res.json(newPost)
        newPost.save()
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "problem add" })

    }

}