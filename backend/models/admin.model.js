import mongoose from "mongoose"

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;