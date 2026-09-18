"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InnerPageHeaderCard from "../../../../components/admin/InnerPageHeaderCard";
import FoodForm, {
    buildFoodPayload,
    defaultFoodFormData,
    defaultFoodFormError,
} from "../../../../components/admin/food/FoodForm";

export default function CreateFoodPage() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = buildFoodPayload(formData);
        try {
            const response = await fetch("/api/foods", {
                method: "POST",
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
        fetchCategories();
    }, []);

    return (
        <div className="space-y-6">
            <InnerPageHeaderCard title={"Create Food"} description={"Add a new food item to your restaurant"} back={"Back to Foods"} backHref={"/admin/foods"} />

            <FoodForm
                formData={formData}
                error={error}
                categories={categories}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Create Food"
            />
        </div>
    );
}
