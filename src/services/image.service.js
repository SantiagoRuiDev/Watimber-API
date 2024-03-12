import mongoose from "mongoose";

const imageService = new mongoose.Schema({
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Image', imageService);