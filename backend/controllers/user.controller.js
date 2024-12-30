import bcrypt from "bcrypt"
import UserModel from "../models/user.model";


const addUser = async (req, res) => {

    const user = req.body;
    
    let address = "";
    if(user.address != null) {
        address += (user.address?.line? user.address?.line + ", " : "");
        address += (user.address?.city? user.address?.city + ", " : "");
        address += (user.address?.state? user.address?.state : "");
        console.log(address);
        user.address = address;
    }

    let dbCheck = await UserModel.find({ email: user.email });
    if (dbCheck.length > 0) {
        errorCallback("User with this email already exists", 406);
        return;
    }
    if (dbCheck.length > 0) {
        errorCallback("User with this phone number already exists", 406);
        return;
    }
    if (user?.password) {
        user.password = bcrypt.hashSync(user.password, 10);
    }

    try {
        let dbResponse = await UserModel.create(user);
        if(dbResponse) {
            res.send({
                message: "User added successfully"
            });
        }else{
            res.status(500);
            res.send({
                message: "Error adding User"
            });
        }
    } catch (error) {
        errorCallback(error.message, 400);
    }
}