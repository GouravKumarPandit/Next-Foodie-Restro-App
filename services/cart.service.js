import mongoose from "mongoose";
import connectDB from "../lib/db";
import Cart from "../models/Cart";
import { AppError } from "../lib/errors";

export const getCart = async (userId) => {
    await connectDB();

    const allCartItems = await Cart.find({
        user_id: userId,
    }).lean();

    return allCartItems;
};


export const createCart = async (body, userId) => {
    await connectDB();

    const { food_id } = body;

    if (!mongoose.Types.ObjectId.isValid(food_id)) {
        throw new AppError(400, "Invalid food ID");
    }

    const existingCartItem = await Cart.findOne({
        user_id: userId,
        food_id: food_id,
    });

    // Food already exists in cart
    if (existingCartItem) {
        if (existingCartItem.quantity >= 20) {
            throw new AppError(
                400,
                "Maximum quantity allowed is 20"
            );
        }

        existingCartItem.quantity += 1;

        await existingCartItem.save();

        return existingCartItem;
    }

    // Food doesn't exist in cart
    const cartItem = await Cart.create({
        user_id: userId,
        food_id: food_id,
        quantity: 1,
    });

    return cartItem;
};


export const updateQuantity = async (
    food_id,
    userId,
    quantity
) => {
    await connectDB();

    const userCartItem = await Cart.findOne({
        user_id: userId,
        food_id: food_id,
    });

    if (!userCartItem) {
        throw new AppError(
            404,
            "Cart item not found"
        );
    }

    // Quantity must be between 1 and 20
    if (quantity < 1 || quantity > 20) {
        throw new AppError(
            400,
            "Quantity must be between 1 and 20"
        );
    }

    userCartItem.quantity = quantity;

    await userCartItem.save();

    return userCartItem;
};


export const deleteCartItem = async (
    food_id,
    userId
) => {
    await connectDB();

    const deletedCartItem = await Cart.findOneAndDelete({
        user_id: userId,
        food_id: food_id,
    });

    if (!deletedCartItem) {
        throw new AppError(
            404,
            "Cart item not found"
        );
    }

    return deletedCartItem;
};


export const clearCartItems = async (userId) => {
    await connectDB();

    const deletedCartItems = await Cart.deleteMany({
        user_id: userId,
    });

    return deletedCartItems;
};

export const mergeLoginGuestCartItems = async (guestCart, userId) => {
    await connectDB();

    if (!Array.isArray(guestCart)) {
        throw new AppError(400, "Guest cart must be an array");
    }

    const guestItems = guestCart.filter((item) => item?.food_id);

    for (const guestItem of guestItems) {
        const quantity = Number(guestItem.quantity);

        if (!mongoose.Types.ObjectId.isValid(guestItem.food_id)) {
            throw new AppError(400, "Invalid food ID");
        }

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
            throw new AppError(400, "Quantity must be between 1 and 20");
        }
    }

    for (const guestItem of guestItems) {
        const quantity = Number(guestItem.quantity);
        const existingItem = await Cart.findOne({
            user_id: userId,
            food_id: guestItem.food_id,
        });

        if (existingItem) {
            existingItem.quantity = Math.min(existingItem.quantity + quantity, 20);
            await existingItem.save();
            continue;
        }

        await Cart.create({
            user_id: userId,
            food_id: guestItem.food_id,
            quantity,
        });
    }

    return Cart.find({ user_id: userId }).lean();
};