import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";



const addUser = async (req, res) => {

    const user = req.body;

    let address = "";
    if (user.address != null) {
        address += (user.address?.line ? user.address?.line + ", " : "");
        address += (user.address?.city ? user.address?.city + ", " : "");
        address += (user.address?.state ? user.address?.state : "");
        console.log(address);
        user.address = address;
    }

    let dbCheck = await UserModel.find({ email: user.email });
    if (dbCheck.length > 0) {
        return res.status(406).send({
            message: "User with this email already exists"
        });
    }
    dbCheck = await UserModel.find({phone: user.phone})
    if (dbCheck.length > 0) {
        return res.status(406).send({
            message: "User with this phone number already exists"
        });
    }
    if (user?.password) {
        user.password = bcrypt.hashSync(user.password, 10);
    }

    try {
        let dbResponse = await UserModel.create(user);
        if (dbResponse) {
            res.send({
                message: "User added successfully"
            });
        } else {
            res.status(500);
            res.send({
                message: "Error adding User"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({
            message: "Internal Server Error"
        });
    }
}

const LogIn = async (req, res) => {

    const {email, password} = req.body;
    console.log(email, password);
    try {
        const existingData = await UserModel.findOne({ email: email });
        if (!existingData) {
            return res.status(400).send({
                message: "Invalid Credentials"
            });
        }
            
        const passwordMatch = await bcrypt.compare(password, existingData.password);
        if(!passwordMatch) {
            return res.status(400).send({
                message: "Invalid Credentials"
        });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h"
        });

        res.status(200).send({token});

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

export {addUser, LogIn};