"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const resolveUserFromData = (data) => {
    if (!data) return null;
    // register returns { user, address }; login/me return the user object
    if (data.user) return data.user;
    return data;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const getCurrentUser = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/me");
            const result = await response.json();

            if (response.ok) {
                setUser(result.data);
                return { ...result, ok: true };
            }

            setUser(null);
            return { ...result, ok: false };
        } catch (error) {
            setUser(null);
            return {
                ok: false,
                success: false,
                message: "Failed to fetch current user",
                errors: [],
            };
        }
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            await getCurrentUser();
            setAuthLoading(false);
        };

        loadUser();
    }, [getCurrentUser]);

    const login = async (formData) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            setUser(resolveUserFromData(result.data));
        }

        return { ...result, ok: response.ok };
    };

    const signup = async (formData) => {
        const { confirm_password, ...payload } = formData;

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            setUser(resolveUserFromData(result.data));
        }

        return { ...result, ok: response.ok };
    };

    const logout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            const result = await response.json();
            setUser(null);

            return { ...result, ok: response.ok };
        } catch (error) {
            setUser(null);
            return {
                ok: false,
                success: false,
                message: "Failed to logout",
                errors: [],
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                authLoading,
                login,
                signup,
                logout,
                getCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
