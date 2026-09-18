function RadioGroup({
    label,
    description,
    name,
    value,
    options = [],
    onChange,
    required = false,
    errorMessage = "",
}) {
    return (
        <div className="w-full">
            {label && (
                <p className="text-sm font-medium text-gray-800">
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </p>
            )}

            {description && (
                <p className="mt-1 text-xs text-gray-500">
                    {description}
                </p>
            )}

            <div className="mt-4 flex flex-wrap gap-6">
                {options.map((option) => {
                    const optionValue = String(option.value);
                    const isChecked = String(value) === optionValue;

                    return (
                        <label
                            key={optionValue}
                            className="flex cursor-pointer items-center gap-2"
                        >
                            <input
                                type="radio"
                                name={name}
                                value={optionValue}
                                checked={isChecked}
                                onChange={onChange}
                                className="h-4 w-4 accent-orange-500"
                            />

                            <span className="text-sm text-gray-700">
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </div>

            {errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default RadioGroup;
