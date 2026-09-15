export default function Footer() {
    return (
        <footer className="mt-16 bg-[#ff6900] text-white z-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h2 className="text-2xl font-extrabold">
                            Quick<span className="text-white">Bite</span>
                        </h2>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/80">
                            Delicious food from your favorite restaurants,
                            delivered quickly to your doorstep.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-bold">Company</h3>
                        <div className="mt-4 space-y-3 text-sm text-white/80">
                            <a href="#" className="block hover:text-white">
                                About Us
                            </a>
                            <a href="#" className="block hover:text-white">
                                Restaurants
                            </a>
                            <a href="#" className="block hover:text-white">
                                Offers
                            </a>
                        </div>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="font-bold">Help</h3>
                        <div className="mt-4 space-y-3 text-sm text-white/80">
                            <a href="#" className="block hover:text-white">
                                Contact Us
                            </a>
                            <a href="#" className="block hover:text-white">
                                FAQs
                            </a>
                            <a href="#" className="block hover:text-white">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold">Get in touch</h3>
                        <p className="mt-4 text-sm text-white/80">
                            support@quickbite.com
                        </p>
                        <p className="mt-2 text-sm text-white/80">
                            +91 98765 43210
                        </p>
                    </div>
                </div>
                <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/80">
                    © 2026 QUICKBITE. All rights reserved.
                </div>
            </div>
        </footer>
    );
}