import { z } from "zod";

const foodSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Food name must be at least 2 characters")
        .max(50, "Food name cannot exceed 50 characters"),

    description: z
        .string()
        .trim()
        .max(250, "Food description cannot exceed 250 characters")
        .optional(),
    
    category: z
        .string()
        .optional(),

    price: z
        .number()
        .optional(),

    discountPrice: z
        .number()
        .optional(),

    isVeg: z
        .boolean()
        .optional(),

    isAvailable: z
        .boolean()
        .optional(),

    isActive: z
        .boolean()
        .optional(),

    preparationTime: z
        .number()
        .int()
        .min(1, "Preparation time must be at least 1 minute")
        .max(300, "Preparation time cannot exceed 300 minutes")
        .optional(),
});

export { foodSchema };