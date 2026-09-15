import { handleApiError } from "./errorHandler";

export const asyncHandler = (fnHandler) => {
    return async (request, context) => {
        try {
            return await fnHandler(request, context);
        } catch (error) {
            return handleApiError(error);
        }
    }
}