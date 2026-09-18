"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FileInput from "@/components/ui/FileInput";
import Button from "@/components/ui/Button";
import CancelButton from "@/components/ui/CancelButton";
import Checkbox from "@/components/ui/Checkbox";
import TextArea from "@/components/ui/TextArea";
import FormSection from "@/components/ui/FormSection";
import TagInput from "@/components/ui/TagInput";
import RadioGroup from "@/components/ui/RadioGroup";

export const defaultFoodFormData = {
    name: "",
    description: "",
    category: "",
    price: 0,
    discountPrice: 0,
    isVeg: true,
    isAvailable: true,
    isActive: true,
    preparationTime: 0,
    ingredients: [],
    servingSize: "",
    serves: 1,
    cuisine: "",
    tags: [],
    featured: false,
    rating: 0,
    reviewCount: 0,
};

export const defaultFoodFormError = {
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    isVeg: "",
    isAvailable: "",
    isActive: "",
    preparationTime: "",
    ingredients: "",
    servingSize: "",
    serves: "",
    cuisine: "",
    tags: "",
    featured: "",
    rating: "",
    reviewCount: "",
};

export const buildFoodPayload = (formData) => ({
    ...formData,
    price: Number(formData.price),
    discountPrice: Number(formData.discountPrice),
    preparationTime: Number(formData.preparationTime),
    serves: Number(formData.serves),
    rating: Number(formData.rating),
    reviewCount: Number(formData.reviewCount),
    ingredients: Array.isArray(formData.ingredients) ? formData.ingredients : [],
    tags: Array.isArray(formData.tags) ? formData.tags : [],
});

export default function FoodForm({
    formData,
    error,
    categories,
    onChange,
    onSubmit,
    submitLabel,
    showCurrentImage = false,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            {showCurrentImage && (
                <div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                        Current Image
                    </p>

                    <div className="h-32 w-32 overflow-hidden rounded-xl bg-gray-100">
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            Food Image
                        </div>
                    </div>
                </div>
            )}

            <FormSection
                title="Basic Information"
                description="Name, category, and description of this food item"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Input
                        label="Food Name"
                        name="name"
                        placeholder="Enter food name"
                        required
                        value={formData.name}
                        onChange={onChange}
                        errorMessage={error.name}
                    />

                    <Select
                        label="Category"
                        name="category"
                        id="category"
                        options={categories}
                        required
                        value={formData.category}
                        onChange={onChange}
                        errorMessage={error.category}
                    />
                </div>

                <div className="mt-6">
                    <TextArea
                        label="Description"
                        name="description"
                        rows={5}
                        placeholder="Enter food description"
                        value={formData.description}
                        onChange={onChange}
                        errorMessage={error.description}
                    />
                </div>

                <div className="mt-6">
                    <FileInput
                        label="Food Image"
                        name="image"
                        accept="image/png,image/jpeg,image/webp"
                    />
                </div>
            </FormSection>

            <FormSection
                title="Pricing"
                description="Set the original price and an optional discount price"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        min="0"
                        placeholder="Enter food price"
                        required
                        value={formData.price}
                        onChange={onChange}
                        errorMessage={error.price}
                    />

                    <Input
                        label="Discount Price"
                        name="discountPrice"
                        type="number"
                        min="0"
                        placeholder="Enter discount price"
                        value={formData.discountPrice}
                        onChange={onChange}
                        errorMessage={error.discountPrice}
                    />
                </div>
            </FormSection>

            <FormSection
                title="Serving Details"
                description="How this dish is prepared and served"
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Input
                        label="Serving Size"
                        name="servingSize"
                        placeholder="e.g. Regular, Family pack"
                        value={formData.servingSize}
                        onChange={onChange}
                        errorMessage={error.servingSize}
                    />

                    <Input
                        label="Serves"
                        name="serves"
                        type="number"
                        min="1"
                        placeholder="Number of people"
                        value={formData.serves}
                        onChange={onChange}
                        errorMessage={error.serves}
                    />

                    <Input
                        label="Cuisine"
                        name="cuisine"
                        placeholder="e.g. Indian, Italian"
                        value={formData.cuisine}
                        onChange={onChange}
                        errorMessage={error.cuisine}
                    />

                    <Input
                        label="Preparation Time (minutes)"
                        name="preparationTime"
                        type="number"
                        min="0"
                        placeholder="Enter preparation time"
                        value={formData.preparationTime}
                        onChange={onChange}
                        errorMessage={error.preparationTime}
                    />
                </div>
            </FormSection>

            <FormSection
                title="Ingredients & Tags"
                description="Add ingredients and tags to help customers find this food"
            >
                <div className="grid grid-cols-1 gap-6">
                    <TagInput
                        label="Ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={onChange}
                        placeholder="Add an ingredient"
                        errorMessage={error.ingredients}
                    />

                    <TagInput
                        label="Tags"
                        name="tags"
                        value={formData.tags}
                        onChange={onChange}
                        placeholder="Add a tag"
                        errorMessage={error.tags}
                    />
                </div>
            </FormSection>

            <FormSection
                title="Classification & Visibility"
                description="Food type and how this item appears to customers"
            >
                <RadioGroup
                    label="Food Type"
                    description="Select whether this food is vegetarian"
                    name="isVeg"
                    value={formData.isVeg}
                    onChange={onChange}
                    errorMessage={error.isVeg}
                    options={[
                        { label: "Vegetarian", value: true },
                        { label: "Non-Vegetarian", value: false },
                    ]}
                />

                <div className="mt-6 space-y-3">
                    <Checkbox
                        label="Available"
                        description="Customers can order this food"
                        name="isAvailable"
                        value={formData.isAvailable}
                        onChange={onChange}
                        errorMessage={error.isAvailable}
                        checked={formData.isAvailable === true}
                    />

                    <Checkbox
                        label="Active Food"
                        description="Allow customers to see this food"
                        name="isActive"
                        value={formData.isActive}
                        onChange={onChange}
                        errorMessage={error.isActive}
                        checked={formData.isActive === true}
                    />

                    <Checkbox
                        label="Featured"
                        description="Highlight this food on the homepage and featured lists"
                        name="featured"
                        value={formData.featured}
                        onChange={onChange}
                        errorMessage={error.featured}
                        checked={formData.featured === true}
                    />
                </div>
            </FormSection>

            <FormSection
                title="Ratings"
                description="Optional starting values. These are usually updated from customer reviews."
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Input
                        label="Rating"
                        name="rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="0 to 5"
                        value={formData.rating}
                        onChange={onChange}
                        errorMessage={error.rating}
                    />

                    <Input
                        label="Review Count"
                        name="reviewCount"
                        type="number"
                        min="0"
                        placeholder="Number of reviews"
                        value={formData.reviewCount}
                        onChange={onChange}
                        errorMessage={error.reviewCount}
                    />
                </div>
            </FormSection>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <CancelButton label="Cancel" href="/admin/foods" />
                <Button label={submitLabel} type="submit" />
            </div>
        </form>
    );
}
