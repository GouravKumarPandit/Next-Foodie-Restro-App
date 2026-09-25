import { apiResponse } from "../../../lib/apiResponse";
import { asyncHandler } from "../../../lib/asyncHandler";
import { requireAuth } from "../../../lib/auth";

import {
    getCart,
    createCart,
    clearCartItems,
} from "../../../services/cart.service";

export const GET = asyncHandler(async () => {
    const user = await requireAuth();
    const cart = await getCart(user._id);

    return apiResponse(
        cart.length === 0
            ? "Cart is empty!"
            : "Cart fetched successfully!",
        cart,
        200
    );
});

export const POST = asyncHandler(async (request) => {
    const user = await requireAuth();
    const body = await request.json();
    const cartItem = await createCart(
        body,
        user._id
    );

    return apiResponse(
        "Food added to cart successfully!",
        cartItem,
        201
    );
});

export const DELETE = asyncHandler(async () => {
    const user = await requireAuth();

    const result = await clearCartItems(user._id);

    return apiResponse(
        "Cart cleared successfully!",
        result,
        200
    );
});