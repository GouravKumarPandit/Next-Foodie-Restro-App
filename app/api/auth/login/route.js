import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { validate } from "../../../../lib/validate";
import { login } from "../../../../services/auth.service";
import { loginSchema } from "../../../../validators/login.validator";

export const POST = asyncHandler(async (request) => {
    const body = await request.json();

    const validatedData = validate(loginSchema, body);
    const user = await login(validatedData);

    return apiResponse("Logged-in successfully!", user, 200);
});
