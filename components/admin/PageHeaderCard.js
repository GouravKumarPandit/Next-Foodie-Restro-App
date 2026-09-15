import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function PageHeaderCard({
    title,
    description,
    buttonText,
    buttonHref,
    backHref,
}) {
    return (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

                {/* Action Button */}
                {buttonText && buttonHref && (
                    <Link
                        href={buttonHref}
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                    >
                        <Plus size={18} />
                        {buttonText}
                    </Link>
                )}

                {/* Back Button  */}
                {backHref && (
                    <Link
                        href={backHref}
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                )}
            </div>
        </div>
    );
}
