import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 10
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    landmark: {
        type: String,
        trim: true,
        maxlength: 50
    }
}, { timestamps: true });

const UserAddress = mongoose.models.UserAddress || mongoose.model("UserAddress", addressSchema);

export default UserAddress;
