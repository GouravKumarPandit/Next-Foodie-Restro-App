import { Search } from "lucide-react";

function SearchBox({placeholder = "Search"}) {
    return (
        <>
            <div className="">
                <div className="relative w-full max-w-md">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors peer-focus:text-orange-500"
                    />

                    <input
                        type="text"
                        placeholder={placeholder}
                        className="
                            peer
                            w-full rounded-lg
                            border border-gray-200
                            bg-white
                            py-2.5 pl-10 pr-4
                            text-sm text-gray-900
                            placeholder:text-gray-400
                            outline-none
                            transition-all duration-200
                            hover:border-orange-400
                            focus:border-orange-500
                            hover:bg-orange-50
                            focus:ring-2
                            focus:ring-orange-500/10
                        "
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBox;