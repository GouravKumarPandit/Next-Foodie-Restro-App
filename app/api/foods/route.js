import { apiResponse } from "../../../lib/apiResponse";
import { asyncHandler } from "../../../lib/asyncHandler";
import { validate } from "../../../lib/validate";
import { createFood, getFoods } from "../../../services/food.service";
import { foodSchema } from "../../../validators/food.validator";

export const GET = asyncHandler(async () => {
    const foods = await getFoods();

    return apiResponse("Food fetched successfully!", foods, 200);
});

export const POST = asyncHandler(async (request) => {
    const body = await request.json();

    const validatedData = validate(foodSchema, body);
    const food = await createFood(validatedData);

    return apiResponse("Food created successfully!", food, 201);
});