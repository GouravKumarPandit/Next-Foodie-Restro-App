import { apiResponse } from "../../../lib/apiResponse";
import { asyncHandler } from "../../../lib/asyncHandler";
import { validate } from "../../../lib/validate";
import { createFood, getFoodsForAdmin, getFoodsForCustomer } from "../../../services/food.service";
import { foodSchema } from "../../../validators/food.validator";

export const GET = asyncHandler(async (request) => {
    // Here we will call the function according to role. 
    // For admin 
    // const foods = await getFoodsForAdmin();

    // For Customer 
    const { searchParams } = new URL(request.url);

    const filters = {
        search: searchParams.get("search"),
        category: searchParams.get("category"),
        foodType: searchParams.get("foodType"),
        cuisine: searchParams.get("cuisine"),
        featured: searchParams.get("featured"),
        priceMin: searchParams.get("priceMin"),
        priceMax: searchParams.get("priceMax"),
        availability: searchParams.get("availability"),
    };

    const foods = await getFoodsForCustomer(filters);

    return apiResponse("Food fetched successfully!", foods, 200);
});

export const POST = asyncHandler(async (request) => {
    const body = await request.json();

    const validatedData = validate(foodSchema, body);
    const food = await createFood(validatedData);

    return apiResponse("Food created successfully!", food, 201);
});