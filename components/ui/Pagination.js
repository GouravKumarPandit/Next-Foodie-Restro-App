import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

function Pagination() {
    return (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">

            {/* Results Info */}
            <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-800">
                    1
                </span>{" "}
                to{" "}
                <span className="font-medium text-gray-800">
                    12
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-800">
                    48
                </span>{" "}
                results
            </p>

            {/* Pagination */}
            <div className="flex items-center gap-1.5">

                {/* Previous */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 w-9
                        items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        text-gray-500
                        transition-all duration-200
                        hover:border-orange-200
                        hover:bg-orange-50
                        hover:text-orange-500
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Page 1 */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 min-w-9
                        items-center justify-center
                        rounded-lg
                        bg-orange-500
                        px-2.5
                        text-sm font-medium
                        text-white
                        shadow-sm
                        transition-all duration-200
                        hover:bg-orange-600
                    "
                >
                    1
                </button>

                {/* Page 2 */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 min-w-9
                        items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        px-2.5
                        text-sm font-medium
                        text-gray-600
                        transition-all duration-200
                        hover:border-orange-200
                        hover:bg-orange-50
                        hover:text-orange-500
                    "
                >
                    2
                </button>

                {/* Page 3 */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 min-w-9
                        items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        px-2.5
                        text-sm font-medium
                        text-gray-600
                        transition-all duration-200
                        hover:border-orange-200
                        hover:bg-orange-50
                        hover:text-orange-500
                    "
                >
                    3
                </button>

                {/* Ellipsis */}
                <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">
                    ...
                </span>

                {/* Last Page */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 min-w-9
                        items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        px-2.5
                        text-sm font-medium
                        text-gray-600
                        transition-all duration-200
                        hover:border-orange-200
                        hover:bg-orange-50
                        hover:text-orange-500
                    "
                >
                    4
                </button>

                {/* Next */}
                <button
                    type="button"
                    className="
                        inline-flex h-9 w-9
                        items-center justify-center
                        rounded-lg
                        border border-gray-200
                        bg-white
                        text-gray-500
                        transition-all duration-200
                        hover:border-orange-200
                        hover:bg-orange-50
                        hover:text-orange-500
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <ChevronRight size={18} />
                </button>

            </div>
        </div>
    );
}

export default Pagination;