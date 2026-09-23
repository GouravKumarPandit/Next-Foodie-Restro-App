import { AppError } from "./errors";
import { getSession } from "./session";
import { getUserById } from "../services/auth.service";

export const getCurrentUser = async () => {
    const session = await getSession();

    if (!session?.userId) return null;

    const user = await getUserById(session.userId);

    if (!user || !user.isActive) return null;

    return user;
};

export const requireAuth = async () => {
    // Use: Any API that only logged-in users can call.
    const user = await getCurrentUser();

    if (!user) {
        throw new AppError(401, "Unauthorized");
    }

    return user;
};

export const requireRole = async (...roles) => {
    // Use: APIs that only certain roles can call (admin, staff, etc.).
    const user = await requireAuth();

    if (!roles.includes(user.role)) {
        throw new AppError(403, "Forbidden");
    }

    return user;
};
