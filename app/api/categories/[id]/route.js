import { deleteCategory, getCategoryById, updateCategory } from "../../../../services/category.service";
import mongoose from "mongoose";
import { AppError } from "../../../../lib/errors";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { apiResponse } from "../../../../lib/apiResponse";
import { categorySchema } from "../../../../validators/category.validator";
import { validate } from "../../../../lib/validate";

export const GET = asyncHandler(async (request, { params }) => {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid category ID");
    }

    const category = await getCategoryById(id);

    if(!category) {
        throw new AppError(404, "Category not found!");
    }

    return apiResponse("Category fetched successfully!", category, 200);
});

export const PUT = asyncHandler(async (request, { params }) => {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid category ID");
    }

    const body = await request.json();

    const validatedData = validate(categorySchema, body);

    const category = await updateCategory(id, validatedData);

    return apiResponse("Category updated successfully!", category, 200);
});

export const DELETE = asyncHandler(async (request, { params }) => {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid category ID");
    }

    const category = await deleteCategory(id);

    return apiResponse("Category deleted successfully!", category, 200);
});