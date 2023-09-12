import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

export default async function (req, res, next) {
    const bearerToken = req.headers['Authorization']

    if (!bearerToken) return next(createHttpError.Unauthorized())

    const token = bearerToken.split(" ")[1]
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
            return
        }
        req.user = payload
        next()
    })
}