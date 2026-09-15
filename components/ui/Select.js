function Select({
    options = [],
    label = "",
    errorMessage = "",
    required = false,
    className = "",
    loading = false,
    notes = "",
    ...props
}) {
    return (
        <div className="w-full">

            {label && (
                <label
                    htmlFor={props.id}
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <select
                {...props}
                disabled={loading || props.disabled}
                className={`
                    w-full rounded-lg
                    border bg-white
                    p-2.5
                    text-sm text-gray-900
                    outline-none
                    transition-all duration-200
                    hover:border-orange-400
                    focus:border-orange-500
                    focus:ring-2 focus:ring-orange-500/10
                    disabled:cursor-not-allowed
                    disabled:bg-gray-50
                    disabled:text-gray-400
                    ${
                        errorMessage
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            : "border-gray-200"
                    }
                    ${className}
                `}
            >
                <option value="">Select {label}</option>
                {loading ? (
                    <option value="">
                        Loading {label}...
                    </option>
                ) : (
                    options.map((option, index) => (
                        <option
                            key={option.key ?? index}
                            value={option.key}
                        >
                            {option.value}
                        </option>
                    ))
                )}
            </select>

            {notes && (
                <p className="mt-1.5 text-xs ">
                    {notes}
                </p>
            )}

            {errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errorMessage}
                </p>
            )}

        </div>
    );
}

export default Select;