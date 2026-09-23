"use client";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";
import FoodCard from "../../../components/food/FoodCard";
import PageHeader from "../../../components/layout/PageHeader";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Reset from "../../../components/ui/Reset";
import Heading from "../../../components/ui/Heading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FoodCardPlaceholder from "../../../components/food/FoodCardPlaceholder";
import Pagination from "../../../components/ui/Pagination";

export default function MenuPage() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    const [cuisineList, setCuisineList] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [featured, setFeatured] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [availability, setAvailability] = useState("");

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if (result.success) {
                setCategories(
                    result.data.map((category) => ({
                        key: category._id,
                        value: category.name,
                    }))
                );
            }
        } catch (error) {
            console.log("Fetch category error >> ", error);
            toast.error("Something went wrong. Please try again!");
        }
    }

    const fetchFoods = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                search,
                category,
                foodType,
                cuisine,
                featured,
                priceMin,
                priceMax,
                availability,
            });
            const response = await fetch(`/api/foods?${params.toString()}`);
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if (result.success) {
                setFoods(result.data.foodData);
                setCuisineList(result.data.cuisine);
            }
        } catch (error) {
            console.log("Foods fetch error >> ", error);
            toast.error("Something went wrong. Please try again!");
        } finally{
            setLoading(false);
        }
    }

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setFoodType("");
        setCuisine("");
        setFeatured("");
        setPriceMin("");
        setPriceMax("");
        setAvailability("");
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchFoods();
    }, [
        search,
        category,
        foodType,
        cuisine,
        featured,
        priceMin,
        priceMax,
        availability,
    ]);

    const cuisineOptions = cuisineList.length ? [...new Set(
        cuisineList.map((cuisine) => cuisine).filter(Boolean)
    )].map((cuisine) => ({
        key: cuisine,
        value: cuisine,
    })) : [];

    return (
        <main className="min-h-screen bg-orange-50">
            <PageHeader menu={"Our Menu"} description={"Explore our delicious selection of freshly prepared food and find something perfect for your taste."} />

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Filter Card */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                                <SlidersHorizontal size={18} className="text-orange-500" />
                            </div>

                            <Heading heading={"Filter Menu"} description={"Find food according to your preference"} />
                        </div>
                        <Reset handleReset={handleReset} />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Search Food
                            </label>

                            <div className="relative">
                                <Search
                                    size={18}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <Input
                                    type="text"
                                    placeholder="Search by name, cuisine, or tag..."
                                    className="py-2.5 pl-10 pr-4"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <Select
                            label="Category"
                            name="category"
                            id="category"
                            className="px-3 py-2.5"
                            options={categories}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        <Select
                            label="Food Type"
                            name="foodType"
                            id="foodType"
                            className="px-3 py-2.5"
                            options={[
                                { key: true, value: "Vegetarian" },
                                { key: false, value: "Non-Vegetarian" }
                            ]}
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                        />

                        <Select
                            label="Cuisine"
                            name="cuisine"
                            id="cuisine"
                            className="px-3 py-2.5"
                            options={cuisineOptions}
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                        />

                        <Select
                            label="Featured"
                            name="featured"
                            id="featured"
                            className="px-3 py-2.5"
                            options={[
                                { key: true, value: "Featured only" },
                                { key: false, value: "Regular" },
                            ]}
                            value={featured}
                            onChange={(e) => setFeatured(e.target.value)}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Price Range
                            </label>

                            <div className="grid grid-cols-2 gap-2">
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="Min ₹"
                                    className="py-2.5 pr-4"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                />

                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="Max ₹"
                                    className="px-3 py-2.5"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                />
                            </div>
                        </div>

                        <Select
                            label="Availability"
                            name="availability"
                            id="availability"
                            className="px-3 py-2.5"
                            options={[
                                { key: true, value: "Available" },
                                { key: false, value: "Unavailable" }
                            ]}
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />
                    </div>
                </div>

                {/* Result Header */}
                <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Heading heading={"Our Foods"} description={`Showing ${foods.length} delicious food items`} />

                        <div>
                            <Select
                                name="sort"
                                id="sort"
                                className="px-3 py-2.5 w-20"
                                options={[
                                    { key: "recommended", value: "Sort: Recommended" },
                                    { key: "price-low", value: "Price: Low to High" },
                                    { key: "price-high", value: "Price: High to Low" },
                                    { key: "rating", value: "Rating: High to Low" },
                                    { key: "newest", value: "Newest" },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Food Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            !loading ?
                            foods.length ? foods.map((food) => (
                                <FoodCard
                                    key={food._id}
                                    food={food}
                                />
                            )) : <p className="text-center text-gray-500 font-medium text-lg mx-auto w-full text-start">No Food Found! Please try again with different filters.</p>
                            : 
                            <>
                                {
                                    Array.from({ length: 6 }).map((_, index) => (
                                        <FoodCardPlaceholder key={index} />
                                    ))
                                }
                            </>
                        }
                    </div>
                </div>

                <Pagination />
            </section>
        </main>
    );
}