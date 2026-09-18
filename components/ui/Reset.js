import { RotateCcw } from 'lucide-react';

function Reset() {
    return (
        <>
            <button
                type="button"
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium bg-orange-50 text-orange-600 transition hover:bg-orange-100 hover:text-orange-600"
            >
                <RotateCcw size={15} />
                Reset
            </button>
        </>
    )
}

export default Reset;