function TextArea({label, required = false, errorMessage = "", className = "", ...props}) {
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

            <textarea
                {...props}
                className={`
                    w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100
                    ${errorMessage ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200"}
                    ${className}
                `}>
            </textarea>

            {errorMessage && (
                <p className="mt-1.5 text-xs text-red-500">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}

export default TextArea