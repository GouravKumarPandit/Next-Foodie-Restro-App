function Input({
    label,
    required = false,
    errorMessage = "",
    className = "",
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full rounded-lg
                    border bg-white
                    p-2.5
                    text-sm text-gray-900
                    placeholder:text-gray-400
                    outline-none
                    transition-all duration-200
                    hover:border-orange-400
                    focus:border-orange-500
                    hover:bg-orange-50
                    focus:ring-2 focus:ring-orange-500/10
                    ${errorMessage ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200"}
                    ${className}
                `}
            />

            {errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default Input;