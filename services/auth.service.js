import connectDB from "../lib/db";
import { AppError } from "../lib/errors";
import UserAddress from "../models/Address";
import User from "../models/User";
import bcrypt from "bcrypt";
import { createSession } from "../lib/session";

export const sanitizeUser = (user) => {
    if (!user) return null;

    const userObj = typeof user.toObject === "function" ? user.toObject() : { ...user };

    delete userObj.password;

    return {
        _id: userObj._id,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        username: userObj.username,
        email: userObj.email,
        phone: userObj.phone,
        dialcode: userObj.dialcode,
        role: userObj.role,
        isActive: userObj.isActive,
        createdAt: userObj.createdAt,
        updatedAt: userObj.updatedAt,
    };
};

export const CreateUser = async (validatedData) => {
    await connectDB();

    const existingUser = await User.findOne({
        email: validatedData.email,
    });

    if (existingUser) {
        throw new AppError(409, "Email already exists!");
    }

    // Local standalone MongoDB does not support transactions / retryable writes.
    // Save sequentially; roll back the user if address creation fails.
    const newUser = new User({
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        email: validatedData.email,
        password: validatedData.password,
        dialcode: "91",
        phone: validatedData.phone,
        role: "customer",
        isActive: true,
    });

    await newUser.save();

    try {
        const userAddress = await UserAddress.create({
            user_id: newUser._id,
            city: validatedData.city,
            state: validatedData.state,
            country: validatedData.country,
            pincode: validatedData.pincode,
            address: validatedData.address,
            landmark: validatedData.landmark || "",
        });

        await createSession({
            userId: newUser._id,
            username: newUser.username,
            role: newUser.role,
        });

        return {
            user: sanitizeUser(newUser),
            address: userAddress,
        };
    } catch (error) {
        await User.findByIdAndDelete(newUser._id);
        throw error;
    }
};

export const login = async (loginData) => {
    await connectDB();

    const { email, password } = loginData;

    const user = await User.findOne({ email }).select("+password").lean();

    const isMatch = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isMatch) {
        throw new AppError(401, "Email or Password is wrong!");
    }

    if (!user.isActive) {
        throw new AppError(401, "User is not active!");
    }

    await createSession({
        userId: user._id,
        username: user.username,
        role: user.role,
    });

    return sanitizeUser(user);
};

export const getUserById = async (userId) => {
    await connectDB();

    const user = await User.findById(userId).lean();

    if (!user) return null;

    return sanitizeUser(user);
};
