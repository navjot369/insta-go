import express from "express"
import UserModel from "./../models/user.model.js";
import {addUser, LogIn} from "./../controllers/user.controller.js"

const router = express.Router();


router.post("/signup", addUser);
router.post("/login", LogIn);

export default router;

// router.post("/signup", (req, res) => {
//     console.log(req.body);
//     const user = req.body;
    
//     let address = "";
//     if(user.address != null) {
//         address += (user.address?.line? user.address?.line + ", " : "");
//         address += (user.address?.city? user.address?.city + ", " : "");
//         address += (user.address?.state? user.address?.state : "");
//         console.log(address);
//         user.address = address;
//     }

//     UserModel.addUser(user, 
//         (response) => {
//             if(res) {
//                 res.send(response);
//             }else{
//                 res.status(400);
//                 res.send(response);
//             }
//         },
//         (error, code) => {
//             res.status(code);
//             res.send(error);
//         }
//     )
//     return;
// })
