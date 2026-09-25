import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { requireAuth } from "../../../../lib/auth";
import { mergeLoginGuestCartItems } from "../../../../services/cart.service";

export const POST = asyncHandler(async (request) => {
    const user = await requireAuth();
    const body = await request.json();
    const mergeResult = await mergeLoginGuestCartItems(body.guestCart, user._id);

    return apiResponse(
        "Login and Guest cart items merged successfully!",
        mergeResult,
        200
    );
});