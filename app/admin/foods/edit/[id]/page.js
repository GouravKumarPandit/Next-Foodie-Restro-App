"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InnerPageHeaderCard from "../../../../../components/admin/InnerPageHeaderCard";
import FormLoader from "../../../../../components/ui/FormLoader";
import FoodForm, {
    buildFoodPayload,
    defaultFoodFormData,
    defaultFoodFormError,
} from "../../../../../components/admin/food/FoodForm";

export default function EditFoodPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id; 
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(defaultFoodFormData);
    const [error, setError] = useState(defaultFoodFormError);

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

            const food = result.data;
            setFormData({
                name: food.name ?? "",
                description: food.description ?? "",
                category: food.category?._id ?? "",
                price: food.price ?? 0,
                discountPrice: food.discountPrice ?? 0,
                isVeg: food.isVeg ?? true,
                isAvailable: food.isAvailable ?? true,
                isActive: food.isActive ?? true,
                preparationTime: food.preparationTime ?? 0,
                ingredients: food.ingredients ?? [],
                servingSize: food.servingSize ?? "",
                serves: food.serves ?? 1,
                cuisine: food.cuisine ?? "",
                tags: food.tags ?? [],
                featured: food.featured ?? false,
                rating: food.rating ?? 0,
                reviewCount: food.reviewCount ?? 0,
            });
        } catch (error) {
            console.log("Fetch food error >> ", error);
            toast.error("Something went wrong. Please try again.")
        } finally{
            setLoading(false);
        }
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = buildFoodPayload(formData);
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
                <FoodForm
                    formData={formData}
                    error={error}
                    categories={categories}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitLabel="Update Food"
                    showCurrentImage
                /> : 
                <FormLoader />
            }
        </div>
    );
}
