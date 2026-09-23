import Link from "next/link";
import {
    Search,
    ArrowRight,
    MapPin,
    Clock,
    Star,
    ShieldCheck,
    Leaf,
    Flame,
} from "lucide-react";
import FoodCard from "../../components/food/FoodCard";
import { categories, featuredFoods, deals, steps, reviews } from "../../data/HomePage"

function SectionHeading({ eyebrow, title, href, actionLabel = "View all" }) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#ff6900]">
                    {eyebrow}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                    {title}
                </h2>
            </div>

            {href && (
                <Link
                    href={href}
                    className="hidden items-center gap-2 text-sm font-semibold text-[#ff6900] sm:inline-flex"
                >
                    {actionLabel}
                    <ArrowRight size={16} />
                </Link>
            )}
        </div>
    );
}

export default function HomePage() {
    return (
        <div className="bg-[#fff8ef]">

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-orange-100/70 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e5] px-4 py-2 text-sm font-semibold text-[#ff6900]">
                            <Flame size={15} />
                            Freshly prepared. Delivered fast.
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#0b1b35] sm:text-5xl lg:text-6xl">
                            Craving something
                            <span className="block text-[#ff6900]">
                                delicious tonight?
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 sm:text-lg">
                            From creamy curries to crispy dosas, order chef-made meals
                            and get them delivered hot to your doorstep.
                        </p>

                        <div className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg sm:flex-row">
                            <div className="flex flex-1 items-center gap-3 px-3">
                                <Search size={20} className="text-[#ff6900]" />
                                <input
                                    type="text"
                                    placeholder="Search paneer, biryani, pizza..."
                                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#ff6900] px-6 py-3 font-semibold text-white"
                            >
                                Search
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin size={16} className="text-[#ff6900]" />
                                Delivering across the city
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={16} className="text-[#ff6900]" />
                                25–35 min average
                            </span>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="overflow-hidden rounded-[40px] bg-[#ff6900]">
                            <img
                                // src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1000&q=80"
                                src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1000&q=80"
                                alt="Vegetarian paneer tikka"
                                className="h-full min-h-[420px] w-full object-cover opacity-90"
                            />
                        </div>

                        <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-[#fff0e5] p-3">
                                    <Clock size={20} className="text-[#ff6900]" />
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

                        <div className="absolute -right-3 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#0b1b35]">
                                <Star size={16} className="fill-amber-400 text-amber-400" />
                                4.8
                                <span className="font-medium text-gray-400">
                                    (2.4k reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#eee5dc] bg-white p-4 shadow-sm sm:grid-cols-4 sm:p-6">
                    {[
                        ["12k+", "Happy customers"],
                        ["80+", "Dishes on menu"],
                        ["25 min", "Avg. prep time"],
                        ["4.8", "Average rating"],
                    ].map(([value, label]) => (
                        <div key={label} className="px-2 py-2 text-center">
                            <p className="text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                                {value}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Explore"
                    title="What are you craving?"
                    href="/menu"
                />

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="group cursor-pointer rounded-2xl border border-[#eee5dc] bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#ff6900]"
                        >
                            <div className="text-4xl">
                                {category.icon}
                            </div>
                            <p className="mt-3 font-semibold text-[#0b1b35] group-hover:text-[#ff6900]">
                                {category.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                {category.items} items
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* DEALS */}
            <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
                <SectionHeading eyebrow="Offers" title="Today's special deals" />

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {deals.map((deal) => (
                        <div
                            key={deal.title}
                            className={`${deal.color} relative overflow-hidden rounded-2xl p-6 text-white`}
                        >
                            <p className="text-4xl">
                                {deal.emoji}
                            </p>
                            <p className="mt-4 text-sm font-medium text-white/80">
                                {deal.title}
                            </p>
                            <h3 className="mt-1 text-2xl font-extrabold">
                                {deal.offer}
                            </h3>
                            <p className="mt-2 text-sm text-white/80">
                                {deal.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURED FOODS */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <SectionHeading
                    eyebrow="Chef's picks"
                    title="Featured dishes"
                    href="/menu"
                />

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {featuredFoods.map((food) => (
                        <FoodCard key={food.name} food={food} />
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <SectionHeading eyebrow="Simple" title="How QuickBite works" />

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="rounded-2xl border border-[#eee5dc] p-6"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ff6900]">
                                    <step.icon size={22} />
                                </div>
                                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Step {index + 1}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-[#0b1b35]">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    {step.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-[#ff6900]">
                            Why QuickBite
                        </p>
                        <h2 className="mt-1 text-2xl font-extrabold text-[#0b1b35] sm:text-3xl">
                            Fresh kitchen, honest flavours
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
                            Every dish is cooked after you order. We keep veg and
                            non-veg separate, use seasonal produce, and pack meals
                            so they stay hot until they reach you.
                        </p>

                        <div className="mt-6 space-y-4">
                            {[
                                [ShieldCheck, "Hygienic kitchen and sealed packaging"],
                                [Leaf, "Clear veg and non-veg labelling"],
                                [Clock, "Most orders ready in under 30 minutes"],
                            ].map(([Icon, label]) => (
                                <div key={label} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ff6900]">
                                        <Icon size={18} />
                                    </div>
                                    <p className="text-sm font-medium text-[#0b1b35]">
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=80"
                                alt="Kitchen"
                                className="h-44 w-full object-cover sm:h-56"
                            />
                        </div>
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80"
                                alt="Plated food"
                                className="h-44 w-full object-cover sm:h-56"
                            />
                        </div>
                        <div className="col-span-2 overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80"
                                alt="Pizza"
                                className="h-40 w-full object-cover sm:h-48"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <SectionHeading eyebrow="Love from guests" title="What people are saying" />

                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {reviews.map((review) => (
                            <div
                                key={review.name}
                                className="rounded-2xl border border-[#eee5dc] bg-[#fff8ef] p-6"
                            >
                                <div className="flex items-center gap-1 text-amber-400">
                                    {Array.from({ length: review.rating }).map((_, index) => (
                                        <Star key={index} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                    “{review.text}”
                                </p>
                                <p className="mt-5 font-semibold text-[#0b1b35]">
                                    {review.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {review.city}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-[32px] bg-[#0b1b35] px-6 py-12 text-center text-white sm:px-12">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#ff6900]">
                        Hungry already?
                    </p>
                    <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                        Explore the full menu
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70">
                        Veg, non-veg, quick bites, and slow-cooked specials — all
                        prepared fresh when you order.
                    </p>
                    <Link
                        href="/menu"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#ff6900] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e85f00]"
                    >
                        Browse menu
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
