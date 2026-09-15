import Link from "next/link";

function Login() {
    return (
        <>
            <div className="min-h-screen bg-orange-50 px-4 py-10">
                <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center justify-center">

                    <div className="w-full rounded-2xl border border-orange-100 bg-white p-6 shadow-xl sm:p-8">

                        {/* Logo */}
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-extrabold text-white shadow-md">
                                QB
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="mb-8 text-center">
                            <h1 className="text-2xl font-extrabold text-gray-900">
                                Welcome Back
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Login to continue ordering your favorite food
                            </p>
                        </div>

                        <div className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Password
                                    </label>

                                    <button className="text-xs font-semibold text-orange-500 hover:text-orange-600">
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Remember */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                />

                                <span className="text-sm text-gray-500">
                                    Remember me
                                </span>
                            </div>

                            {/* Login */}
                            <button className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.99]">
                                Login
                            </button>
                        </div>

                        {/* Signup */}
                        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Don't have an account?{" "}
                                <Link href={"/signup"} className="font-bold text-orange-500 hover:text-orange-600">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;