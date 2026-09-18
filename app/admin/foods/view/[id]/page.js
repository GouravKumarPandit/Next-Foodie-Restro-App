"use client";

import {
    Clock,
    Leaf,
    CircleOff,
    CheckCircle2,
    XCircle,
    Star,
    Users,
    UtensilsCrossed,
} from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerPageHeaderCard from "../../../../../components/admin/InnerPageHeaderCard";

function InfoItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium text-gray-800">
                {value || "--"}
            </p>
        </div>
    );
}

function ChipList({ items, emptyLabel = "--" }) {
    if (!items?.length) {
        return (
            <p className="mt-2 text-sm text-gray-500">
                {emptyLabel}
            </p>
        );
    }

    return (
        <div className="mt-2 flex flex-wrap gap-2">
            {items.map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                >
                    {item}
                </span>
            ))}
        </div>
    );
}

export default function ViewFoodPage() {
    const params = useParams();
    const id = params.id; 
    const [food, setFood] = useState({});

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

            setFood(result.data);
        } catch (error) {
            console.log("Fetch food error >> ", error);
            toast.error("Something went wrong. Please try again.")
        }
    }

    useEffect(() => {
        if(id) fetchFood();
    }, [id])

    return (
        <div className="space-y-6">
            <InnerPageHeaderCard title={"Food Details"} description={"View food item information"} buttonText={"Edit Food"} buttonHref={`/admin/foods/edit/${food._id}`} back={"Back to Foods"} backHref={"/admin/foods"} />

            {/* Main Details */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Image */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                            Food Image
                        </div>
                    </div>
                </div>

                {/* Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                    <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {food.name}
                                </h2>

                                {food.featured && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                                        <Star size={12} />
                                        Featured
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                {food?.category?.name ? food.category.name : "--"}
                            </p>
                        </div>

                        {food.isVeg ? (
                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600">
                                <Leaf size={14} />
                                Vegetarian
                            </span>
                        ) : (
                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                                <CircleOff size={14} />
                                Non-Vegetarian
                            </span>
                        )}

                    </div>

                    {/* Description */}
                    <div className="border-b border-gray-100 py-5">
                        <p className="mb-2 text-sm font-medium text-gray-700">
                            Description
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                            {food?.description ? food.description : "--"}
                        </p>
                    </div>

                    {/* Price */}
                    <div className="grid grid-cols-1 gap-5 border-b border-gray-100 py-5 sm:grid-cols-3">
                        <div>
                            <p className="text-xs text-gray-400">
                                Original Price
                            </p>

                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                ₹{food.price}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Discount Price
                            </p>

                            <p className="mt-1 text-lg font-semibold text-orange-600">
                                ₹{food.discountPrice || food.price}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Preparation Time
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-gray-900">
                                <Clock size={17} />
                                {food.preparationTime} min
                            </p>
                        </div>
                    </div>

                    {/* Serving */}
                    <div className="grid grid-cols-1 gap-5 border-b border-gray-100 py-5 sm:grid-cols-3">
                        <div>
                            <p className="text-xs text-gray-400">
                                Serving Size
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                <UtensilsCrossed size={16} />
                                {food.servingSize || "--"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Serves
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800">
                                <Users size={16} />
                                {food.serves
                                    ? `${food.serves} ${food.serves === 1 ? "person" : "people"}`
                                    : "--"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Cuisine
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-800">
                                {food.cuisine || "--"}
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="grid grid-cols-1 gap-5 border-b border-gray-100 py-5 sm:grid-cols-2">
                        <div>
                            <p className="text-xs text-gray-400">
                                Rating
                            </p>

                            <p className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-gray-900">
                                <Star size={17} className="fill-amber-400 text-amber-400" />
                                {food.rating ?? 0} / 5
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">
                                Reviews
                            </p>

                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                {food.reviewCount ?? 0}
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-3">
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-400">
                                Availability
                            </p>

                            <div className="mt-2">
                                {food.isAvailable ? (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                                        <CheckCircle2 size={17} />
                                        Available
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                                        <XCircle size={17} />
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-400">
                                Status
                            </p>

                            <div className="mt-2">
                                {food.isActive ? (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                                        <CheckCircle2 size={17} />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
                                        <XCircle size={17} />
                                        Inactive
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <p className="text-xs text-gray-400">
                                Featured
                            </p>

                            <div className="mt-2">
                                {food.featured ? (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600">
                                        <Star size={17} />
                                        Featured
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
                                        <XCircle size={17} />
                                        Not featured
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900">
                        Ingredients
                    </h2>
                    <ChipList items={food.ingredients} emptyLabel="No ingredients added" />
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900">
                        Tags
                    </h2>
                    <ChipList items={food.tags} emptyLabel="No tags added" />
                </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-gray-900">
                    Additional Information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoItem label="Food Name" value={food.name} />
                    <InfoItem label="Category" value={food?.category?.name} />
                    <InfoItem label="Slug" value={food.slug} />
                    <InfoItem label="Cuisine" value={food.cuisine} />
                    <InfoItem label="Serving Size" value={food.servingSize} />
                    <InfoItem label="Serves" value={food.serves} />
                </div>
            </div>
        </div>
    );
}
