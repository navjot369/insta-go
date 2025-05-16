import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    bike: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bike",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    bookedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    bookedUpto: {
        type: Date
    },
    paidAmount: {
        type: Number,
        required: true
    },
    helmets: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
        default: 0
    }
})

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
