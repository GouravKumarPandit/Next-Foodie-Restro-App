import connectDB from "../lib/db"
import { AppError } from "../lib/errors";
import Category from "../models/Category";
import Food from "../models/Food";

export const getFoods = async () => {
    await connectDB();

    const foods = await Food.find().populate("category", "name").lean();

    return foods;
}

export const createFood = async (formData) => {
    await connectDB();

    const category = await Category.findById(formData.category);
    if(!category) throw new AppError(404, "Category not found");

    if (!category.isActive) {
        throw new AppError(400, "Category is inactive");
    }

    if ( formData.discountPrice != null && formData.price != null && formData.discountPrice >= formData.price ) {
        throw new AppError(
            400,
            "Discount price should be smaller than the original price."
        );
    }

    const food = new Food({
        name: formData.name,
        description: formData.description ?? "",
        // image: formData.image,
        category: formData.category,
        price: formData.price ?? 0,
        discountPrice: formData.discountPrice ?? 0,
        isVeg: formData.isVeg ?? true,
        isAvailable: formData.isAvailable ?? true,
        isActive: formData.isActive ?? true,
        preparationTime: formData.preparationTime
    });

    await food.save();

    return food;
}

export const getFoodById = async (id) => {
    await connectDB();

    const food = await Food.findById(id).populate("category", "name").lean();

    return food; 
}

export const updateFood = async (id, formData) => {
    await connectDB();

    const category = await Category.findById(formData.category);
    if(!category) throw new AppError(404, "Category not found");

    if (!category.isActive) {
        throw new AppError(400, "Category is inactive");
    }

    if ( formData.discountPrice != null && formData.price != null && formData.discountPrice >= formData.price ) {
        throw new AppError(
            400,
            "Discount price should be smaller than the original price."
        );
    }

    const food = await Food.findById(id);
        
    if(!food) throw new AppError(404, "Food not found!");

    const existFood = await Food.findOne({
        name: formData.name,
        _id: { $ne: id }
    });

    if(existFood) throw new AppError(409, "Food name already exists!");

    food.name = formData.name;
    food.description = formData.description ?? "";
    // food.image: formData.image;
    food.category = formData.category;
    food.price = formData.price ?? 0.00;
    food.discountPrice = formData.discountPrice ?? 0.00;
    food.isVeg = formData.isVeg ?? true;
    food.isAvailable = formData.isAvailable ?? true;
    food.isActive = formData.isActive ?? true;
    food.preparationTime = formData.preparationTime;
    await food.save();

    return food;
}

export const deleteFood = async (id) => {
    await connectDB();

    const food = await Food.findByIdAndDelete(id);

    if(!food) throw new AppError(404, "Food not found!");

    return food;
}