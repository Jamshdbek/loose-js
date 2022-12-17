import { body } from "express-validator"

 
export  const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL()
]

export const loginValidation = [
    body('email', 'xato email').isEmail(),
    body('password ','xato parol').isLength({ min: 5 }),
]

export const postCreateValidation = [
    body('title', 'titleni yozing').isLength({ min: 5 }).isString(),
    body('text').isLength({ min: 5 }).isString(),
    body('blog').optional().isString(),
    body('ImageUrl').optional().isString()
]