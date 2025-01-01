import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

const userAuth = async (req, res, next) => {
    try{
        // console.log(req.headers);
        const token = req.headers.authorization;
        if(!token) {
            return res.status(400).send({
                message: "Unauthorized"
            });
        }

        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userData = await UserModel.findOne({email: tokenData.email});

        if(!userData) {
            return res.status(400).send({
                message: "Unauthorized"
            })
        }

        req.body.user = {_id: userData._id, email: userData.email, username: (userData.firstName + " " + userData.lastName), phone: userData.phone};
        next();

    } catch(error) {
        if(error.name == "TokenExpiredError") {
            return res.status(498).send({
                message: "Token expired"
            })
        }
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export default userAuth;

