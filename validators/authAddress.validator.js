import { z } from "zod";

const requiredString = (label) =>
    z
        .string({
            error: (issue) =>
                issue.input === undefined
                    ? `${label} is required`
                    : `${label} must be a string`,
        })
        .trim()
        .min(1, { error: `${label} is required`, abort: true });

const authAddressSchema = z.object({
    city: requiredString("City")
        .min(2, "City must be at least 2 characters")
        .max(15, "City cannot exceed 15 characters"),

    state: requiredString("State")
        .min(2, "State must be at least 2 characters")
        .max(15, "State cannot exceed 15 characters"),

    country: requiredString("Country")
        .min(2, "Country must be at least 2 characters")
        .max(15, "Country cannot exceed 15 characters"),

    pincode: requiredString("Pincode")
        .min(2, "Pincode must be at least 2 characters")
        .max(10, "Pincode cannot exceed 10 characters")
        .regex(/^\d+$/, "Pincode must contain only digits"),

    address: requiredString("Address")
        .min(2, "Address must be at least 2 characters")
        .max(50, "Address cannot exceed 50 characters"),

    landmark: z
        .string({
            error: "Landmark must be a string",
        })
        .trim()
        .max(50, "Landmark cannot exceed 50 characters")
        .refine(
            (value) => value.length === 0 || value.length >= 2,
            "Landmark must be at least 2 characters"
        )
        .optional(),
});

export { authAddressSchema };
