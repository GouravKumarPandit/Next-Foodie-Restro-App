function FormSection({ title, description, children }) {
    return (
        <section className="rounded-lg border border-gray-200 p-4 sm:p-5">
            <div className="mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                </h3>

                {description && (
                    <p className="mt-1 text-xs text-gray-500">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}

export default FormSection;
