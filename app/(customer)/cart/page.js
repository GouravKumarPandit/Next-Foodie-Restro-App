"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Clock3,
    Minus,
    Plus,
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

const cartItems = [
    {
        id: 1,
        name: "Veg Biryani",
        category: "Main Course",
        image: "/images/foods/veg-biryani.jpg",
        price: 299,
        discountPrice: 249,
        quantity: 2,
        preparationTime: 30,
        isVeg: true,
    },
    {
        id: 2,
        name: "Paneer Butter Masala",
        category: "North Indian",
        image: "/images/foods/paneer-butter-masala.jpg",
        price: 349,
        discountPrice: 299,
        quantity: 1,
        preparationTime: 25,
        isVeg: true,
    },
    {
        id: 3,
        name: "Masala Dosa",
        category: "South Indian",
        image: "/images/foods/masala-dosa.jpg",
        price: 199,
        discountPrice: 169,
        quantity: 1,
        preparationTime: 20,
        isVeg: true,
    },
];

export default function CartPage() {
    const subtotal = 716;
    const discount = 130;
    const deliveryFee = 40;
    const tax = 31;
    const total = 657;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
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

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                    {/* Cart Items */}
                    <div className="space-y-4 lg:col-span-2">
                        {/* Cart Header */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Cart Items
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        4 items in your cart
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="text-sm font-medium text-red-500 transition hover:text-red-600"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        {cartItems.map((item) => {
                            const itemTotal =
                                item.discountPrice * item.quantity;

                            return (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200 sm:p-5"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row">
                                        {/* Image */}
                                        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                                        <span className="text-xs font-medium text-orange-600">
                                                            {item.category}
                                                        </span>

                                                        {item.isVeg && (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                                Veg
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                                                        {item.name}
                                                    </h3>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            {/* Price / Time */}
                                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">
                                                        ₹{item.discountPrice}
                                                    </span>

                                                    <span className="text-xs text-gray-400 line-through">
                                                        ₹{item.price}
                                                    </span>
                                                </div>

                                                <span className="hidden h-4 w-px bg-gray-200 sm:block" />

                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Clock3 size={14} />
                                                    {item.preparationTime} mins
                                                </span>
                                            </div>

                                            {/* Bottom */}
                                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                {/* Quantity */}
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        Quantity
                                                    </span>

                                                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                                                        <button
                                                            type="button"
                                                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
                                                        >
                                                            <Minus size={15} />
                                                        </button>

                                                        <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 px-3 text-sm font-semibold text-gray-900">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:bg-orange-50 hover:text-orange-600"
                                                        >
                                                            <Plus size={15} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Item Total */}
                                                <div className="text-left sm:text-right">
                                                    <p className="text-xs text-gray-500">
                                                        Item Total
                                                    </p>

                                                    <p className="text-lg font-bold text-gray-900">
                                                        ₹{itemTotal}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            {/* Summary Header */}
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-2">
                                    <ReceiptText
                                        size={19}
                                        className="text-orange-500"
                                    />

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Order Summary
                                    </h2>
                                </div>
                            </div>

                            {/* Coupon */}
                            <div className="border-b border-gray-100 p-5">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Have a coupon?
                                </label>

                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <Input
                                            type="text"
                                            placeholder="Enter coupon code"
                                            className="pl-9"
                                        />
                                    </div>

                                    <Button
                                        label="Apply"
                                        type="button"
                                        className="shrink-0"
                                    />
                                </div>
                            </div>

                            {/* Price Breakdown */}
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
