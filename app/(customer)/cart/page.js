"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Clock3,
    ShoppingBag,
    Trash2,
    Utensils,
    Tag,
    Truck,
    ReceiptText,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CancelButton from "@/components/ui/CancelButton";
import { useCart } from "../../../context/CartContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import CartItemPlaceholder from "../../../components/placeholder/CartItemPlaceholder";
import Quantity from "../../../components/food/Quantity";
import { useAuth } from "../../../context/AuthContext";

const hasDiscount = (food) =>
    Number(food?.discountPrice) > 0 &&
    Number(food?.discountPrice) < Number(food?.price);

const getUnitPrice = (food) =>
    hasDiscount(food) ? Number(food.discountPrice) : Number(food?.price) || 0;

export default function CartPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { cart, cartLoading, clearCart, removeFromCart } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [itemsLoading, setItemsLoading] = useState(false);
    const cartItemsRef = useRef([]);
    const discount = 0;
    const deliveryFee = 0;
    const tax = 0;

    const itemCount = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    const subtotal = useMemo(
        () =>
            cartItems.reduce((sum, item) => {
                if (item.unavailable) return sum;
                return sum + getUnitPrice(item) * item.quantity;
            }, 0),
        [cartItems]
    );

    const total = subtotal - discount + deliveryFee + tax;
    const showPlaceholders = (cartLoading || itemsLoading) && cartItems.length === 0;

    const handleRemove = async (foodId) => {
        const result = await removeFromCart(foodId);

        if (!result?.success) {
            toast.error(result?.message || "Failed to remove food from the cart");
            return;
        }

        toast.success(result.message || "Food item removed from the cart");
    };

    const handleClearCart = async () => {
        const result = await clearCart();

        if (!result?.success) {
            toast.error(result?.message || "Failed to clear cart");
            return;
        }

        toast.success(result.message || "Cart cleared successfully.");
    };

    useEffect(() => {
        if (cartLoading) return;

        if (!cart.length) {
            cartItemsRef.current = [];
            setCartItems([]);
            return;
        }

        let cancelled = false;

        const prev = cartItemsRef.current;
        const prevById = new Map(
            prev.map((food) => [String(food.food_id), food])
        );
        const allKnown =
            prev.length > 0 &&
            cart.every((item) => prevById.has(String(item.food_id)));

        if (allKnown) {
            const unchanged =
                prev.length === cart.length &&
                cart.every((item) => {
                    const food = prevById.get(String(item.food_id));
                    return food && food.quantity === item.quantity;
                });

            if (!unchanged) {
                const nextItems = cart.map((item) => ({
                    ...prevById.get(String(item.food_id)),
                    quantity: item.quantity,
                    food_id: item.food_id,
                }));

                cartItemsRef.current = nextItems;
                setCartItems(nextItems);
            }

            return;
        }

        const loadCartFoods = async () => {
            setItemsLoading(true);

            try {
                const foodData = await Promise.all(
                    cart.map(async (item) => {
                        const response = await fetch(`/api/foods/${item.food_id}`);
                        const result = await response.json();

                        if (!response.ok || !result.success || !result.data) {
                            return {
                                _id: item.food_id,
                                food_id: item.food_id,
                                name: "This item is no longer available",
                                quantity: item.quantity,
                                unavailable: true,
                            };
                        }

                        return {
                            ...result.data,
                            food_id: item.food_id,
                            quantity: item.quantity,
                            unavailable: result.data.isActive === false || result.data.isAvailable === false,
                        };
                    })
                );

                if (!cancelled) {
                    cartItemsRef.current = foodData;
                    setCartItems(foodData);
                }
            } catch (error) {
                console.log("Fetch cart food error.", error);
                if (!cancelled) {
                    toast.error("Something went wrong. Please try again.");
                }
            } finally {
                if (!cancelled) {
                    setItemsLoading(false);
                }
            }
        };

        loadCartFoods();

        return () => {
            cancelled = true;
        };
    }, [cart, cartLoading]);

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                <ShoppingBag size={17} className="text-orange-500" />
                                <span>Your Cart</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Review Your Order
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Check your items before proceeding to checkout.
                            </p>
                        </div>

                        <Link
                            href="/menu"
                            className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                            <ArrowLeft size={17} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                    <div className="space-y-4 lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Cart Items
                                    </h2>

                                    {
                                        cartLoading || (itemsLoading && !cartItems.length) ?
                                        <p className="mt-1 text-sm text-gray-500">Loading your cart...</p> :
                                        cart.length ?
                                        <p className="mt-1 text-sm text-gray-500">{itemCount} {itemCount === 1 ? "item" : "items"} in your cart.</p> :
                                        <p className="mt-1 text-lg text-gray-500">
                                            Your cart is empty. You can add delicious food from the <Link href={"/menu"}><span className="text-orange-600">Menu</span></Link>.
                                        </p>
                                    }
                                </div>

                                <Button label={<>Clear Cart <Trash2 size={18} /> </>} type="button" onClick={handleClearCart} disabled={!cart.length || cartLoading} />
                            </div>
                        </div>

                        {
                            showPlaceholders ?
                            Array.from({ length: cart.length || 2 }).map((_, index) => (
                                <CartItemPlaceholder key={index} />
                            )) :
                            cartItems.length ?
                            cartItems.map((item) => {
                                const unitPrice = getUnitPrice(item);
                                const itemTotal = unitPrice * item.quantity;

                                return (
                                    <div
                                        key={item.food_id}
                                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200 sm:p-5"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                                                {
                                                    item.image ?
                                                    <img
                                                        src={item.image}
                                                        alt={item.name || "Food"}
                                                        className="h-full w-full object-cover"
                                                    /> :
                                                    null
                                                }
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <div className="mb-1 flex flex-wrap items-center gap-2">
                                                            <span className="text-xs font-medium text-orange-600">
                                                                {item?.category?.name ? item?.category?.name : "--"}
                                                            </span>

                                                            {item.isVeg ? (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600">
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                                    Veg
                                                                </span>
                                                            ) : item.unavailable ? null : (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600">
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                                    Non-Veg
                                                                </span>
                                                            )}
                                                        </div>

                                                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                                            {item.name ? item.name : "--"}
                                                        </h3>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="shrink-0 rounded-lg p-2 text-orange-600 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
                                                        aria-label={`Remove ${item.name}`}
                                                        onClick={() => handleRemove(item.food_id)}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>

                                                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                                    {
                                                        item.unavailable ?
                                                        <span className="text-sm font-medium text-red-500">
                                                            Remove this item to continue
                                                        </span> :
                                                        <>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-gray-900">
                                                                    ₹{unitPrice}
                                                                </span>

                                                                {hasDiscount(item) && (
                                                                    <span className="text-xs text-gray-400 line-through">
                                                                        ₹{item.price}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <span className="hidden h-4 w-px bg-gray-200 sm:block" />

                                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                                                <Clock3 size={14} />
                                                                {item.preparationTime} mins
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-center gap-3">
                                                        {
                                                            item.unavailable ?
                                                            <span className="text-sm font-medium text-gray-500">
                                                                Unavailable
                                                            </span> :
                                                            <>
                                                                <span className="text-sm font-medium text-gray-600">
                                                                    Quantity
                                                                </span>
                                                                <Quantity food_id={item.food_id} quantity={item.quantity} />
                                                            </>
                                                        }
                                                    </div>

                                                    {
                                                        !item.unavailable &&
                                                        <div className="text-left sm:text-right">
                                                            <p className="text-xs text-gray-500">
                                                                Item Total
                                                            </p>

                                                            <p className="text-lg font-bold text-gray-900">
                                                                ₹{itemTotal}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) :
                            null
                        }
                    </div>

                    <aside className="lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-2">
                                    <ReceiptText size={19} className="text-orange-500" />

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Order Summary
                                    </h2>
                                </div>
                            </div>

                            <div className="border-b border-gray-100 p-5">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Have a coupon?
                                </label>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <Input type="text" placeholder="Enter coupon code" className="pl-9"/>
                                    </div>

                                    <Button label="Apply" type="button" className="shrink-0" />
                                </div>
                            </div>

                            <div className="space-y-4 p-5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        ₹{subtotal}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Discount
                                    </span>

                                    <span className="font-medium text-green-600">
                                        -₹{discount}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <Truck size={15} />
                                        Delivery Fee
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        ₹{deliveryFee}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Tax
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        ₹{tax}
                                    </span>
                                </div>

                                <div className="border-t border-dashed border-gray-200 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">
                                                Total
                                            </p>

                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Inclusive of applicable taxes
                                            </p>
                                        </div>

                                        <p className="text-2xl font-bold text-orange-600">
                                            ₹{total}
                                        </p>
                                    </div>
                                </div>

                                {/* Checkout */}
                                <Button
                                    type="button"
                                    className="w-full py-3"
                                    label="Proceed to Checkout"
                                    disabled={
                                        cartLoading ||
                                        itemsLoading ||
                                        !cartItems.length ||
                                        cartItems.some((item) => item.unavailable)
                                    }
                                    onClick={() => {
                                        if(user) router.push("/checkout")
                                        router.push("/login")
                                    }}
                                />

                                <CancelButton
                                    href="/menu"
                                    className="w-full justify-center"
                                    label="Continue Shopping"
                                />
                            </div>

                            {/* Secure Checkout */}
                            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <Utensils size={17} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">
                                            Fresh & Secure Ordering
                                        </p>

                                        <p className="mt-0.5 text-[11px] text-gray-500">
                                            Your order details are securely
                                            processed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
