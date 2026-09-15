"use client";

import Link from "next/link";
import {
    Edit,
    Eye,
    Trash2,
    Leaf,
    CircleOff,
} from "lucide-react";
import Table from "../../../components/ui/Table";
import PageHeaderCard from "../../../components/admin/PageHeaderCard";
import SearchBox from "../../../components/ui/SearchBox";
import DeletePopup from "../../../components/ui/DeletePopup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableLoading from "../../../components/ui/TableLoading";

export default function FoodListPage() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [foodId, setFoodId] = useState("");
    const [foodName, setFoodName] = useState("");

    const openDeleteModal = (id, name) => {
        setFoodId(id);
        setFoodName(name);
        setDeletePopup(true);
    }

    const modelClose = () => {
        setDeletePopup(false);
        setFoodId("");
        setFoodName("");
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/foods/${foodId}`, {
                method: "DELETE"
            });
            const result = await response.json();

            if (!result.success) { 
                toast.error(result.message); 
                return; 
            }

            toast.success(result.message); 
            setDeletePopup(false); 
            setFoodId(""); 
            setFoodName("");  
            
            fetchFoods();
        } catch (error) {
            console.log("Delete Food Error >> ", error);
            toast.error(error);
        }
    }

    const fetchFoods = async () => {
        try {
            const response = await fetch("/api/foods");
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if (result.success) {
                setFoods(result.data);
            }
        } catch (error) {
            console.log("Foods fetch error >> ", error);
            toast.error("Something went wrong. Please try again!");
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFoods();
    }, [loading]);

    return (
        <div className="space-y-6">
            <PageHeaderCard title={'Foods'} description={'Manage your restaurant food items'} buttonText={'Add Food'} buttonHref={'/admin/foods/create'} />

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="relative w-full max-w-md">
                    <SearchBox placeholder="Search Food..." />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <Table columns={["#", "Food", "Category", "Price", "Type", "Availability", "Actions"]} >
                        {   
                            loading ? 
                                (<TableLoading colLength={7} />) :
                                foods.length > 0 ? foods.map((food, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-4 text-sm text-gray-500">
                                            {index + 1}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                        Image
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {food.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {food.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {food?.category?.name ? food.category.name : "--"}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex flex-col">
                                                {food.discountPrice > 0 ? (
                                                    <>
                                                        <span className="font-medium text-gray-900">
                                                            ₹{food.discountPrice}
                                                        </span>

                                                        <span className="text-xs text-gray-400 line-through">
                                                            ₹{food.price}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-medium text-gray-900">
                                                        ₹{food.price}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            {food.isVeg ? (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                                                    <Leaf size={13} />
                                                    Veg
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                                                    <CircleOff size={13} />
                                                    Non-Veg
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            {food.isAvailable ? (
                                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                                                    Unavailable
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/foods/view/${food._id}`}
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                                    title="View"
                                                >
                                                    <Eye size={17} />
                                                </Link>

                                                <Link
                                                    href={`/admin/foods/edit/${food._id}`}
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
                                                    title="Edit"
                                                >
                                                    <Edit size={17} />
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                                                    title="Delete"
                                                    onClick={() => openDeleteModal(food._id, food.name)}
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : 
                                    (
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-center" colSpan={7}>
                                                No Food Found!
                                            </td>
                                        </tr>
                                    )
                        }
                    </Table>
                </div>
            </div>
            {
                deletePopup ? <DeletePopup deleteType={"Food"} onClose={modelClose} onDelete={handleDelete} name={foodName} /> : ""
            }
        </div>
    );
}