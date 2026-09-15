import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "customer", "staff"]
    }
}, { timestamps: true, })

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;