import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userService = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
})

// Static methods

userService.statics.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

userService.statics.comparePassword = async (receivedPassword, password) => {
    return await bcrypt.compare(receivedPassword, password);
}

export default mongoose.model('User', userService);