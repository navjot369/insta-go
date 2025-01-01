// import BikeModel from "./../models/bikes.model.js"
import { LogInAdmin, AddBike, FreeAllBikes } from "../controllers/admin.controller.js";
import AdminAuth from "../middlewares/adminAuth.js";
import express from "express";

const router = express.Router();

router.post("/login", LogInAdmin);
router.post("/addBike", AdminAuth, AddBike);
router.post("/freeAllBikes", AdminAuth, FreeAllBikes);

export default router;