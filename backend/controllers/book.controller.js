import BikeModel from "../models/bikes.model.js";
import BookingModel from "../models/booking.model.js";
import HistoryModel from "../models/history.model.js";

const AvailableBike = async (req, res) => {
    try {
        const userId = req.body.user._id;
        const allBikes = await BikeModel.find({});

        let count = 0;
        const date = Date.now();

        for(let bike of allBikes) {
            if(bike.bookings.status == "Available"){
                count++;
            }
            else if(bike.bookings.status == "Progress") {
                if(date - bike.bookings.bookedAt > 5*60*100) {
                    bike.bookings.status = "Available";
                    bike.bookings.bookedAt = null;
                    bike.save();
                    count++;
                }
            }else{
                if(bike.bookings.bookedBy.equals(userId)) {
                    return res.status(200).send({
                        haveBooked: true,
                        bike
                    })
                }
            }
        }

        // console.log(count);

        // console.log(Date.now());
        // allBikes[0].bookings.bookedAt = Date.now();
        // allBikes[0].bookings.status = "Progress";
        // allBikes[0].save();

        return res.status(200).send({
            haveBooked: false,
            count});
    } catch(error) {
        // console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

const ReserveBike = async (req, res) => {
    try{
        const allBikes = await BikeModel.find({});

        let bike= null;

        for(let bikeI of allBikes) {
            if(bikeI.bookings.status == "Available" && bike == null) {
                bike = bikeI;
            }

            if(bikeI.bookings.status == "Progress" && 
                (bikeI.bookings.bookedBy == req.body.user._id)) {
                bike = bikeI;
                break;
            }
        }

        if(!bike) {
            return res.status(200).send({
                bikeReserved: false
            });
        }

        bike.bookings.status = "Progress";
        bike.bookings.bookedAt = Date.now();
        bike.bookings.bookedBy = req.body.user._id;

        bike.save();

        return res.status(200).send({
            bikeReserved: true,
            bikeId: bike._id,
            bikeNumber: bike.bikeNumber,
            amount: 400,
            email: req.body.user.email,
            username: req.body.user.username,
            phone: req.body.user.phone
        })

    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error 2"
        })
    }
}

const ConfirmBook = async (req, res) => {

    try {
        const userId = req.body.user._id;

        const bikesData = await BikeModel.find({"bookings.status" : "Progress"});
        // console.log(bikesData);
        let bikeData = null;
        for(let bike of bikesData) {
            // console.log(bike.bookings.bookedBy, userId);
            if(bike.bookings.bookedBy.equals(userId)) {
                bikeData = bike;
                break;
            }
        }

        console.log(bikeData);

        // const bikeData = await BikeModel.findById(req.body.bikeId);

        if(bikeData) {
            bikeData.bookings.status = "Booked";
            bikeData.save();

            const dbRes = await BookingModel.create({
                bike: bikeData._id,
                user: userId,
                paidAmount: req.body.amount,

            })

            return res.status(200).send({
                done: true,
                bookingData: dbRes,
                bike: bikeData,
                message: "Bike booked Successfully"
            });
        }

        return res.status(200).send({
            done: false,
            message: "Error booking bike"
        });

    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const EndBooking = async (req, res) => {
    try {

        const bookingDetail = await BookingModel.findOne({user: req.body.user._id});

        if(!bookingDetail) {
            return res.status(400).send({
                message: "Error finding the details"
            })
        }

        const bikeToFree = await BikeModel.findById(bookingDetail.bike);
        if(bikeToFree) {
            bikeToFree.bookings.status = "Available";
            bikeToFree.bookings.bookedAt = null;
            bikeToFree.bookings.bookedBy = null;
            await bikeToFree.save();
        }

        const historyDetail = {
            bike: bookingDetail.bike,
            user: bookingDetail.user,
            bookedAt: bookingDetail.bookedAt,
            paidAmount: bookingDetail.paidAmount,
            feedback: req.body.feedback
        }

        const deleteRes = await BookingModel.deleteOne({_id: bookingDetail._id});
        console.log(deleteRes);
        if(!deleteRes.acknowledged) {
            return res.status(500).send({
                message: "Error completing the book (Remove)"
            })
        }

        // sample to test 
        // const historyDetail = {
        //     "bike": "6773ddd35b9916a6c376f133",
        //      "user": "6772cbad3a647d69d90308ae",
        //     "paidAmount": 390,
        //     "bookedAt": "2025-01-01T05:29:14.723Z",
        //     feedback: "Good"
        // }

        const dbResponse = await HistoryModel.create(historyDetail);
        console.log(dbResponse);
        if(dbResponse) {
            return res.status(200).send({
                ok: true,
                message: "End of booking"
            });
        }else{
            return res.status(500).send({
                message: "Error completing the book (Create)"
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message: "Interval Server Error"
        })
    }
}

export {AvailableBike, ReserveBike, ConfirmBook, EndBooking};