import mongoose, { mongo } from "mongoose"

const userSchemma = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    role: {
        type: [String],
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true

    }
})

const USER = mongoose.model("user", userSchemma);

export default USER;