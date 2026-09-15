import connectDB from "../lib/db"
import Category from "../models/Category";
import { AppError } from "../lib/errors";

export const getCategories = async () => {
    await connectDB();
    // const categories = await Category.find({ isActive: true }).lean();
    const categories = await Category.find().populate("parentCat", "name").lean();

    return categories;
}

export const createCategory = async (formData) => {
    await connectDB(); 
    const newCategory = new Category({
        name: formData.name,
        parentCat: formData.parentCat,
        description: formData.description || "",
        isActive: formData.isActive
    });

    await newCategory.save();

    return newCategory;
}

export const getCategoryById = async (id) => {
    await connectDB();

    const category = await Category.findById(id).lean();

    return category;
}

export const updateCategory = async (id, formData) => {
    await connectDB();
    const category = await Category.findById(id);
    
    if(!category) throw new AppError(404, "Category not found");

    const existingCategory = await Category.findOne({
        name: formData.name,
        _id: { $ne: id }
    });
    if (existingCategory) throw new AppError(409, "Category name already exists");

    category.name = formData.name;
    category.parentCat = formData.parentCat;
    category.description = formData.description ?? "";
    category.isActive = formData.isActive ?? true;
    await category.save();

    return category;
}

export const deleteCategory = async (id) => {
    await connectDB();
        
    const result = await Category.updateMany(
        { parentCat: id },
        {
            $set: {
                parentCat: null
            }
        }
    );

    const deletedCategory = await Category.findByIdAndDelete(id);

    if(!deletedCategory) throw new AppError(404, "Category not found");

    return deletedCategory;
}
