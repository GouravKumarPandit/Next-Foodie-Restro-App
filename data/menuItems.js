import { LayoutDashboard, ShoppingBag, Store, Tags, Users, Utensils } from "lucide-react";

export const menuItems = [
    {
        label: "Dashboard",
        link: "/admin/",
        icon: <LayoutDashboard size={19} />
    },
    {
        label: "Foods",
        link: "/admin/foods",
        icon: <Store size={19} />
    },
    {
        label: "Categories",
        link: "/admin/categories",
        icon: <Utensils size={19} />
    },
    {
        label: "Orders",
        link: "/admin/orders",
        icon: <ShoppingBag size={19} />
    },
    {
        label: "Users",
        link: "/admin/users",
        icon: <Users size={19} />
    },
    {
        label: "Offers",
        link: "/admin/offers",
        icon: <Tags size={19} />
    },
]