import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { validate } from "../../../../lib/validate";
import { CreateUser } from "../../../../services/auth.service";
import { userSchema } from "../../../../validators/auth.validator";

export const POST = asyncHandler(async (request) => {
    const body = await request.json();

    const validatedData = validate(userSchema, body);
    const data = await CreateUser(validatedData);

    return apiResponse("Account created successfully!", data, 201);
});
