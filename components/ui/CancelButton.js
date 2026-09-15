import Link from "next/link";

function CancelButton({ label = "Cancel", href = "#", className = "" }) {
    return (
        <Link
            href={href}
            className={`inline-flex w-fit items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20
                ${className}
            `}
        >
            {label}
        </Link>
    );
}

export default CancelButton;