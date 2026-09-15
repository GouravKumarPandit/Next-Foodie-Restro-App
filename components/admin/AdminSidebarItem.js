import Link from "next/link";

export default function SidebarItem({ link = "/", icon, label, active = false }) {

    return (
        <Link
            href={link}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active
                    ? "bg-[#fff0e5] text-[#ff6900]"
                    : "text-gray-500 hover:bg-[#fff8ef] hover:text-[#ff6900]"
                }`}
        >
            {icon}

            <span>{label}</span>
        </Link>
    );
}