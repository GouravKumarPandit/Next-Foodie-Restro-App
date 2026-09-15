"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeaderCard from "../../../../components/admin/PageHeaderCard";
import Input from "../../../../components/ui/Input";
import TextArea from "../../../../components/ui/TextArea";
import FileInput from "../../../../components/ui/FileInput";
import Button from "../../../../components/ui/Button";
import CancelButton from "../../../../components/ui/CancelButton";
import Checkbox from "../../../../components/ui/Checkbox";
import { toast } from "react-toastify";
import Select from "../../../../components/ui/Select";

export default function CreateCategory() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        parentCat: "",
        description: "",
        isActive: true
    });

    const [error, setError] = useState({
        name: "",
        parentCat: "",
        description: "",
        isActive: ""
    });

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        setError((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
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
                router.push("/admin/categories");
            }
        } catch (error) {
            console.log("Create Category Error >> ", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                setCategoryLoading(true);

                const response = await fetch("/api/categories");
                const result = await response.json();

                if (result.success) {
                    setCategories(
                        result.data.map((category) => ({
                            key: category._id,
                            value: category.name,
                        }))
                    );
                }
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!")
            } finally {
                setCategoryLoading(false);
            }
        };

        getCategories();
    }, []);

    return (
        <div>
            <PageHeaderCard title={'Create Category'} description={'Add a new food category'} backHref="/admin/categories" />

            <form onSubmit={handleSubmit}>
                <div className="max-w-3xl rounded-xl border border-gray-200 bg-white p-6">
                    <div className="space-y-6">
                        <Input
                            label="Category Name"
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={formData.name}
                            onChange={handleChange}
                            errorMessage={error.name}
                            required
                        />

                        <Select
                            label="Parent Category" 
                            options={categories} 
                            name="parentCat"
                            value={formData.parentCat}
                            onChange={handleChange}
                            errorMessage={error.parentCat}
                            loading={categoryLoading}
                            notes={"Leave empty if this is a parent category"}
                        />

                        <TextArea 
                            label={"Description"} 
                            name="description" 
                            rows={5} 
                            placeholder="Enter category description" 
                            value={formData.description}
                            onChange={handleChange}
                            errorMessage={error.description}
                        />

                        <FileInput 
                            label="Category Image"
                            name="image"
                            accept="image/png,image/jpeg,image/webp"
                            // required
                        />

                        <Checkbox
                            label="Active Category"
                            description="Allow customers to see this category"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            errorMessage={error.isActive}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t border-orange-200 pt-5">
                            <CancelButton label={"Cancel"} href={"/admin/categories"} />
                            <Button label="Add Category" type="submit"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}