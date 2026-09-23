import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { deleteSession } from "../../../../lib/session";

export const POST = asyncHandler(async () => {
    await deleteSession();

    return apiResponse("Logged out successfully!", null, 200);
});
