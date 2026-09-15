import {
    Search,
    ArrowRight,
    MapPin,
    Clock,
    Star,
} from "lucide-react";

export default function HomePage() {
    return (
        <div>

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#fff8ef]">

                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">

                    <div>

                        <span className="inline-flex rounded-full bg-[#fff0e5] px-4 py-2 text-sm font-semibold text-[#ff6900]">
                            🍔 Delicious food. Delivered fast.
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#0b1b35] sm:text-5xl lg:text-6xl">

                            Your favorite food,
                            <span className="block text-[#ff6900]">
                                just a bite away.
                            </span>

                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
                            Order delicious meals from the best restaurants
                            around you and get them delivered straight to
                            your doorstep.
                        </p>

                        {/* Search */}
                        <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg sm:flex-row">

                            <div className="flex flex-1 items-center gap-3 px-3">

                                <MapPin
                                    size={20}
                                    className="text-[#ff6900]"
                                />

                                <input
                                    type="text"
                                    placeholder="Search restaurants or food..."
                                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
                                />

                            </div>

                            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6900] px-6 py-3 font-semibold text-white">
                                <Search size={18} />
                                Search
                            </button>

                        </div>

                    </div>

                    {/* Hero Image Placeholder */}
                    <div className="relative hidden lg:block">

                        <div className="flex aspect-square items-center justify-center rounded-[40px] bg-[#ff6900]">

                            <div className="text-center text-white">

                                <div className="text-8xl">
                                    🍕
                                </div>

                                <p className="mt-5 text-2xl font-bold">
                                    Fresh & Delicious
                                </p>

                            </div>

                        </div>

                        <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-xl">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-[#fff0e5] p-3">
                                    <Clock
                                        size={20}
                                        className="text-[#ff6900]"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Average delivery
                                    </p>

                                    <p className="font-bold text-[#0b1b35]">
                                        25 - 35 mins
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                <div className="flex items-end justify-between">

                    <div>
                        <p className="text-sm font-semibold text-[#ff6900]">
                            EXPLORE
                        </p>

                        <h2 className="mt-1 text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                            What are you craving?
                        </h2>
                    </div>

                    <button className="hidden items-center gap-2 text-sm font-semibold text-[#ff6900] sm:flex">
                        View all
                        <ArrowRight size={16} />
                    </button>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                    {[
                        ["🍕", "Pizza"],
                        ["🍔", "Burgers"],
                        ["🍜", "Noodles"],
                        ["🍗", "Chicken"],
                        ["🥗", "Healthy"],
                        ["🍰", "Desserts"],
                    ].map(([icon, name]) => (

                        <div
                            key={name}
                            className="group cursor-pointer rounded-2xl border border-[#eee5dc] bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#ff6900]"
                        >

                            <div className="text-4xl">
                                {icon}
                            </div>

                            <p className="mt-3 font-semibold text-[#0b1b35] group-hover:text-[#ff6900]">
                                {name}
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* RESTAURANTS */}
            <section className="bg-white">

                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

                    <div>
                        <p className="text-sm font-semibold text-[#ff6900]">
                            TOP PICKS
                        </p>

                        <h2 className="mt-1 text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                            Popular restaurants
                        </h2>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="overflow-hidden rounded-2xl border border-[#eee5dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                <div className="flex h-48 items-center justify-center bg-[#fff0e5] text-6xl">
                                    🍽️
                                </div>

                                <div className="p-5">

                                    <div className="flex items-start justify-between">

                                        <div>
                                            <h3 className="text-lg font-bold text-[#0b1b35]">
                                                The Food House
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                Indian • Chinese • Fast Food
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 rounded-lg bg-[#fff0e5] px-2 py-1 text-sm font-semibold text-[#ff6900]">
                                            <Star size={14} fill="currentColor" />
                                            4.5
                                        </div>

                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">

                                        <span>
                                            25-35 min
                                        </span>

                                        <span>
                                            ₹₹
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </div>
    );
}