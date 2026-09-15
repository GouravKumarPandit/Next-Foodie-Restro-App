import { createCategory, getCategories } from "../../../services/category.service";
import { apiResponse } from "../../../lib/apiResponse";
import { asyncHandler } from "../../../lib/asyncHandler";
import { categorySchema } from "../../../validators/category.validator";
import { validate } from "../../../lib/validate";

export const GET = asyncHandler(async (request) => {
    const categories = await getCategories();

    return apiResponse("Categories fetched successfully!", categories, 200);
});

export const POST = asyncHandler(async (request) => {
    const body = await request.json();

    const validatedData = validate(categorySchema, body);
    const category = await createCategory(validatedData);

    return apiResponse("Category created successfully!", category, 201);
});