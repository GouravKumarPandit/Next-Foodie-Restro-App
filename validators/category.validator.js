import { z } from "zod";

const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(25, "Category name cannot exceed 25 characters"),

    parentCat: z
        .string()
        .optional(),

    description: z
        .string()
        .trim()
        .max(250, "Category description cannot exceed 250 characters"),
        // .optional(),

    isActive: z
        .boolean()
        .optional()
});

export { categorySchema };