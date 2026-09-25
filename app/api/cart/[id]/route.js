import mongoose from "mongoose";

import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { AppError } from "../../../../lib/errors";
import { requireAuth } from "../../../../lib/auth";

import {
    updateQuantity,
    deleteCartItem,
} from "../../../../services/cart.service";


export const PATCH = asyncHandler(async (request, { params }) => {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid food ID");
    }

    const body = await request.json();

    if (
        !Number.isInteger(body.quantity) ||
        body.quantity < 1 ||
        body.quantity > 20
    ) {
        throw new AppError(
            400,
            "Quantity must be between 1 and 20"
        );
    }

    const user = await requireAuth();

    const cartItem = await updateQuantity(
        id,
        user._id,
        body.quantity
    );

    return apiResponse(
        "Cart quantity updated successfully!",
        cartItem,
        200
    );
});

export const DELETE = asyncHandler(async (request, { params }) => {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(
            400,
            "Invalid food ID"
        );
    }

    const user = await requireAuth();

    const cartItem = await deleteCartItem(
        id,
        user._id
    );

    return apiResponse(
        "Cart item deleted successfully!",
        cartItem,
        200
    );
});