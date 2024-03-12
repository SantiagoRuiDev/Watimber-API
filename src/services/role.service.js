import mongoose from "mongoose";

const roleService = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Role', roleService);