import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups:true },
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
    register_date: {type: Date, default: Date.now}

});



const userModel = mongoose.model(`users`, userSchema)

export default userModel;