import { AppError } from "./errors";

export const validate = (schema, data) => {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new AppError(
            400,
            "Validation failed",
            result.error.issues
        );
    }

    return result.data;
};