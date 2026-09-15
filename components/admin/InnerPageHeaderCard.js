import Link from "next/link";
import { ArrowLeft, Edit, Plus } from "lucide-react";

export default function InnerPageHeaderCard({
    title = "",
    description = "",
    buttonText,
    buttonHref,
    back,
    backHref,
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    {
                        (backHref && back) ? <Link
                            href="/admin/foods"
                            className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-orange-600"
                        >
                            <ArrowLeft size={16} />
                            {back}
                        </Link> : ""
                    }

                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                        {title}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                {
                    (buttonHref && buttonText) ? <Link
                        href={buttonHref}
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600"
                    >
                        <Edit size={17} />
                        {buttonText}
                    </Link> : ""
                }
            </div>
        </div>
    );
}
