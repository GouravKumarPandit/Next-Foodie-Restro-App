import { z } from "zod";

const stringList = (label, { maxItems, maxLength }) =>
    z
        .array(
            z
                .string()
                .trim()
                .min(1, `${label} cannot be empty`)
                .max(maxLength, `${label} cannot exceed ${maxLength} characters`)
        )
        .max(maxItems, `You can add up to ${maxItems} ${label.toLowerCase()}s`)
        .optional();

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
        .min(0, "Price cannot be negative")
        .optional(),

    discountPrice: z
        .number()
        .min(0, "Discount price cannot be negative")
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
        .min(0, "Preparation time cannot be negative")
        .max(300, "Preparation time cannot exceed 300 minutes")
        .optional(),

    ingredients: stringList("Ingredient", { maxItems: 40, maxLength: 50 }),

    servingSize: z
        .string()
        .trim()
        .max(50, "Serving size cannot exceed 50 characters")
        .optional(),

    serves: z
        .number()
        .int()
        .min(1, "Serves must be at least 1")
        .optional(),

    cuisine: z
        .string()
        .trim()
        .max(50, "Cuisine cannot exceed 50 characters")
        .optional(),

    tags: stringList("Tag", { maxItems: 20, maxLength: 30 }),

    featured: z
        .boolean()
        .optional(),

    rating: z
        .number()
        .min(0, "Rating cannot be less than 0")
        .max(5, "Rating cannot exceed 5")
        .optional(),

    reviewCount: z
        .number()
        .int()
        .min(0, "Review count cannot be negative")
        .optional(),
});

export { foodSchema };
