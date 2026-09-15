"use client";

import Link from "next/link";
import { Pencil, Trash2, Utensils } from "lucide-react";
import PageHeaderCard from "../../../components/admin/PageHeaderCard";
import SearchBox from "../../../components/ui/SearchBox";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableLoading from "../../../components/ui/TableLoading";
import DeletePopup from "../../../components/ui/DeletePopup";
import Table from "../../../components/ui/Table";

export default function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletePopup, setDeletePopup] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const openDeleteModal = (id, name) => {
        setCategoryId(id);
        setCategoryName(name);
        setDeletePopup(true);
    }

    const modelClose = () => {
        setDeletePopup(false);
        setCategoryId("");
        setCategoryName("");
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const result = await response.json();
            if (!response.ok) {
                toast.error(result.message);
                return;
            }

            if (result.success) {
                setCategories(result.data);
            }
        } catch (error) {
            console.log("Fetch category error >> ", error);
            toast.error("Something went wrong. Please try again!");
        } finally{
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try {
            console.log("Delete");
            const response = await fetch(`/api/categories/${categoryId}`, {
                method: "DELETE"
            });
            const result = await response.json();

            if (!result.success) { 
                toast.error(result.message); 
                return; 
            }

            toast.success(result.message); 
            setDeletePopup(false); 
            setCategoryId(""); 
            setCategoryName("");  
            
            fetchCategories()
        } catch (error) {
            console.log("Delete Category Error >> ", error);
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [loading])

    return (
        <div className="space-y-6">
            <PageHeaderCard title={'Categories'} description={'Manage your food categories'} buttonText={'Add Category'} buttonHref={'/admin/categories/create'} />
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="relative w-full max-w-md">
                    <SearchBox placeholder="Search Food..." />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <Table columns={["Category", "Parent Category", "Description", "Status", "Actions"]} >
                        {
                            loading ? 
                                (<TableLoading colLength={5} />) :
                                categories.length ? categories.map((category, index) => (
                                    <tr key={category._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {/*<div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="h-full w-full object-cover"
                                                    /> 
                                                </div>*/}
                                                {/* <Utensils size={19} /> */}
                                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                        Image
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        #{index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="max-w-sm px-6 py-4">
                                            <p className="truncate text-sm text-gray-500">
                                                {category?.parentCat?.name ? category?.parentCat?.name : "--"}
                                            </p>
                                        </td>

                                        <td className="max-w-sm px-6 py-4">
                                            <p className="truncate text-sm text-gray-500">
                                                {category.description}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    category.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {category.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/categories/edit/${category._id}`}
                                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <Pencil size={17} />
                                                </Link>

                                                <button
                                                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                    onClick={() => openDeleteModal(category._id, category.name)}
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center" colSpan={5}>
                                        No Category Found!
                                    </td>
                                </tr>
                            )
                        }
                    </Table>
                </div>
            </div>

            {
                deletePopup ? <DeletePopup deleteType={"Category"} onClose={modelClose} onDelete={handleDelete} name={categoryName} /> : ""
            }
        </div>
    );
}