import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { postCreateValidation, registerValidation } from './validations/auth.js';
import dotenv from 'dotenv'
import checkAuth from "./utils/checkAuth.js";
import { createPost, getOne, getPosts, remove, update } from "./controllers/postController.js";
import { login, register, userInfo } from "./controllers/userController.js"

// dotenv 
dotenv.config()

// use in express plugins
let app = express();
app.use(express.json())
app.use('/uploads', express.static('uploads'))
const port = process.env.PORT;

// image upload
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }

})
const uploads = multer({ storage })

// mongoose configuration
mongoose.set('strictQuery', false);
mongoose.connect(process.env.HOST_TOKEN).then(() => {console.log('mongoose connected')}).catch((err) => console.log(err.mongoose))


// login ****************************************
app.post('/auth/login', login)
// register ***************************************
app.post('/auth/register', registerValidation, register)
// usr info ************************************
app.get('/auth/me', checkAuth, userInfo)

// post ********************************
app.get('/posts', getPosts)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, postCreateValidation, createPost)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/update/:id', checkAuth, update)

// save img **************************
app.post('/upload', checkAuth, uploads.single('image'), (req, res) => {
    res.json({ url: `upload/${req.file.originalname}` })
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server listening on port:${port}`)
})