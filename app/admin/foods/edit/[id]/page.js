"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FileInput from "@/components/ui/FileInput";
import Button from "@/components/ui/Button";
import CancelButton from "@/components/ui/CancelButton";
import Checkbox from "@/components/ui/Checkbox";
import InnerPageHeaderCard from "../../../../../components/admin/InnerPageHeaderCard";
import TextArea from "../../../../../components/ui/TextArea";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormLoader from "../../../../../components/ui/FormLoader";
import { toast } from "react-toastify";

export default function EditFoodPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id; 
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        discountPrice: 0,
        isVeg: true,
        isAvailable: true,
        isActive: true,
        preparationTime: 0,
    });

    const [error, setError] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        discountPrice: "",
        isVeg: "",
        isAvailable: "",
        isActive: "",
        preparationTime: "",
    });

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: type === "checkbox" ? checked : type === "radio" ? value === "true" : value,
        }));

        setError((prev) => ({
            ...prev, 
            [name]: ""
        }));
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if (result.success) {
                setCategories(
                    result.data.map((category) => ({
                        key: category._id,
                        value: category.name,
                    }))
                );
            }
        } catch (error) {
            console.log("Fetch category error >> ", error);
            toast.error("Something went wrong. Please try again!");
        }
    }

    const fetchFood = async () => {
        try {
            const response = await fetch(`/api/foods/${id}`);
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if(!result.success) {
                toast.error(result.message);
                return;
            }
            setFormData(() => ({
                name: result.data.name,
                description: result.data.description,
                category: result.data.category._id,
                price: result.data.price,
                discountPrice: result.data.discountPrice,
                isVeg: result.data.isVeg,
                isAvailable: result.data.isAvailable,
                isActive: result.data.isActive,
                preparationTime: result.data.preparationTime
            }));
        } catch (error) {
            console.log("Fetch food error >> ", error);
            toast.error("Something went wrong. Please try again.")
        } finally{
            setLoading(false);
        }
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            ...formData,
            price: Number(formData.price),
            discountPrice: Number(formData.discountPrice),
            preparationTime: Number(formData.preparationTime),
        };
        try {
            const response = await fetch(`/api/foods/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            if (!response.ok) {
                toast.error(result.message);

                if (result.errors?.length) {
                    result.errors.forEach((error) => {
                        const name = error.path[0];

                        setError((prev) => ({
                            ...prev,
                            [name]: error.message
                        }));
                    });
                }

                return;
            }

            if (result.success) {
                toast.success(result.message);
                router.push("/admin/foods");
            }
        } catch (error) {
            console.log("Create Food Error >> ", error);
            toast.error("Something went wrong. Please try again.");
        }
    }

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                await Promise.all([
                    fetchFood(),
                    fetchCategories()
                ]);
            };

            fetchData();
        }
    }, [id]);

    return (
        <div className="space-y-6">
            <InnerPageHeaderCard title={"Edit Food"} description={"Update food item information"} back={"Back to Foods"} backHref={"/admin/foods"} />

            {
                !loading ? 
                <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-6">
                        <p className="mb-2 text-sm font-medium text-gray-700">
                            Current Image
                        </p>

                        <div className="h-32 w-32 overflow-hidden rounded-xl bg-gray-100">
                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                Food Image
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Input
                            label="Food Name"
                            name="name"
                            placeholder="Enter food name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            errorMessage={error.name}
                        />

                        <Select
                            label="Category"
                            name="category"
                            id="category"
                            options={categories}
                            required
                            value={formData.category}
                            onChange={handleChange}
                            errorMessage={error.category}
                        />

                        <Input
                            label="Price"
                            name="price"
                            type="number"
                            min="0"
                            placeholder="Enter food price"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            errorMessage={error.price}
                        />

                        <Input
                            label="Discount Price"
                            name="discountPrice"
                            type="number"
                            min="0"
                            placeholder="Enter discount price"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            errorMessage={error.discountPrice}
                        />

                        <Input
                            label="Preparation Time"
                            name="preparationTime"
                            type="number"
                            min="0"
                            placeholder="Enter preparation time"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            errorMessage={error.preparationTime}
                        />
                    </div>

                    <div className="mt-6">
                        <TextArea 
                            label={"Description"} 
                            name="description" 
                            rows={5} 
                            placeholder="Enter food description" 
                            value={formData.description}
                            onChange={handleChange}
                            errorMessage={error.description}
                        />

                        <FileInput
                            label="Food Image"
                            name="image"
                            accept="image/png,image/jpeg,image/webp"
                        />
                    </div>

                    <div className="mt-6">
                        <div className="rounded-lg border border-gray-200 p-4">
                            <p className="text-sm font-medium text-gray-800">
                                Food Type
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Select whether this food is vegetarian
                            </p>

                            <div className="mt-4 flex flex-wrap gap-6">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="isVeg"
                                        value="true"
                                        checked={formData.isVeg === true}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-orange-500"
                                    />

                                    <span className="text-sm text-gray-700">
                                        Vegetarian
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="isVeg"
                                        value="false"
                                        checked={formData.isVeg === false}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-orange-500"
                                    />

                                    <span className="text-sm text-gray-700">
                                        Non-Vegetarian
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <Checkbox
                            label="Available"
                            description="Customers can order this food"
                            name="isAvailable"
                            value={formData.isAvailable}
                            onChange={handleChange}
                            errorMessage={error.isAvailable}
                            checked={formData.isAvailable === true}
                        />

                        <Checkbox
                            label="Active Food"
                            description="Allow customers to see this food"
                            name="isActive"
                            value={formData.isActive}
                            onChange={handleChange}
                            errorMessage={error.isActive}
                            checked={formData.isActive === true}
                        />
                    </div>

                    <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <CancelButton label="Cancel" href="/admin/foods" />
                        <Button label="Update Food" type="submit" />
                    </div>
                </form> : 
                <FormLoader />
            }
        </div>
    );
}