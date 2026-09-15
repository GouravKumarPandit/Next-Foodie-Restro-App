import { ImagePlus } from "lucide-react";

function FileInput({
    label,
    required = false,
    className = "",
    errorMessage = "",
    ...props
}) {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}

                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <label
                className="
                    flex h-48 w-full cursor-pointer flex-col
                    items-center justify-center
                    rounded-xl border-2 border-dashed
                    border-gray-200 bg-gray-50
                    transition-all duration-200
                    hover:border-orange-400
                    hover:bg-orange-50
                "
            >
                <ImagePlus
                    size={32}
                    className="mb-2 text-gray-400"
                />

                <p className="text-sm font-medium text-gray-600">
                    Upload {label}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or WEBP
                </p>

                <input
                    type="file"
                    className="hidden"
                    {...props}
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

export default FileInput;