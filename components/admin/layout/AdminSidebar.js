"use client";

import { Settings, LogOut } from "lucide-react";
import SidebarItem from "../AdminSidebarItem";
import { usePathname } from "next/navigation";
import { menuItems } from "../../../data/menuItems";

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#eee5dc] bg-white lg:block">
            <div className="flex h-20 items-center gap-3 border-b border-[#eee5dc] px-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6900] text-xl text-white">
                    ♨
                </div>
                <div>
                    <h1 className="text-lg font-extrabold text-[#0b1b35]">
                        Quick<span className="text-[#ff6900]">Bite</span>
                    </h1>

                    <p className="text-[10px] font-semibold tracking-wider text-gray-400">
                        ADMIN PANEL
                    </p>
                </div>
            </div>

            <nav className="px-4 py-6">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Main menu
                </p>

                <div className="mt-4 space-y-1">
                    {
                        menuItems.map((item, index) => {
                            const active = pathname === item.link || pathname.startsWith(`${item.link}/`);

                            return (
                                <SidebarItem key={index} link={item.link} icon={item.icon} label={item.label} active={active} />
                            );
                        })
                    }
                </div>

                <p className="mt-8 px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    System
                </p>
                <div className="mt-4 space-y-1">
                    <SidebarItem icon={<Settings size={19} />} label="Settings" />
                    <SidebarItem icon={<LogOut size={19} />} label="Logout" />
                </div>
            </nav>
        </aside>
    );
}