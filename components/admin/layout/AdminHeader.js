import {
    Search,
    Bell,
    Menu,
} from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="sticky top-0 z-30 h-20 border-b border-[#eee5dc] bg-white">

            <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Mobile menu */}
                <button className="rounded-lg p-2 text-[#0b1b35] lg:hidden">
                    <Menu size={22} />
                </button>

                {/* Search */}
                <div className="hidden max-w-md flex-1 md:block">

                    <div className="flex items-center gap-3 rounded-xl border border-[#eee5dc] bg-[#fff8ef] px-4 py-2.5">

                        <Search
                            size={19}
                            className="text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent text-sm outline-none"
                        />

                    </div>

                </div>

                {/* Right */}
                <div className="ml-auto flex items-center gap-5">

                    <button className="relative text-gray-500 hover:text-[#ff6900]">

                        <Bell size={21} />

                        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ff6900]" />

                    </button>

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0e5] font-bold text-[#ff6900]">
                            A
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-[#0b1b35]">
                                Admin User
                            </p>

                            <p className="text-xs text-gray-400">
                                Administrator
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
}