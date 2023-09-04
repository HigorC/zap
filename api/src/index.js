import mongoose from "mongoose"
import app from "./app.js"
import dotenv from "dotenv"
import logger from "./configs/logger.config.js"

dotenv.config();

const PORT = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connection.on('error', () => {
    logger.error('Mongodb connection error: ', err)
    process.exit(1)
})

if (process.env.NODE_ENV !== "production") {
    mongoose.set('debug', true) 
}

//mongodb
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.info('Connected to Mongo DB')
})
let server = app.listen(PORT, () => {
    logger.info(`Running at ${PORT}`);
})

const exitHandler = () => {
    if (server) {
        logger.info("Server closed.")
        process.exit(1)
    } else {
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error)
    exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
    if (server) {
        logger.info("Server closed.")
        process.exit(1)
    }
})
