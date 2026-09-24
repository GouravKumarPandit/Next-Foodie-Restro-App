import Link from "next/link";
import {
    ArrowLeft,
    Bike,
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    ReceiptText,
    Search,
    ShoppingBag,
    XCircle,
} from "lucide-react";

const filters = ["All", "Active", "Delivered", "Cancelled"];

const orders = [
    {
        id: "QB-24091",
        placedAt: "24 Sep 2026, 1:20 PM",
        status: "Out for delivery",
        eta: "Arriving in 18 mins",
        payment: "UPI",
        address: "42 Lake View Apartments, Andheri West, Mumbai 400053",
        total: 667,
        items: [
            {
                name: "Veg Biryani",
                quantity: 2,
                price: 249,
                image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80",
            },
            {
                name: "Masala Dosa",
                quantity: 1,
                price: 169,
                image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=200&q=80",
            },
        ],
        timeline: [
            { label: "Order placed", time: "1:20 PM", done: true },
            { label: "Preparing", time: "1:28 PM", done: true },
            { label: "Out for delivery", time: "1:46 PM", done: true },
            { label: "Delivered", time: "Pending", done: false },
        ],
    },
    {
        id: "QB-24076",
        placedAt: "22 Sep 2026, 8:05 PM",
        status: "Preparing",
        eta: "Kitchen is preparing your food",
        payment: "Cash on Delivery",
        address: "18th Floor, One BKC, Bandra Kurla Complex, Mumbai 400051",
        total: 397,
        items: [
            {
                name: "Paneer Butter Masala",
                quantity: 1,
                price: 299,
                image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=200&q=80",
            },
            {
                name: "Garlic Naan",
                quantity: 2,
                price: 49,
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80",
            },
        ],
    },
    {
        id: "QB-24051",
        placedAt: "18 Sep 2026, 12:40 PM",
        status: "Delivered",
        eta: "Delivered at 1:12 PM",
        payment: "Credit / Debit Card",
        address: "42 Lake View Apartments, Andheri West, Mumbai 400053",
        total: 418,
        items: [
            {
                name: "Masala Dosa",
                quantity: 2,
                price: 169,
                image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=200&q=80",
            },
            {
                name: "Filter Coffee",
                quantity: 2,
                price: 40,
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80",
            },
        ],
    },
    {
        id: "QB-24033",
        placedAt: "12 Sep 2026, 7:15 PM",
        status: "Cancelled",
        eta: "Cancelled by you",
        payment: "UPI",
        address: "42 Lake View Apartments, Andheri West, Mumbai 400053",
        total: 299,
        items: [
            {
                name: "Chicken Tikka Bowl",
                quantity: 1,
                price: 299,
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80",
            },
        ],
    },
];

const statusStyles = {
    "Out for delivery": "border-blue-200 bg-blue-50 text-blue-700",
    Preparing: "border-orange-200 bg-orange-50 text-orange-700",
    Delivered: "border-green-200 bg-green-50 text-green-700",
    Cancelled: "border-red-200 bg-red-50 text-red-700",
};

function StatusIcon({ status }) {
    if (status === "Delivered") return <CheckCircle2 size={14} />;
    if (status === "Cancelled") return <XCircle size={14} />;
    if (status === "Out for delivery") return <Bike size={14} />;
    return <Clock3 size={14} />;
}

export default function OrdersPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                <Package size={17} className="text-orange-500" />
                                <span>My Orders</span>
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Track Your Orders
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                See what is on the way and look back at earlier orders.
                            </p>
                        </div>

                        <Link
                            href="/menu"
                            className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                        >
                            <ArrowLeft size={17} />
                            Browse Menu
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
                    <div className="space-y-4 lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Recent Orders
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        4 orders in your history
                                    </p>
                                </div>

                                <div className="relative w-full sm:max-w-xs">
                                    <Search
                                        size={16}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search by order id"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {filters.map((filter, index) => (
                                    <span
                                        key={filter}
                                        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                                            index === 0
                                                ? "border-orange-500 bg-orange-500 text-white"
                                                : "border-gray-200 bg-white text-gray-600"
                                        }`}
                                    >
                                        {filter}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {orders.map((order) => (
                            <article
                                key={order.id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                            >
                                <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                {order.id}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                                            >
                                                <StatusIcon status={order.status} />
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Placed on {order.placedAt}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-gray-500">Order Total</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ₹{order.total}
                                        </p>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item) => (
                                        <div
                                            key={`${order.id}-${item.name}`}
                                            className="flex gap-3 p-4 sm:px-5"
                                        >
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                    <p className="shrink-0 text-sm font-semibold text-gray-900">
                                                        ₹{item.price * item.quantity}
                                                    </p>
                                                </div>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Qty: {item.quantity} · ₹{item.price} each
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {order.timeline && (
                                    <div className="border-t border-gray-100 px-4 py-4 sm:px-5">
                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                            {order.timeline.map((step) => (
                                                <div key={step.label} className="flex gap-2">
                                                    <span
                                                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                                            step.done
                                                                ? "bg-orange-500 text-white"
                                                                : "bg-gray-100 text-gray-400"
                                                        }`}
                                                    >
                                                        <CheckCircle2 size={12} />
                                                    </span>
                                                    <div>
                                                        <p
                                                            className={`text-xs font-semibold ${
                                                                step.done
                                                                    ? "text-gray-900"
                                                                    : "text-gray-400"
                                                            }`}
                                                        >
                                                            {step.label}
                                                        </p>
                                                        <p className="text-[11px] text-gray-500">
                                                            {step.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                    <div className="space-y-1 text-xs text-gray-500">
                                        <p className="flex items-center gap-1.5">
                                            <MapPin size={13} className="text-orange-500" />
                                            <span className="line-clamp-1">{order.address}</span>
                                        </p>
                                        <p>
                                            {order.eta} · Paid via {order.payment}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-lg bg-orange-500 px-3.5 py-2 text-sm font-medium text-white"
                                        >
                                            Reorder
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="space-y-4 lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 p-5">
                                <div className="flex items-center gap-2">
                                    <Bike size={19} className="text-orange-500" />
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Active Order
                                    </h2>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">QB-24091</p>
                            </div>

                            <div className="space-y-4 p-5">
                                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Out for delivery
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-gray-600">
                                        Rahul is on the way with your order. Expected by 2:10 PM.
                                    </p>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Items</span>
                                        <span className="font-medium text-gray-900">3</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Payment</span>
                                        <span className="font-medium text-gray-900">UPI</span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="text-xl font-bold text-orange-600">
                                            ₹667
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <ReceiptText size={18} className="text-orange-500" />
                                <h2 className="text-base font-semibold text-gray-900">
                                    Order Snapshot
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    ["12", "Total"],
                                    ["2", "Active"],
                                    ["9", "Delivered"],
                                    ["1", "Cancelled"],
                                ].map(([value, label]) => (
                                    <div
                                        key={label}
                                        className="rounded-xl border border-gray-100 bg-gray-50 p-3"
                                    >
                                        <p className="text-lg font-bold text-gray-900">{value}</p>
                                        <p className="text-xs text-gray-500">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                    <ShoppingBag size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Hungry again?
                                    </p>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Your favourites are ready to reorder.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
