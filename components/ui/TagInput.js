"use client";

import { useState } from "react";
import { X } from "lucide-react";

function TagInput({
    label,
    name,
    value = [],
    onChange,
    placeholder = "Type and press Enter",
    required = false,
    errorMessage = "",
    hint = "Press Enter or comma to add",
}) {
    const [inputValue, setInputValue] = useState("");
    const tags = Array.isArray(value) ? value : [];

    const emitChange = (nextTags) => {
        onChange?.({
            target: {
                name,
                value: nextTags,
            },
        });
    };

    const addTag = (rawValue) => {
        const nextTag = rawValue.trim();

        if (!nextTag) {
            return;
        }

        if (tags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
            setInputValue("");
            return;
        }

        emitChange([...tags, nextTag]);
        setInputValue("");
    };

    const removeTag = (index) => {
        emitChange(tags.filter((_, tagIndex) => tagIndex !== index));
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(inputValue);
            return;
        }

        if (event.key === "Backspace" && !inputValue && tags.length) {
            removeTag(tags.length - 1);
        }
    };

    const handleBlur = () => {
        if (inputValue.trim()) {
            addTag(inputValue);
        }
    };

    const handlePaste = (event) => {
        const pastedText = event.clipboardData.getData("text");

        if (!pastedText.includes(",")) {
            return;
        }

        event.preventDefault();

        const nextTags = pastedText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        const mergedTags = [...tags];

        nextTags.forEach((tag) => {
            if (!mergedTags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
                mergedTags.push(tag);
            }
        });

        emitChange(mergedTags);
        setInputValue("");
    };

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

            <div
                className={`
                    flex min-h-[46px] w-full flex-wrap items-center gap-2 rounded-lg
                    border bg-white p-2
                    outline-none
                    transition-all duration-200
                    hover:border-orange-400
                    focus-within:border-orange-500
                    focus-within:ring-2 focus-within:ring-orange-500/10
                    ${errorMessage ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10" : "border-gray-200"}
                `}
            >
                {tags.map((tag, index) => (
                    <span
                        key={`${tag}-${index}`}
                        className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="rounded-full p-0.5 text-orange-500 transition hover:bg-orange-100 hover:text-orange-700"
                            aria-label={`Remove ${tag}`}
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onPaste={handlePaste}
                    placeholder={tags.length ? "" : placeholder}
                    className="min-w-[140px] flex-1 border-0 bg-transparent p-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
            </div>

            {hint && !errorMessage && (
                <p className="mt-1.5 text-xs text-gray-400">
                    {hint}
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

export default TagInput;
