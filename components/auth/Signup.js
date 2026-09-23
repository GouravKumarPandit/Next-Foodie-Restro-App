"use client";

import Link from "next/link";
import WebsiteHeading from "../ui/WebsiteHeading";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";
import Button from "../ui/Button";
import FormSection from "../ui/FormSection";
import TextArea from "../ui/TextArea";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const emptyErrors = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    landmark: "",
};

function Signup() {
    const { signup } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        landmark: "",
    });

    const [error, setError] = useState(emptyErrors);

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

    const handleSignup = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setError(emptyErrors);

        if (formData.password !== formData.confirm_password) {
            setError((prev) => ({
                ...prev,
                confirm_password: "Passwords do not match",
            }));
            setSubmitting(false);
            return;
        }

        try {
            const result = await signup(formData);

            if (!result.ok) {
                toast.error(result.message || "Signup failed");

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

            toast.success(result.message || "Account created successfully");
            router.push("/");
        } catch (err) {
            console.log("Signup Error >> ", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 px-4 py-10">
            <div className="mx-auto w-full max-w-3xl">
                <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-xl sm:p-8">
                    <WebsiteHeading
                        heading={"Create Your Account"}
                        description={"Create an account and start ordering delicious food"}
                    />

                    <form onSubmit={handleSignup}>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Input
                                label="First Name"
                                type="text"
                                name="first_name"
                                placeholder="Enter first Name"
                                required
                                value={formData.first_name}
                                onChange={inputHandler}
                                errorMessage={error.first_name}
                            />

                            <Input
                                label="Last Name"
                                name="last_name"
                                type="text"
                                placeholder="Enter last Name"
                                required
                                value={formData.last_name}
                                onChange={inputHandler}
                                errorMessage={error.last_name}
                            />

                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                required
                                value={formData.email}
                                onChange={inputHandler}
                                errorMessage={error.email}
                            />

                            <Input
                                label="Contact Number"
                                name="phone"
                                type="tel"
                                placeholder="Enter contact number"
                                required
                                value={formData.phone}
                                onChange={inputHandler}
                                errorMessage={error.phone}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                value={formData.password}
                                onChange={inputHandler}
                                errorMessage={error.password}
                            />

                            <Input
                                label="Confirm Password"
                                name="confirm_password"
                                type="password"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirm_password}
                                onChange={inputHandler}
                                errorMessage={error.confirm_password}
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-5">
                            <FormSection title="Delivery Address">
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <Select
                                        label="Country"
                                        name="country"
                                        id="country"
                                        options={[
                                            { key: "India", value: "India" },
                                            { key: "United States", value: "United States" },
                                            { key: "United Kingdom", value: "United Kingdom" },
                                            { key: "Canada", value: "Canada" },
                                            { key: "Australia", value: "Australia" },
                                        ]}
                                        required
                                        value={formData.country}
                                        onChange={inputHandler}
                                        errorMessage={error.country}
                                    />

                                    <Input
                                        label="State"
                                        name="state"
                                        type="text"
                                        placeholder="Enter your state"
                                        required
                                        value={formData.state}
                                        onChange={inputHandler}
                                        errorMessage={error.state}
                                    />

                                    <Input
                                        label="City"
                                        name="city"
                                        type="text"
                                        placeholder="Enter your city"
                                        required
                                        value={formData.city}
                                        onChange={inputHandler}
                                        errorMessage={error.city}
                                    />

                                    <Input
                                        label="Pincode"
                                        name="pincode"
                                        type="text"
                                        placeholder="Enter your pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={inputHandler}
                                        errorMessage={error.pincode}
                                    />

                                    <TextArea
                                        label="Address"
                                        name="address"
                                        row={4}
                                        placeholder="Enter your full address"
                                        required
                                        value={formData.address}
                                        onChange={inputHandler}
                                        errorMessage={error.address}
                                    />

                                    <TextArea
                                        label="Landmark"
                                        name="landmark"
                                        row={4}
                                        placeholder="Enter your landmark"
                                        value={formData.landmark}
                                        onChange={inputHandler}
                                        errorMessage={error.landmark}
                                    />
                                </div>
                            </FormSection>
                        </div>

                        <Button
                            type="submit"
                            label={submitting ? "Creating Account..." : "Create Account"}
                            disabled={submitting}
                            className="mt-7 w-full rounded-xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.99]"
                        />
                    </form>

                    <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                href={"/login"}
                                className="font-bold text-orange-500 hover:text-orange-600"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
