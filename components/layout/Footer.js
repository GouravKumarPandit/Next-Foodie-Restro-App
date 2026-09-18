import {
    Utensils,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
} from "lucide-react";

function Footer() {
    return (
        <footer className="relative mt-12 overflow-hidden bg-orange-500 text-white">

            {/* Decorative background elements */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-orange-400/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-orange-600/40 blur-3xl" />

            {/* Decorative circles */}
            <div className="pointer-events-none absolute left-[8%] top-10 h-2 w-2 animate-pulse rounded-full bg-white/40" />
            <div className="pointer-events-none absolute right-[12%] top-16 h-3 w-3 animate-pulse rounded-full bg-white/30 [animation-delay:500ms]" />
            <div className="pointer-events-none absolute bottom-16 left-[18%] h-2 w-2 animate-pulse rounded-full bg-white/30 [animation-delay:1000ms]" />

            {/* Decorative icons */}
            <div className="pointer-events-none absolute left-5 top-8 hidden rotate-[-15deg] opacity-10 sm:block lg:left-12">
                <Utensils size={60} />
            </div>

            <div className="pointer-events-none absolute right-5 top-8 hidden rotate-[15deg] opacity-10 sm:block lg:right-12">
                <Utensils size={60} />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">

                {/* Main footer content */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                                <Utensils size={20} />
                            </div>

                            <h2 className="text-xl font-extrabold tracking-tight">
                                QuickBite
                            </h2>
                        </div>

                        <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
                            Delicious food from your favorite restaurants,
                            delivered quickly to your doorstep.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">
                            Company
                        </h3>

                        <div className="mt-3 space-y-2.5 text-sm text-white/75">
                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                About Us
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>

                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                Restaurants
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>

                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                Offers
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">
                            Help
                        </h3>

                        <div className="mt-3 space-y-2.5 text-sm text-white/75">
                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                Contact Us
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>

                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                FAQs
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>

                            <a
                                href="#"
                                className="group flex items-center gap-1 transition hover:text-white"
                            >
                                Privacy Policy
                                <ArrowRight
                                    size={13}
                                    className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">
                            Get in touch
                        </h3>

                        <div className="mt-3 space-y-2.5 text-sm text-white/75">

                            <div className="flex items-center gap-2">
                                <Mail size={15} className="shrink-0" />
                                <span>support@quickbite.com</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone size={15} className="shrink-0" />
                                <span>+91 98765 43210</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin size={15} className="shrink-0" />
                                <span>India</span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-white/20 pt-5 text-center">
                    <p className="text-xs text-white/70 sm:text-sm">
                        © 2026 QuickBite. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;