import jwt from "jsonwebtoken"
import AdminModel from "../models/admin.model.js"

const AdminAuth = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization;
        if(!token) {
            return res.status(400).send({
                message: "Unauthorized"
            });
        }

        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const checkUser = await AdminModel.findOne({username: tokenData.username});
        if(!checkUser) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        req.body.username = tokenData.username;
        next();
    }catch(error) {
        if(error.name == "TokenExpiredError") {
            return res.status(498).send({
                message: "Token expired"
            })
        }
        res.status(500).send({
            message: "Internal Server Error"
    });
    }
}

export default AdminAuth;