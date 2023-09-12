import { UserModel } from '../models/index.js'
import createHttpError from 'http-errors'

export const findUser = async (userID) => {
    const user = await UserModel.findById(userID)
    if (!user) {
        throw createHttpError.BadRequest('Please fill all fields')
    }
    return user
}