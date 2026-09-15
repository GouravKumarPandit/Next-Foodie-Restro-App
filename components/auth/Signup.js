import Link from "next/link";

function Signup() {
    return (
        <>
            <div className="min-h-screen bg-orange-50 px-4 py-10">
                <div className="mx-auto w-full max-w-3xl">

                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-extrabold text-white shadow-md">
                            QB
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Create Your Account
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Create an account and start ordering delicious food
                        </p>
                    </div>

                    {/* Card */}
                    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-xl sm:p-8">

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            {/* First Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    First Name
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Last Name
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Contact Number
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Enter contact number"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Country
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <select
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                >
                                    <option value="">Select country</option>
                                    <option value="india">India</option>
                                    <option value="usa">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="canada">Canada</option>
                                    <option value="australia">Australia</option>
                                </select>
                            </div>

                            {/* City */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    City
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter city"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Address */}
                            <div className="sm:col-span-2">
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Address
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <textarea
                                    rows="3"
                                    placeholder="Enter your full address"
                                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                ></textarea>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Password
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Confirm Password
                                    <span className="ml-1 text-orange-500">*</span>
                                </label>

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                        </div>

                        {/* Signup Button */}
                        <button className="mt-7 w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.99]">
                            Create Account
                        </button>

                        {/* Login */}
                        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link href={'/login'} className="font-bold text-orange-500 hover:text-orange-600">
                                    Login
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;