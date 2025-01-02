import UserModel from "../models/user.model.js";
import AdminModel from "../models/admin.model.js";
import BikeModel from "../models/bikes.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import BookingModel from "../models/booking.model.js";
import HistoryModel from "../models/history.model.js";

const LogInAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const dbRes = await AdminModel.findOne({ username });
        if (!dbRes) {
            return res.status(400).send({
                message: "Invalid Credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(password, dbRes.password);
        if (!passwordMatch) {
            return res.status(400).send({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        })

        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const AddBike = (req, res) => {

    try {
        const bikeData = req.body;
        const dbRes = BikeModel.create(bikeData);
        if (dbRes) {
            return res.status(200).send({
                message: "Bike added successfully"
            });
        } else {
            return res.status(400).send({
                message: "Error adding bike"
            })
        }


    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const FreeAllBikes = async (req, res) => {
    try {
        const allBikes = await BikeModel.find({});
        for (let bike of allBikes) {
            bike.bookings.status = "Available";
            bike.bookings.user = null;
            bike.bookings.bookedAt = null;
            bike.save();
        }

        return res.status(200).send({
            message: "Done"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const dbRes = await UserModel.find({}).select("-password");
        return res.status(200).send(dbRes);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const GetAllBikes = async (req, res) => {
    try {
        const bikesData = await BikeModel.find({}).lean();

        for(let bikes of bikesData) {
            if(bikes.bookings.status != "Available") {
                const userDetails = await UserModel.findById(bikes.bookings.bookedBy).select("-password");
                bikes.bookings.user = userDetails;
            }
        }

        return res.status(200).json(bikesData);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const GetAllBookings = async (req, res) => {
    try {
        const dbRes = await BookingModel.find().lean();
        
        for(let bookings of dbRes) {
            const bikeDetails = await BikeModel.findById(bookings.bike);
            const userDetails = await UserModel.findById(bookings.user);

            bookings.bike = bikeDetails;
            bookings.user = userDetails;
        }

        return res.status(200).json(dbRes);
    }catch(err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const GetHistory = async (req, res) => {
    try {

        const dbRes = await HistoryModel.find().lean();

        for(let bookings of dbRes) {
            const bikeDetails = await BikeModel.findById(bookings.bike);
            const userDetails = await UserModel.findById(bookings.user);

            bookings.bike = bikeDetails;
            bookings.user = userDetails;
        }

        dbRes.reverse();

        return res.status(200).json(dbRes);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export { LogInAdmin, AddBike, FreeAllBikes, GetAllUsers, GetAllBikes, GetAllBookings, GetHistory };