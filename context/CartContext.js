"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext(null);

export function CartProvider({ children }){
    const { user, authLoading } = useAuth();
    const [cart, setCart] = useState([]);
    const [cartLoading, setCartLoading] = useState(true);

    const fetchCart = async () => {
        try {
            if (user) {
                const response = await fetch("/api/cart");

                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        "Failed to fetch cart items"
                    );
                }

                const loginCart = result.data;
                const storedGuestCart = localStorage.getItem("cart");

                if(!storedGuestCart){
                    setCart(loginCart);
                    return;
                }

                let guestCart;

                try {
                    guestCart = JSON.parse(storedGuestCart);
                } catch {
                    localStorage.removeItem("cart");
                    setCart(loginCart);
                    return;
                }

                if (!Array.isArray(guestCart) || guestCart.length === 0) {
                    localStorage.removeItem("cart");
                    setCart(loginCart);
                    return;
                }

                // Merge guest + logged-in cart
                const mergeResponse = await fetch("/api/cart/merge", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        guestCart,
                    }),
                });

                const mergeResult = await mergeResponse.json();

                if (!mergeResponse.ok || !mergeResult.success) {
                    setCart(loginCart);
                    return;
                }

                setCart(mergeResult.data);
                localStorage.removeItem("cart");
                return;
            }

            const storedCart = localStorage.getItem("cart");

            if (storedCart) {
                setCart(JSON.parse(storedCart));
            } else {
                setCart([]);
            }
        } catch (error) {
            console.error("Fetching cart items error:", error);

            setCart([]);
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return;

        setCartLoading(true);
        fetchCart();
    }, [user, authLoading]);

    useEffect(() => {
        if (authLoading || cartLoading) return;

        if (!user) {
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );
        }
    }, [cart, user, authLoading, cartLoading]);

    const addToCart = async (food_id) => {
        try {
            // Logged-in user
            if (user) {
                const response = await fetch("/api/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ food_id }),
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    return {
                        success: false,
                        message: result.message || "Failed to add food to cart",
                    };
                }

                setCart((prev) => {
                    const existingFood = prev.find(
                        (food) => food.food_id === result.data.food_id
                    );

                    if (existingFood) {
                        return prev.map((food) =>
                            food.food_id === result.data.food_id
                                ? result.data
                                : food
                        );
                    }

                    return [...prev, result.data];
                });

                return {
                    success: true,
                    message: result.message,
                };
            }

            // Guest user
            let reachedMaxQuantity = false;

            setCart((prev) => {
                const existingFood = prev.find(
                    (food) => food.food_id === food_id
                );

                if (existingFood?.quantity >= 20) {
                    reachedMaxQuantity = true;
                    return prev;
                }

                if (existingFood) {
                    return prev.map((food) =>
                        food.food_id === food_id
                            ? {
                                ...food,
                                quantity: food.quantity + 1,
                            }
                            : food
                    );
                }

                return [
                    ...prev,
                    {
                        food_id: food_id,
                        quantity: 1,
                    },
                ];
            });

            if (reachedMaxQuantity) {
                return {
                    success: false,
                    message: "Maximum quantity allowed is 20",
                };
            }

            return {
                success: true,
                message: "Food added to cart",
            };
        } catch (error) {
            console.error("Add to cart error:", error);

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    };

    const removeFromCart = async (food_id) => {
        try {
            if (user) {
                const response = await fetch(`/api/cart/${food_id}`, {
                    method: "DELETE",
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    return {
                        success: false,
                        message:
                            result.message ||
                            "Failed to remove food from the cart",
                    };
                }

                setCart((prev) =>
                    prev.filter(
                        (food) => food.food_id !== food_id
                    )
                );

                return {
                    success: true,
                    message: result.message,
                };
            }

            setCart((prev) =>
                prev.filter(
                    (food) => food.food_id !== food_id
                )
            );

            return {
                success: true,
                message: "Food item removed from the cart",
            };
        } catch (error) {
            console.error("Remove from cart error:", error);

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    };

    const updateQuantity = async (food_id, quantity) => {
        console.log("Update quantity: Food ID >> ", food_id);
        console.log("Update quantity: quantity >> ", quantity);
        try {
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
                return {
                    success: false,
                    message: "Quantity must be between 1 and 20",
                };
            }

            if (user) {
                const response = await fetch(`/api/cart/${food_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity,
                    }),
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    return {
                        success: false,
                        message:
                            result.message ||
                            "Failed to update food quantity",
                    };
                }

                setCart((prev) =>
                    prev.map((food) =>
                        food.food_id === food_id ? 
                        {
                            ...food,
                            quantity: result.data.quantity,
                        } : 
                        food
                    )
                );

                return {
                    success: true,
                    message: result.message,
                };
            }

            // Guest cart
            setCart((prev) =>
                prev
                    .map((food) =>
                        food.food_id === food_id
                            ? {
                                ...food,
                                quantity,
                            }
                            : food
                    )
                    .filter((food) => food.quantity > 0)
            );

            return {
                success: true,
                message: "Food quantity updated.",
            };
        } catch (error) {
            console.error("Update cart quantity error:", error);

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    };

    const clearCart = async () => {
        try {
            let message = "Cart cleared successfully.";

            if (user) {
                const response = await fetch("/api/cart", {
                    method: "DELETE",
                });

                const result = await response.json();

                if (!response.ok || !result.success) {
                    return {
                        success: false,
                        message: result.message || "Failed to clear cart",
                    };
                }

                message = result.message;
            }

            setCart([]);
            localStorage.removeItem("cart");

            return {
                success: true,
                message,
            };
        } catch (error) {
            console.error("Cart clear error:", error);

            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }
    };

    return(
        <CartContext.Provider value={{ cart, cartLoading, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useContext must be used within an CartProvider!");
    }

    return context;
}