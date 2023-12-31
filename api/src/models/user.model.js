import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcrypt'

const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"]
    },
    email: {
        type: String,
        required: [true, 'Please provide your email addres'],
        unique: [true, 'This email addres already exist'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    picture: {
        type: String,
        default: DEFAULT_PICTURE
    },
    status: {
        type: String,
        default: DEFAULT_STATUS
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [6, 'Please make sure your password is atleast 6 characters long'],
        maxLength: [128, 'Please make sure your password is less than  128 characters long']
    }
}, {
    collection: "users",
    timestamps: true
})

userSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})
const UserModel = mongoose.models.UserModel || mongoose.model('UserModel', userSchema);

export default UserModel;