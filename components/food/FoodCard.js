"use client";

import Link from "next/link";
import { Clock3, Plus, Star, Leaf, Flame, Users } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";
import Quantity from "./Quantity";
import { useEffect, useState } from "react";

function FoodCard({ food }) {
    const { cart, addToCart } = useCart();
    const [foodPresent, setFoodPresent] = useState(false);
    const [existingFood, setExistingFood] = useState({});
    const foodId = food?._id || food?.id;
    const hasDiscount =
        food?.discountPrice > 0 &&
        food?.discountPrice < food?.price;
    const categoryName =
        typeof food?.category === "object"
            ? food?.category?.name
            : food?.category;
    const tags = Array.isArray(food?.tags) ? food.tags.slice(0, 3) : [];

    const findFoodPresentInCart = () => {
        setFoodPresent(false);
        cart.forEach((item) => {
            if(item.food_id === food._id) {
                setFoodPresent(true);
                setExistingFood(item);
            }
        })
    }

    useEffect(() => {
        if(cart.length){
            findFoodPresentInCart();
        }
    }, [cart])

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/50">
            {foodId && (
                <Link
                    href={`/food/${foodId}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${food?.name || "food"} details`}
                />
            )}

            {/* Image Section */}
            <div className="relative h-52 overflow-hidden bg-orange-50 sm:h-56">

                <img
                    src={food?.image || "Food"}
                    // alt={food?.name || "Food"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                        <Flame size={13} />
                        {Math.round(
                            ((food.price - food.discountPrice) /
                                food.price) *
                                100
                        )}
                        % OFF
                    </div>
                )}

                {/* Veg / Non-Veg */}
                <div className="absolute right-3 top-3">
                    {food?.isVeg ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-white/95 px-2.5 py-1 text-xs font-semibold text-green-600 shadow-sm">
                            <Leaf size={13} />
                            Veg
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-white/95 px-2.5 py-1 text-xs font-semibold text-red-600 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            Non-Veg
                        </span>
                    )}
                </div>

                {food?.featured && (
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        <Star size={13} fill="currentColor" />
                        Featured
                    </div>
                )}

                {/* Availability */}
                {!food?.isAvailable && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700">
                            Currently Unavailable
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                    {categoryName && (
                        <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600">
                            {categoryName}
                        </span>
                    )}

                    {food?.rating > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600">
                            <Star
                                size={14}
                                className="text-yellow-500"
                                fill="currentColor"
                            />
                            {food.rating}
                            {food?.reviewCount > 0 && (
                                <span className="text-gray-400">
                                    ({food.reviewCount})
                                </span>
                            )}
                        </span>
                    )}
                </div>

                <h3 className="mt-3 line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-orange-500">
                    {food?.name || "Delicious Food"}
                </h3>

                {food?.cuisine && (
                    <p className="mt-1 text-xs font-medium text-gray-400">
                        {food.cuisine}
                    </p>
                )}

                <p className="mt-1.5 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                    {food?.description ||
                        "Delicious and freshly prepared food made just for you."}
                </p>

                {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {food?.preparationTime > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={14} className="text-orange-500" />
                            Ready in {food.preparationTime} mins
                        </span>
                    )}

                    {food?.serves > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                            <Users size={14} className="text-orange-500" />
                            Serves {food.serves}
                        </span>
                    )}
                </div>

                {food?.servingSize && (
                    <p className="mt-1.5 text-xs text-gray-400">
                        {food.servingSize}
                    </p>
                )}

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        {hasDiscount ? (
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">
                                    ₹{food.discountPrice}
                                </span>

                                <span className="text-sm text-gray-400 line-through">
                                    ₹{food.price}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-bold text-gray-900">
                                ₹{food?.price || 0}
                            </span>
                        )}

                        <p className="mt-0.5 text-[11px] text-gray-400">
                            Inclusive of all taxes
                        </p>
                    </div>

                    { 
                        foodPresent && existingFood ? 
                        <Quantity food_id={existingFood.food_id} quantity={existingFood.quantity} /> : 
                        <Button 
                            label={
                                <>
                                    <Plus size={17} strokeWidth={2.5} />
                                    Add
                                </>
                            }
                            onClick={async (event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                await addToCart(food._id);
                            }}
                            disabled={!food?.isAvailable}
                            className="relative z-20"
                        /> 
                    }
                </div>
            </div>
        </div>
    );
}

export default FoodCard;
