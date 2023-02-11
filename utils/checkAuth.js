import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    // this use in delate text 'Bearer' in token text 
    const token =( req.headers.authorization || '' ).replace(/Bearer\s?/, '');
    if (token) {
        try {
            // const dec = jwt.verify(token, 'secret');
            // req.userId = dec._id
            next();

        } catch (error) {
            res.status(403).json({ message: "token  wrong." })
        }
    }
    else {
        res.status(403).json({message:"problem token"})
    }
}
