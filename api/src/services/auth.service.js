import createHttpError from 'http-errors'
import validator from 'validator'
import UserModel from '../models/user.model.js'

const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env

export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData

    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Please fill all fields.')
    }

    if (!validator.isLength(name, { min: 2, max: 16 })) {
        throw createHttpError.BadRequest('Please make sure your name is between 2 and 18 characters.')
    }

    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please make sure to provide a valid email.')
    }

    const checkDB = await UserModel.findOne({ email })
    if (checkDB) {
        throw createHttpError.Conflict('Email already exists.')
    }

    if (!validator.isLength(password, { min: 6, max: 126 })) {
        throw createHttpError.BadRequest('Please make sure your password is between 6 and 126 characters.')
    }

    const user = await new UserModel({
        name, email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS, password
    }).save()

    return user
}