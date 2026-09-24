import Link from "next/link";
import {
    Mail,
    MapPin,
    Package,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const addresses = [
    {
        label: "Home",
        isDefault: true,
        line: "42 Lake View Apartments, Andheri West",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400053",
        landmark: "Near Infinity Mall",
    },
    {
        label: "Work",
        isDefault: false,
        line: "18th Floor, One BKC, Bandra Kurla Complex",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "400051",
        landmark: "Opposite MMRDA Grounds",
    },
];

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                        <UserRound size={17} className="text-orange-500" />
                        <span>Account</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Your personal details, saved addresses, and account settings.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                    <aside className="space-y-4 lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="bg-orange-500 px-5 py-6 text-white">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-bold text-orange-500">
                                    AS
                                </div>
                                <h2 className="mt-4 text-xl font-bold">Aarav Sharma</h2>
                                <p className="mt-1 text-sm text-orange-100">@aarav-sharma</p>
                            </div>

                            <div className="space-y-3 p-5 text-sm">
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Mail size={15} className="text-orange-500" />
                                    aarav@example.com
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone size={15} className="text-orange-500" />
                                    +91 98765 43210
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={15} className="text-orange-500" />
                                    Mumbai, Maharashtra
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                ["12", "Orders"],
                                ["2", "Addresses"],
                                ["Mar 26", "Joined"],
                            ].map(([value, label]) => (
                                <div
                                    key={label}
                                    className="rounded-xl border border-gray-200 bg-white p-3 text-center shadow-sm"
                                >
                                    <p className="text-base font-bold text-gray-900">{value}</p>
                                    <p className="mt-0.5 text-[11px] text-gray-500">{label}</p>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/orders"
                            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200"
                        >
                            <span className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                    <Package size={18} />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-gray-900">
                                        My Orders
                                    </span>
                                    <span className="block text-xs text-gray-500">
                                        2 orders are active
                                    </span>
                                </span>
                            </span>
                            <span className="text-sm font-medium text-orange-600">View</span>
                        </Link>
                    </aside>

                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <UserRound size={19} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Personal Information
                                        </h2>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Details used for your deliveries.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 p-5">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="First Name"
                                        defaultValue="Aarav"
                                        readOnly
                                    />
                                    <Input
                                        label="Last Name"
                                        defaultValue="Sharma"
                                        readOnly
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Username"
                                        defaultValue="aarav-sharma"
                                        readOnly
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        defaultValue="aarav@example.com"
                                        readOnly
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        defaultValue="9876543210"
                                        readOnly
                                    />
                                    <Input
                                        label="Dial Code"
                                        defaultValue="+91"
                                        readOnly
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button type="button" label="Save Changes" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <MapPin size={19} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Saved Addresses
                                        </h2>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Places we can deliver to.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="w-fit rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700"
                                >
                                    Add Address
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                                {addresses.map((address) => (
                                    <div
                                        key={address.label}
                                        className="rounded-xl border border-gray-200 p-4"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {address.label}
                                            </p>
                                            {address.isDefault && (
                                                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-600">
                                                    Default
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            {address.line}
                                            <br />
                                            {address.city}, {address.state} {address.pincode}
                                            <br />
                                            {address.country}
                                        </p>

                                        <p className="mt-2 text-xs text-gray-400">
                                            Landmark: {address.landmark}
                                        </p>

                                        <div className="mt-4 flex gap-3 text-sm font-medium">
                                            <button type="button" className="text-orange-600">
                                                Edit
                                            </button>
                                            <button type="button" className="text-red-500">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                        <ShieldCheck size={19} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            Password
                                        </h2>
                                        <p className="mt-0.5 text-sm text-gray-500">
                                            Keep your account secure.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 p-5">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    placeholder="Enter current password"
                                    readOnly
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        label="New Password"
                                        type="password"
                                        placeholder="Enter new password"
                                        readOnly
                                    />
                                    <Input
                                        label="Confirm Password"
                                        type="password"
                                        placeholder="Re-enter new password"
                                        readOnly
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button type="button" label="Update Password" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
