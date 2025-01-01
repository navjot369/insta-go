import express from "express";
import { AvailableBike, ReserveBike, ConfirmBook, EndBooking } from "../controllers/book.controller.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.get("/available", userAuth, AvailableBike);
router.post("/reserve", userAuth, ReserveBike);
router.post("/confirmBook", userAuth, ConfirmBook);
router.post("/endBooking", userAuth, EndBooking);

export default router;