import connectDB from "../lib/db"
import { AppError } from "../lib/errors";
import Category from "../models/Category";
import Food from "../models/Food";

export const getFoodsForAdmin = async () => {
    await connectDB();

    const foods = await Food.find().populate("category", "name").lean();

    return foods;
}

export const getFoodsForCustomer = async (filters) => {
    await connectDB();

    const { search, category, foodType, cuisine, featured, priceMin, priceMax, availability } = filters;
    const query = {};

    if(search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { cuisine: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
        ];
    }
    if(category) {
        query.category = category;
    }
    if(foodType) {
        query.isVeg = foodType === "true";
    }
    if(cuisine) {
        query.cuisine = {
            $regex: cuisine,
            $options: "i",
        };
    };
    if(featured) {
        query.featured = featured === "true";
    }
    if (priceMin || priceMax) {
        const priceConditions = [];

        const effectivePrice = {
            $cond: [
                { $gt: ["$discountPrice", 0] },
                "$discountPrice",
                "$price",
            ],
        };

        if (priceMin) {
            priceConditions.push({
                $gte: [effectivePrice, Number(priceMin)],
            });
        }

        if (priceMax) {
            priceConditions.push({
                $lte: [effectivePrice, Number(priceMax)],
            });
        }

        query.$expr = {
            $and: priceConditions,
        };
    }
    if(availability) {
        query.isAvailable = availability === "true";
    }
    query.isActive = true;
    
    const result = await Food.find(query).populate("category", "name").lean();
    const cuisines = await Food.distinct("cuisine", { isActive: true });

    const foods = {
        foodData: result,
        cuisine: cuisines
    }

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
        preparationTime: formData.preparationTime,
        ingredients: formData.ingredients ?? [],
        servingSize: formData.servingSize ?? "",
        serves: formData.serves ?? 1,
        cuisine: formData.cuisine ?? "",
        tags: formData.tags ?? [],
        featured: formData.featured ?? false,
        rating: formData.rating ?? 0,
        reviewCount: formData.reviewCount ?? 0,
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
    food.ingredients = formData.ingredients ?? [];
    food.servingSize = formData.servingSize ?? "";
    food.serves = formData.serves ?? 1;
    food.cuisine = formData.cuisine ?? "";
    food.tags = formData.tags ?? [];
    food.featured = formData.featured ?? false;
    food.rating = formData.rating ?? 0;
    food.reviewCount = formData.reviewCount ?? 0;
    await food.save();

    return food;
}

export const deleteFood = async (id) => {
    await connectDB();

    const food = await Food.findByIdAndDelete(id);

    if(!food) throw new AppError(404, "Food not found!");

    return food;
}