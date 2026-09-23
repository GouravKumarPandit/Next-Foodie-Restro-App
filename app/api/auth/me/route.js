import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { getCurrentUser } from "../../../../lib/auth";
import { AppError } from "../../../../lib/errors";

export const GET = asyncHandler(async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw new AppError(401, "Unauthorized");
    }

    return apiResponse("User fetched successfully!", user, 200);
});
