"use client";

import {
    Search,
    ShoppingCart,
    Menu,
    X,
    UserRound,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export default function Header() {
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#eee5dc] bg-white">
            <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
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
                    <Link href="/" className="font-semibold text-[#ff6900]" >
                        Home
                    </Link>

                    <Link href="/menu" className="font-medium text-[#344054] transition hover:text-[#ff6900]" >
                        Menu
                    </Link>

                    <Link href="/orders" className="font-medium text-[#344054] transition hover:text-[#ff6900]" >
                        My Orders
                    </Link>

                </nav>

                {/* Right Section */}
                <div className="hidden items-center gap-6 lg:flex">
                    <button className="text-[#64748b] transition hover:text-[#ff6900]">
                        <Search size={22} />
                    </button>

                    <button className="relative text-[#344054]">
                        <ShoppingCart size={22} />

                        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff6900] px-1 text-[10px] font-bold text-white">
                            2
                        </span>
                    </button>

                    <button className="font-semibold text-[#0b1b35]">
                        Login
                    </button>

                    <button className="rounded-xl bg-[#ff6900] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#e85f00]">
                        Sign Up
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="rounded-lg p-2 text-[#0b1b35] lg:hidden"
                >
                    {mobileMenu ? <X size={25} /> : <Menu size={25} />}
                </button>

            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="border-t border-[#eee5dc] bg-white px-4 py-5 lg:hidden">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="rounded-lg bg-[#fff0e5] px-4 py-3 font-semibold text-[#ff6900]">
                            Home
                        </Link>

                        <Link href="/menu" className="px-4 py-2 font-medium text-[#344054]" >
                            Menu
                        </Link>

                        <Link href="/orders" className="px-4 py-2 font-medium text-[#344054]" >
                            My Orders
                        </Link>

                        <div className="my-2 h-px bg-[#eee5dc]" />

                        <button className="flex items-center gap-2 px-4 py-2 font-semibold text-[#0b1b35]">
                            <UserRound size={18} />
                            Login
                        </button>

                        <button className="rounded-xl bg-[#ff6900] px-5 py-3 font-semibold text-white">
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}