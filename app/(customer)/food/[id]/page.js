"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Leaf,
    CircleOff,
    Clock3,
    ShoppingCart,
    Minus,
    Plus,
    CheckCircle2,
    XCircle,
    Star,
    Users,
    UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import PageHeader from "../../../../components/layout/PageHeader";
import Quantity from "../../../../components/food/Quantity";
import Button from "../../../../components/ui/Button";
import { useCart } from "../../../../context/CartContext";

export default function FoodDetailsPage() {
    const { cart, addToCart } = useCart();
    const [foodPresent, setFoodPresent] = useState(false);
    const [existingFood, setExistingFood] = useState({});
    const params = useParams();
    const id = params?.id;
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

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
        if(cart.length && food){
            findFoodPresentInCart();
        }
    }, [cart, food])

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchFood = async () => {
            try {
                const response = await fetch(`/api/foods/${id}`);
                const result = await response.json();

                if (!response.ok || !result.success) {
                    toast.error(result.message || "Food not found");
                    setFood(null);
                    return;
                }

                setFood(result.data);
            } catch (error) {
                console.log("Fetch food error >> ", error);
                toast.error("Something went wrong. Please try again.");
                setFood(null);
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
    }, [id]);

    const hasDiscount =
        food?.discountPrice > 0 &&
        food?.discountPrice < food?.price;
    const categoryName =
        typeof food?.category === "object"
            ? food?.category?.name
            : food?.category;
    const discountPercent = hasDiscount
        ? Math.round(((food.price - food.discountPrice) / food.price) * 100)
        : 0;

    return (
        <main className="min-h-screen bg-orange-50">
            <PageHeader menu={"Food"} description={"Explore our delicious selection of freshly prepared food and find something perfect for your taste."} />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    href="/menu"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-orange-600"
                >
                    <ArrowLeft size={17} />
                    Back to Menu
                </Link>

                {loading ? (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="min-h-[320px] animate-pulse rounded-xl bg-gray-100 sm:min-h-[450px]" />
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 w-24 rounded bg-orange-100" />
                                <div className="h-8 w-2/3 rounded bg-gray-200" />
                                <div className="h-4 w-40 rounded bg-gray-100" />
                                <div className="h-20 w-full rounded bg-gray-100" />
                                <div className="h-10 w-32 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                ) : !food ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Food not found
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            This food item may have been removed or is unavailable.
                        </p>
                        <Link
                            href="/menu"
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                        >
                            Back to Menu
                        </Link>
                    </div>
                ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image */}
                        <div className="relative min-h-[320px] bg-gray-100 sm:min-h-[450px] lg:min-h-[600px]">
                            {food.image ? (
                                <img
                                    src={food.image || "Food"}
                                    alt={food.name || "Food"}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full min-h-[320px] items-center justify-center text-gray-400">
                                    Food Image
                                </div>
                            )}

                            {hasDiscount && (
                                <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white">
                                    {discountPercent}% OFF
                                </span>
                            )}

                            {food.featured && (
                                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-sm font-semibold text-white">
                                    <Star size={14} fill="currentColor" />
                                    Featured
                                </span>
                            )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-wrap items-center gap-2">
                                {categoryName && (
                                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
                                        {categoryName}
                                    </p>
                                )}

                                {food.cuisine && (
                                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {food.cuisine}
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {food.name}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {food.isVeg ? (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-600">
                                        <Leaf size={16} />
                                        Vegetarian
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600">
                                        <CircleOff size={16} />
                                        Non-Vegetarian
                                    </span>
                                )}

                                {food.rating > 0 && (
                                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700">
                                        <Star size={16} className="fill-amber-400 text-amber-400" />
                                        {food.rating}
                                        {food.reviewCount > 0 && (
                                            <span className="text-gray-400">
                                                ({food.reviewCount} reviews)
                                            </span>
                                        )}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h2 className="text-sm font-semibold text-gray-900">
                                    About this food
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-gray-500">
                                    {food.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mt-7 border-y border-gray-100 py-5">
                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                    Price
                                </p>

                                <div className="mt-2 flex items-center gap-3">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ₹
                                        {hasDiscount
                                            ? food.discountPrice
                                            : food.price}
                                    </span>

                                    {hasDiscount && (
                                        <span className="text-lg text-gray-400 line-through">
                                            ₹{food.price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Information */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock3 size={17} />
                                        <span className="text-xs">
                                            Preparation
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {food.preparationTime} mins
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center gap-2">
                                        {food.isAvailable ? (
                                            <CheckCircle2
                                                size={17}
                                                className="text-green-500"
                                            />
                                        ) : (
                                            <XCircle
                                                size={17}
                                                className="text-red-500"
                                            />
                                        )}

                                        <span className="text-xs text-gray-500">
                                            Availability
                                        </span>
                                    </div>

                                    <p
                                        className={`mt-2 text-sm font-semibold ${
                                            food.isAvailable
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {food.isAvailable
                                            ? "Available"
                                            : "Unavailable"}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <UtensilsCrossed size={17} />
                                        <span className="text-xs">
                                            Serving Size
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {food.servingSize || "--"}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Users size={17} />
                                        <span className="text-xs">
                                            Serves
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {food.serves
                                            ? `${food.serves} ${food.serves === 1 ? "person" : "people"}`
                                            : "--"}
                                    </p>
                                </div>
                            </div>

                            {food.ingredients?.length > 0 && (
                                <div className="mt-6">
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Ingredients
                                    </h2>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {food.ingredients.map((ingredient) => (
                                            <span
                                                key={ingredient}
                                                className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700"
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {food.tags?.length > 0 && (
                                <div className="mt-6">
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Tags
                                    </h2>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {food.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            { 
                                foodPresent && existingFood ? 
                                <Quantity label={"Quantity"} food_id={existingFood.food_id} quantity={existingFood.quantity} /> : 
                                <Button 
                                    label={
                                        <>
                                            <ShoppingCart size={19} />
                                            {food.isAvailable
                                                ? "Add to Cart"
                                                : "Currently Unavailable"}
                                        </>
                                    }
                                    onClick={async (event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        await addToCart(food._id);
                                    }}
                                    disabled={!food?.isAvailable}
                                    className="relative z-20 mt-6"
                                /> 
                            }

                            {/* Add Cart */}
                            {/* <button
                                type="button"
                                disabled={!food.isAvailable}
                                className="
                                    mt-6
                                    inline-flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-orange-500
                                    px-5 py-3.5
                                    text-sm font-semibold
                                    text-white
                                    transition
                                    hover:bg-orange-600
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-200
                                    disabled:text-gray-400
                                "
                            >
                                <ShoppingCart size={19} />
                                {food.isAvailable
                                    ? "Add to Cart"
                                    : "Currently Unavailable"}
                            </button> */}
                        </div>
                    </div>
                </div>
                )}
            </div>
        </main>
    );
}
