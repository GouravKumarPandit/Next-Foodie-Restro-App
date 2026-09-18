function PageHeader({ menu, description }) {
    return (
        <>
            <section className="relative isolate overflow-hidden border-b border-orange-100 bg-white">

                {/* Soft orange background glow */}
                <div className="pointer-events-none absolute -left-24 -top-24 h-60 w-60 rounded-full bg-orange-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />

                {/* Decorative circles */}
                <div className="pointer-events-none absolute left-[10%] top-8 h-2.5 w-2.5 animate-pulse rounded-full bg-orange-300" />
                <div className="pointer-events-none absolute right-[15%] top-12 h-2 w-2 animate-pulse rounded-full bg-orange-400 [animation-delay:500ms]" />
                <div className="pointer-events-none absolute bottom-8 left-[18%] h-2 w-2 animate-pulse rounded-full bg-orange-200 [animation-delay:1000ms]" />

                {/* Decorative food icons */}
                <div className="pointer-events-none absolute left-4 top-6 hidden rotate-[-15deg] text-3xl opacity-10 sm:block lg:left-12 lg:text-5xl">
                    🍕
                </div>

                <div className="pointer-events-none absolute right-5 top-6 hidden rotate-[15deg] text-3xl opacity-10 sm:block lg:right-12 lg:text-5xl">
                    🍔
                </div>

                <div className="pointer-events-none absolute bottom-3 left-8 hidden rotate-[12deg] text-2xl opacity-10 md:block lg:left-20 lg:text-4xl">
                    🍟
                </div>

                <div className="pointer-events-none absolute bottom-3 right-8 hidden rotate-[-12deg] text-2xl opacity-10 md:block lg:right-20 lg:text-4xl">
                    🍜
                </div>

                <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

                    <div className="mx-auto max-w-3xl text-center">

                        {/* Small badge */}
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-orange-600">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                            {menu}
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                            Delicious Food,{" "}
                            <span className="relative inline-block text-orange-500">
                                Made For You

                                {/* Small underline */}
                                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange-200" />
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-gray-500 sm:text-sm">
                            {description}
                        </p>

                        {/* Decorative bottom element */}
                        <div className="mx-auto mt-4 flex items-center justify-center gap-2">
                            <span className="h-px w-8 bg-orange-200 sm:w-14" />

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-xs">
                                🍴
                            </span>

                            <span className="h-px w-8 bg-orange-200 sm:w-14" />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default PageHeader;