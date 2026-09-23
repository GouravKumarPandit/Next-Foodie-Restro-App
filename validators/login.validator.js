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

const loginSchema = z.object({
    email: requiredString("Email")
        .min(2, "Email must be at least 2 characters")
        .max(30, "Email cannot exceed 30 characters")
        .pipe(z.email("Please enter a valid email address")),

    password: requiredString("Password")
        .min(6, "Password must be at least 6 characters")
        .max(15, "Password cannot exceed 15 characters"),
});

export { loginSchema };