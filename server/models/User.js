import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {type: String, required: true, unique: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true, unique: true}
})

const UserModel = mongoose.model("User",userSchema);

export {UserModel as User}