"use client";

import Link from "next/link";
import WebsiteHeading from "../ui/WebsiteHeading";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { toast } from "react-toastify";

function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError({ email: "", password: "" });

        try {
            const result = await login(formData);

            if (!result.ok) {
                toast.error(result.message || "Login failed");

                if (result.errors?.length) {
                    result.errors.forEach((issue) => {
                        const name = issue.path?.[0];
                        if (!name) return;

                        setError((prev) => ({
                            ...prev,
                            [name]: issue.message,
                        }));
                    });
                }

                return;
            }

            toast.success(result.message || "Logged in successfully");
            router.push("/");
        } catch (err) {
            console.log("Login Error >> ", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">
                <div className="w-full rounded-2xl border border-orange-100 bg-white p-6 shadow-xl sm:p-8">
                    <WebsiteHeading
                        heading={"Welcome Back"}
                        description={"Login to continue ordering your favorite food"}
                    />

                    <form onSubmit={handleLogin}>
                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
                                        error.email
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                                    }`}
                                    required
                                    value={formData.email}
                                    onChange={inputHandler}
                                />

                                {error.email && (
                                    <p className="mt-1.5 text-xs text-red-500">{error.email}</p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-semibold text-orange-500 hover:text-orange-600"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
                                        error.password
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-gray-200 focus:border-orange-500 focus:ring-orange-100"
                                    }`}
                                    required
                                    value={formData.password}
                                    onChange={inputHandler}
                                />

                                {error.password && (
                                    <p className="mt-1.5 text-xs text-red-500">{error.password}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                />

                                <span className="text-sm text-gray-500">Remember me</span>
                            </div>

                            <Button
                                type="submit"
                                label={submitting ? "Logging in..." : "Login"}
                                disabled={submitting}
                                className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.99]"
                            />
                        </div>
                    </form>

                    <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                href={"/signup"}
                                className="font-bold text-orange-500 hover:text-orange-600"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
