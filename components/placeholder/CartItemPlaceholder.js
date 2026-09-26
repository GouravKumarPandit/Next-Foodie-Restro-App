function CartItemPlaceholder() {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-28 w-full shrink-0 animate-pulse rounded-xl bg-gray-200 sm:w-28" />

                <div className="min-w-0 flex-1 animate-pulse">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="h-3 w-20 rounded bg-orange-100" />
                                <div className="h-4 w-12 rounded-full bg-gray-200" />
                            </div>

                            <div className="h-5 w-2/3 rounded bg-gray-200 sm:h-6" />
                        </div>

                        <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100" />
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                        <div className="h-4 w-14 rounded bg-gray-200" />
                        <div className="h-3 w-10 rounded bg-gray-100" />
                        <div className="h-4 w-16 rounded bg-gray-100" />
                    </div>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-16 rounded bg-gray-100" />
                            <div className="h-9 w-[116px] rounded-lg bg-gray-200" />
                        </div>

                        <div className="space-y-1.5 sm:text-right">
                            <div className="h-3 w-16 rounded bg-gray-100 sm:ml-auto" />
                            <div className="h-6 w-20 rounded bg-gray-200 sm:ml-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItemPlaceholder;
