"use client";

import {
    Search,
    ShoppingCart,
    Menu,
    X,
    UserRound,
    ChevronDown,
    LogOut,
    User,
    Package,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const publicMenuItems = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/menu",
        label: "Menu",
    },
    {
        href: "/orders",
        label: "My Orders",
    },
];

export default function Header() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    console.log("User >> ", user);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setProfileOpen(false);
        setMobileMenu(false);
    }, [pathname]);

    const handleLogout = async () => {
        setProfileOpen(false);
        setMobileMenu(false);

        try {
            const result = await logout();

            if (!result.ok) {
                toast.error(result.message || "Logout failed");
                return;
            }

            toast.success(result.message || "Logged out successfully");
            router.push("/login");
        } catch (error) {
            console.log("Logout Error >> ", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#eee5dc] bg-white">
            <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6900] text-white shadow-sm">
                        <span className="text-2xl font-bold">♨</span>
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-[#0b1b35] sm:text-2xl">
                            Quick<span className="text-[#ff6900]">Bite</span>
                        </h1>

                        <p className="hidden text-[11px] font-medium tracking-[2px] text-gray-400 sm:block">
                            FOOD DELIVERED FAST
                        </p>
                    </div>
                </div>

                <nav className="hidden items-center gap-9 lg:flex">
                    {publicMenuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`${
                                pathname == item.href
                                    ? "font-semibold text-[#ff6900]"
                                    : "font-medium text-[#344054]"
                            } transition hover:text-[#ff6900]`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-5 lg:flex">
                    <button className="text-[#64748b] transition hover:text-[#ff6900]">
                        <Search size={22} />
                    </button>

                    <Link href={"/cart"} className="relative text-[#344054]">
                        <ShoppingCart size={22} />

                        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6900] px-1 text-[10px] font-bold text-white">
                            2
                        </span>
                    </Link>

                    {
                        !user ? <>
                            <Link href="/login" className="font-semibold text-[#0b1b35]">
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-xl bg-[#ff6900] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#e85f00]"
                            >
                                Sign Up
                            </Link>
                        </> :                    
                        <div className="relative" ref={profileRef}>
                            <button
                                type="button"
                                onClick={() => setProfileOpen((prev) => !prev)}
                                className="flex items-center gap-2 rounded-xl border border-[#eee5dc] px-3 py-2.5 font-semibold text-[#0b1b35] transition hover:border-[#ff6900] hover:text-[#ff6900]"
                                aria-expanded={profileOpen}
                                aria-haspopup="menu"
                            >
                                <UserRound size={18} />
                                <span>Account</span>
                                <ChevronDown
                                    size={16}
                                    className={`transition ${profileOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {profileOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-[#eee5dc] bg-white py-2 shadow-lg"
                                >
                                    <Link
                                        href="/profile"
                                        role="menuitem"
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#344054] transition hover:bg-[#fff0e5] hover:text-[#ff6900]"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <User size={16} />
                                        Profile
                                    </Link>

                                    <Link
                                        href="/orders"
                                        role="menuitem"
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#344054] transition hover:bg-[#fff0e5] hover:text-[#ff6900]"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <Package size={16} />
                                        My Orders
                                    </Link>

                                    <div className="my-1 h-px bg-[#eee5dc]" />

                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                </div>

                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="rounded-lg p-2 text-[#0b1b35] lg:hidden"
                >
                    {mobileMenu ? <X size={25} /> : <Menu size={25} />}
                </button>
            </div>

            {mobileMenu && (
                <div className="border-t border-[#eee5dc] bg-white px-4 py-5 lg:hidden">
                    <div className="flex flex-col gap-4">
                        {publicMenuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={`${
                                    pathname == item.href
                                        ? "rounded-lg bg-[#fff0e5] px-4 py-3 font-semibold text-[#ff6900]"
                                        : "px-4 py-2 font-medium text-[#344054]"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="my-2 h-px bg-[#eee5dc]" />

                        {
                            !user ? <>
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 px-4 py-2 font-semibold text-[#0b1b35]"
                                >
                                    <UserRound size={18} />
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    className="rounded-xl bg-[#ff6900] px-5 py-3 text-center font-semibold text-white"
                                >
                                    Sign Up
                                </Link>
                            </> :
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 font-medium text-[#344054]"
                                >
                                    <User size={18} />
                                    Profile
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-left font-medium text-red-600"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                </div>
            )}
        </header>
    );
}
