function Checkbox({label, description, required = false, errorMessage = "", ...props}) {
    return (
        <div className="w-full">
            <label
                className="
                    flex cursor-pointer items-center justify-between
                    gap-4 rounded-lg border border-gray-200
                    bg-white p-4
                    transition-all duration-200
                    hover:border-orange-200
                    hover:bg-orange-50/30
                "
            >
                <div>
                    <p className="text-sm font-medium text-gray-800">
                        {label}

                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </p>

                    {description && (
                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

                <input
                    type="checkbox"
                    {...props}
                    className="
                        h-5 w-5
                        cursor-pointer
                        rounded
                        border-gray-300
                        text-orange-500
                        accent-orange-500
                        focus:ring-2
                        focus:ring-orange-500/20
                    "
                />
            </label>

            {errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default Checkbox;