function FoodCardPlaceholder() {
    return (
        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

            {/* Image Skeleton */}
            <div className="relative h-52 w-full animate-pulse bg-gray-200 sm:h-56">
                <div className="absolute left-3 top-3 h-6 w-20 rounded-full bg-gray-300" />
                <div className="absolute right-3 top-3 h-6 w-14 rounded-full bg-gray-300" />
                <div className="absolute bottom-3 left-3 h-6 w-20 rounded-full bg-gray-300" />
            </div>

            {/* Content */}
            <div className="animate-pulse p-4">

                <div className="mb-2 flex items-center justify-between">
                    <div className="h-3 w-20 rounded bg-orange-100" />
                    <div className="h-3 w-12 rounded bg-gray-200" />
                </div>

                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-16 rounded bg-gray-100" />

                <div className="mt-3 space-y-2">
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-2/3 rounded bg-gray-100" />
                </div>

                <div className="mt-3 flex gap-2">
                    <div className="h-5 w-14 rounded-full bg-orange-50" />
                    <div className="h-5 w-16 rounded-full bg-orange-50" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <div className="h-5 w-20 rounded bg-gray-200" />
                        <div className="mt-1 h-3 w-14 rounded bg-gray-100" />
                    </div>

                    <div className="h-9 w-24 rounded-lg bg-gray-200" />
                </div>

            </div>
        </div>
    );
}

export default FoodCardPlaceholder;
