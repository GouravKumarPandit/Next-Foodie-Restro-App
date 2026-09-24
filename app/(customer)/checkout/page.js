"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    CreditCard,
    MapPin,
    Phone,
    ShoppingBag,
    Truck,
    WalletCards,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import CancelButton from "@/components/ui/CancelButton";

const addressOptions = [
    {
        key: "home",
        value: "Home",
    },
    {
        key: "work",
        value: "Work",
    },
];

const paymentOptions = [
    {
        key: "cod",
        value: "Cash on Delivery",
    },
    {
        key: "upi",
        value: "UPI",
    },
    {
        key: "card",
        value: "Credit / Debit Card",
    },
];

const checkoutItems = [
    {
        id: 1,
        name: "Veg Biryani",
        image: "/images/foods/veg-biryani.jpg",
        quantity: 2,
        price: 249,
    },
    {
        id: 2,
        name: "Paneer Butter Masala",
        image: "/images/foods/paneer-butter-masala.jpg",
        quantity: 1,
        price: 299,
    },
    {
        id: 3,
        name: "Masala Dosa",
        image: "/images/foods/masala-dosa.jpg",
        quantity: 1,
        price: 169,
    },
];

export default function CheckoutPage() {
    const subtotal = 966;
    const discount = 130;
    const deliveryFee = 40;
    const tax = 31;
    const total = 907;

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                <CreditCard
                                    size={17}
                                    className="text-orange-500"
                                />

                                <span>Checkout</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Complete Your Order
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter your delivery details and choose your
                                preferred payment method.
                            </p>
                        </div>

                        <Link
                            href="/cart"
                            className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                            <ArrowLeft size={17} />
                            Back to Cart
                        </Link>
                    </div>
                </div>
            </section>

            {/* Checkout Content */}
            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                    {/* Left */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Delivery Address */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <MapPin size={19} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Delivery Address
                                        </h2>

                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Where should we deliver your order?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 p-5">
                                {/* Saved Address */}
                                <div>
                                    <Select
                                        label="Select Saved Address"
                                        options={addressOptions}
                                        placeholder="Choose an address"
                                    />
                                </div>

                                {/* Name */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="First Name"
                                        type="text"
                                        placeholder="Enter first name"
                                    />

                                    <Input
                                        label="Last Name"
                                        type="text"
                                        placeholder="Enter last name"
                                    />
                                </div>

                                {/* Phone */}
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="Enter phone number"
                                />

                                {/* Address */}
                                <Input
                                    label="Address"
                                    type="text"
                                    placeholder="House no., building, street, area"
                                />

                                {/* City / State */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="City"
                                        type="text"
                                        placeholder="Enter city"
                                    />

                                    <Input
                                        label="State"
                                        type="text"
                                        placeholder="Enter state"
                                    />
                                </div>

                                {/* Pincode / Landmark */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Pincode"
                                        type="text"
                                        placeholder="Enter pincode"
                                    />

                                    <Input
                                        label="Landmark"
                                        type="text"
                                        placeholder="Optional landmark"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Instructions */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <Truck size={19} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Delivery Instructions
                                        </h2>

                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Add instructions for the delivery
                                            partner.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Delivery Note
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Example: Please call me when you arrive..."
                                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
                                />

                                <p className="mt-2 text-xs text-gray-400">
                                    Optional
                                </p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <WalletCards size={19} />
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Payment Method
                                        </h2>

                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Choose how you want to pay.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-5">
                                <Select
                                    label="Payment Method"
                                    options={paymentOptions}
                                    placeholder="Choose payment method"
                                />

                                {/* Selected Payment Preview */}
                                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm">
                                            <CreditCard size={17} />
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Cash on Delivery
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-gray-600">
                                                Pay the delivery partner when
                                                your order arrives.
                                            </p>
                                        </div>

                                        <CheckCircle2
                                            size={18}
                                            className="ml-auto shrink-0 text-orange-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Order Summary */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            {/* Header */}
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag
                                        size={19}
                                        className="text-orange-500"
                                    />

                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Your Order
                                    </h2>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    4 items
                                </p>
                            </div>

                            {/* Items */}
                            <div className="divide-y divide-gray-100">
                                {checkoutItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-3 p-4"
                                    >
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="line-clamp-2 text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </p>

                                                <p className="shrink-0 text-sm font-semibold text-gray-900">
                                                    ₹
                                                    {item.price *
                                                        item.quantity}
                                                </p>
                                            </div>

                                            <div className="mt-1 flex items-center justify-between">
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    ₹{item.price} each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Details */}
                            <div className="border-t border-gray-100 p-5">
                                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                                    Price Details
                                </h3>

                                <div className="space-y-3">
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
                                        <span className="text-gray-500">
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
                                                    Inclusive of taxes
                                                </p>
                                            </div>

                                            <p className="text-2xl font-bold text-orange-600">
                                                ₹{total}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order */}
                                <Button
                                    type="button"
                                    className="mt-5 w-full py-3"
                                    label={`Place Order · ₹${total}`}
                                />

                                <CancelButton
                                    href="/cart"
                                    className="mt-2 w-full justify-center"
                                    label="Back to Cart"
                                />
                            </div>

                            {/* Info */}
                            <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                                <div className="flex items-start gap-3">
                                    <Clock3
                                        size={17}
                                        className="mt-0.5 shrink-0 text-orange-500"
                                    />

                                    <div>
                                        <p className="text-xs font-semibold text-gray-800">
                                            Estimated delivery
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            Your order should arrive in
                                            approximately 30–45 minutes.
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