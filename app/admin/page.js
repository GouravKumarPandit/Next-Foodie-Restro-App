import {
    Store,
    ShoppingBag,
    Users,
    IndianRupee,
    TrendingUp,
    MoreVertical,
} from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div>

                <p className="text-sm font-medium text-gray-400">
                    Overview
                </p>

                <h1 className="mt-1 text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Here's what's happening with your restaurant platform.
                </p>

            </div>


            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Restaurants"
                    value="128"
                    change="+12.5%"
                    icon={<Store size={21} />}
                />

                <StatCard
                    title="Total Orders"
                    value="2,845"
                    change="+8.2%"
                    icon={<ShoppingBag size={21} />}
                />

                <StatCard
                    title="Total Users"
                    value="8,492"
                    change="+14.6%"
                    icon={<Users size={21} />}
                />

                <StatCard
                    title="Revenue"
                    value="₹4,85,200"
                    change="+10.4%"
                    icon={<IndianRupee size={21} />}
                />

            </div>


            {/* Main Grid */}
            <div className="grid gap-6 xl:grid-cols-3">

                {/* Revenue Chart Placeholder */}
                <div className="rounded-2xl border border-[#eee5dc] bg-white p-5 xl:col-span-2">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="font-bold text-[#0b1b35]">
                                Revenue Overview
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Monthly revenue performance
                            </p>
                        </div>

                        <button className="rounded-lg p-2 text-gray-400 hover:bg-[#fff8ef]">
                            <MoreVertical size={20} />
                        </button>

                    </div>

                    <div className="mt-8 flex h-64 items-center justify-center rounded-xl bg-[#fff8ef]">

                        <div className="text-center">
                            <TrendingUp
                                size={36}
                                className="mx-auto text-[#ff6900]"
                            />

                            <p className="mt-3 font-semibold text-[#0b1b35]">
                                Revenue Chart
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                Chart will be implemented later
                            </p>
                        </div>

                    </div>

                </div>


                {/* Recent Orders */}
                <div className="rounded-2xl border border-[#eee5dc] bg-white p-5">

                    <div className="flex items-center justify-between">

                        <h2 className="font-bold text-[#0b1b35]">
                            Recent Orders
                        </h2>

                        <button className="text-sm font-semibold text-[#ff6900]">
                            View all
                        </button>

                    </div>

                    <div className="mt-5 space-y-4">

                        {[1, 2, 3, 4].map((order) => (

                            <div
                                key={order}
                                className="flex items-center justify-between border-b border-[#eee5dc] pb-4 last:border-0"
                            >

                                <div>

                                    <p className="text-sm font-bold text-[#0b1b35]">
                                        #ORD-00{order}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        Customer Name
                                    </p>

                                </div>

                                <span className="rounded-full bg-[#fff0e5] px-3 py-1 text-xs font-semibold text-[#ff6900]">
                                    ₹450
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}


function StatCard({
    title,
    value,
    change,
    icon,
}) {
    return (
        <div className="rounded-2xl border border-[#eee5dc] bg-white p-5">

            <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ff6900]">
                    {icon}
                </div>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    {change}
                </span>

            </div>

            <p className="mt-5 text-sm font-medium text-gray-400">
                {title}
            </p>

            <h3 className="mt-1 text-2xl font-extrabold text-[#0b1b35]">
                {value}
            </h3>

        </div>
    );
}