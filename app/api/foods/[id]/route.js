import mongoose from "mongoose";
import { apiResponse } from "../../../../lib/apiResponse";
import { asyncHandler } from "../../../../lib/asyncHandler";
import { AppError } from "../../../../lib/errors";
import { validate } from "../../../../lib/validate";
import { deleteFood, getFoodById, updateFood } from "../../../../services/food.service";
import { foodSchema } from "../../../../validators/food.validator";

export const GET = asyncHandler(async (request, { params }) => {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid food ID");
    }

    const food = await getFoodById(id);

    if(!food) throw new AppError(404, "Food not found!");

    return apiResponse("Food fetched successfully!", food, 200);
});

export const PUT = asyncHandler(async (request, { params }) => {
    const { id } = await params; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid food ID");
    }

    const body = await request.json();

    const validateData = validate(foodSchema, body);

    const food = await updateFood(id, validateData);

    return apiResponse("Food updated successfully!", food, 200);
});

export const DELETE = asyncHandler(async (request, { params }) => {
    const { id } = await params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError(400, "Invalid food ID!");
    }

    const deletedFood = await deleteFood(id);

    return apiResponse("Food deleted successfully!", deletedFood, 200);
});