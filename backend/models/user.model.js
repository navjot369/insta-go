import mongoose from "mongoose"


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    dob: {
        type: Date,
    }
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;


// UserModel.addUser = async (user, successCallback, errorCallback) => {

//     let dbCheck = await UserModel.find({email: user.email});
//     console.log(dbCheck);
//     if(dbCheck.length > 0) {
//         errorCallback("User with this email already exists", 406);
//         return;
//     }
//     if(dbCheck.length > 0) {
//         errorCallback("User with this phone number already exists", 406);
//         return;
//     }

//     if(user?.password) {
//         user.password = bcrypt.hashSync(user.password, 10);
//     }

//     try {
//         let dbRes = await UserModel.create(user);
//         successCallback(dbRes);
//     } catch(error) {
//         errorCallback(error.message, 400);
//     }
// }

// UserModel.logIn = async (user, successCallback, errorCallback) => {
//     try{
//         const userData = await UserModel.findOne({email: email});
//         if(userData) {
//             const passwordMatch = bcrypt.compare(userData.password, user.password);
//         }
//     } catch(error) {
//         errorCallback(error.message);
//     }
// }
