import {
    Search,
    Bike,
    UtensilsCrossed
} from "lucide-react";

export const categories = [
    { icon: "🍕", name: "Pizza", items: 18 },
    { icon: "🍔", name: "Burgers", items: 12 },
    { icon: "🍜", name: "Noodles", items: 9 },
    { icon: "🍛", name: "Biryani", items: 14 },
    { icon: "🥗", name: "Healthy", items: 8 },
    { icon: "🍰", name: "Desserts", items: 11 },
];

export const featuredFoods = [
    {
        name: "Paneer Butter Masala",
        category: { name: "Curry" },
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
        description: "Cottage cheese in a creamy tomato-cashew gravy with butter and kasuri methi.",
        price: 329,
        discountPrice: 279,
        isVeg: true,
        isAvailable: true,
        preparationTime: 25,
        cuisine: "North Indian",
        tags: ["creamy", "bestseller"],
        featured: true,
        rating: 4.7,
        reviewCount: 186,
        serves: 2,
        servingSize: "Regular",
    },
    {
        name: "Chicken Tikka Bowl",
        category: { name: "Grill" },
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
        description: "Char-grilled chicken tikka over jeera rice with mint chutney and onions.",
        price: 349,
        discountPrice: 299,
        isVeg: false,
        isAvailable: true,
        preparationTime: 28,
        cuisine: "North Indian",
        tags: ["protein", "spicy"],
        featured: true,
        rating: 4.6,
        reviewCount: 142,
        serves: 1,
        servingSize: "Bowl",
    },
    {
        name: "Masala Dosa",
        category: { name: "South Indian" },
        image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
        description: "Crispy fermented dosa stuffed with spiced potato masala, chutney, and sambar.",
        price: 189,
        discountPrice: 159,
        isVeg: true,
        isAvailable: true,
        preparationTime: 18,
        cuisine: "South Indian",
        tags: ["breakfast", "crispy"],
        featured: true,
        rating: 4.8,
        reviewCount: 254,
        serves: 1,
        servingSize: "Regular",
    },
    {
        name: "Chocolate Lava Cake",
        category: { name: "Dessert" },
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
        description: "Warm molten chocolate cake with a gooey centre and vanilla ice cream.",
        price: 179,
        discountPrice: 149,
        isVeg: true,
        isAvailable: true,
        preparationTime: 12,
        cuisine: "Continental",
        tags: ["dessert", "hot"],
        featured: true,
        rating: 4.8,
        reviewCount: 203,
        serves: 1,
        servingSize: "Single",
    },
];

export const deals = [
    {
        title: "Weekend Feast",
        offer: "30% OFF",
        detail: "On all biryanis every Saturday",
        color: "bg-[#ff6900]",
        emoji: "🍛",
    },
    {
        title: "Lunch Express",
        offer: "Free Delivery",
        detail: "Orders above ₹299 before 3 PM",
        color: "bg-[#0b1b35]",
        emoji: "🚴",
    },
    {
        title: "Sweet Treat",
        offer: "Buy 1 Get 1",
        detail: "On selected desserts today",
        color: "bg-amber-500",
        emoji: "🍰",
    },
];

export const steps = [
    {
        icon: Search,
        title: "Browse the menu",
        text: "Pick from curries, biryani, pizza, desserts, and more.",
    },
    {
        icon: UtensilsCrossed,
        title: "Place your order",
        text: "Add your favourites and check out in a few taps.",
    },
    {
        icon: Bike,
        title: "Get it delivered",
        text: "Hot food at your door in about 25–35 minutes.",
    },
];

export const reviews = [
    {
        name: "Gourav Pandit",
        city: "Pune",
        rating: 5,
        text: "The paneer butter masala tastes just like my favourite restaurant. Packaging was neat and still hot.",
    },
    {
        name: "Ashwini Kumar",
        city: "Mumbai",
        rating: 5,
        text: "Ordered the chicken tikka bowl for lunch. Fast delivery and the spice level was perfect.",
    },
    {
        name: "Ashima Saxena",
        city: "Bengaluru",
        rating: 4,
        text: "Masala dosa was crispy and the chutney was fresh. Will definitely order again this weekend.",
    },
];
