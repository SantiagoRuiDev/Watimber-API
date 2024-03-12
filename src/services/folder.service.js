import mongoose from "mongoose";

const folderService = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Folder', folderService);