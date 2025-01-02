// import BikeModel from "./../models/bikes.model.js"
import { LogInAdmin, AddBike, FreeAllBikes, GetAllUsers, GetAllBikes, GetAllBookings, GetHistory } from "../controllers/admin.controller.js";
import AdminAuth from "../middlewares/adminAuth.js";
import express from "express";

const router = express.Router();

router.post("/login", LogInAdmin);
router.post("/addBike", AdminAuth, AddBike);
router.post("/freeAllBikes", AdminAuth, FreeAllBikes);
router.get("/allUsers", AdminAuth, GetAllUsers);
router.get("/allBikes", AdminAuth, GetAllBikes);
router.get("/allBookings", AdminAuth, GetAllBookings);
router.get("/getHistory", AdminAuth, GetHistory);

export default router;