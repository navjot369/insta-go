import mongoose from "mongoose";

const HistorySchema = mongoose.Schema({
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookedAt: {
        type: Date,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    returnedAt: {
        type: Date,
        default: Date.now
    },
    feedback: {
        type: String,
        trim: true
    },
    helmets: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
        default: 0
    }
})

const HistoryModel = mongoose.model("Booking_History", HistorySchema);
export default HistoryModel;
