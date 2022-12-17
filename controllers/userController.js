import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import UserModule from "../models/user.js"
import { validationResult } from "express-validator";

export const register = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array())
        }
        // hash password
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        // save DB
        const doc = new UserModule({
            email: req.body.email,
            fullName: req.body.fullName,
            password: hash,
            avatarUrl: req.body.avatarUrl
        })
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id,
        }, 'secret', { expiresIn: '30d' })
        const { passwordHash, ...userData } = await user._doc;
        res.json({ ...userData, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'register failed' })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModule.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'Email yoki parol xato' })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password)
        if (!isValidPass) {
            return res.status(400).json({ message: 'Email yoki parol xato' })
        }
        const token = jwt.sign({
            _id: user._id,
        }, 'secret', { expiresIn: '30d' })
        // red 
        const { passwordHash, ...userData } = await user._doc;
        res.json({ ...userData, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'problem' })
    }

}

export const userInfo = async (req, res) => {
    try {
        const user = await UserModule.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'user not found'
            })
        }
        const { passwordHash, ...userData } = await user._doc;
        res.json({ ...userData })
        res.json({ message: 'good' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'problem setting' })
    }

}