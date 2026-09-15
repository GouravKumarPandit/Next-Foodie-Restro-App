function FormLoader() {
    return (
        <>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="space-y-6 animate-pulse">

                    {/* Category Name */}
                    <div>
                        <div className="mb-2 h-4 w-28 rounded bg-gray-200" />
                        <div className="h-11 w-full rounded-lg bg-gray-100" />
                    </div>

                    {/* Description */}
                    <div>
                        <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
                        <div className="h-24 w-full rounded-lg bg-gray-100" />
                    </div>

                    {/* Image */}
                    <div>
                        <div className="mb-2 h-4 w-32 rounded bg-gray-200" />
                        <div className="h-48 w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50" />
                    </div>

                    {/* Active Category */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                        <div className="space-y-2">
                            <div className="h-4 w-32 rounded bg-gray-200" />
                            <div className="h-3 w-52 rounded bg-gray-100" />
                        </div>

                        <div className="h-5 w-5 rounded bg-gray-200" />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <div className="h-10 w-20 rounded-lg bg-gray-100" />
                        <div className="h-10 w-32 rounded-lg bg-gray-200" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default FormLoader;