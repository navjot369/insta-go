import mongoose from "mongoose"

const BikeSchema = mongoose.Schema({
    bikeName: {
        type: String,
        required: true
    },
    modelYear: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    },
    bikeNumber: {
        type: String,
        required: true
    },
    bikeCondition: {
        type: String,
        enum: ["Bad", "Ok", "Good"],
        default: "Good"
    },
    lastCheckup: {
        type: Date,
        default: Date.now
    },
    bookings: {
        status: {
            type: String,
            enum: ["Available", "Progress", "Booked"],
            default: "Available"
        },
        bookedAt: {
            type: Date,
            default: null
        },
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    }
})

const BikeModel = mongoose.model("Bike", BikeSchema);

export default BikeModel;