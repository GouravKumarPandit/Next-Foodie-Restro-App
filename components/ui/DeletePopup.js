import { AlertTriangle, Trash2, X } from 'lucide-react';

function DeletePopup({ deleteType = "", onClose, onDelete, name }) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                        <h2 className="text-lg font-semibold text-gray-900"> Delete {deleteType} </h2>
                        <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600" >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="px-5 py-6">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <AlertTriangle size={28} className="text-red-500" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-base font-semibold text-gray-900"> Are you sure? </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-500"> You are about to delete{" "}
                                <span className="font-medium text-gray-800 font-semibold"> {name || `this ${deleteType}`}</span>. This action cannot be undone.
                            </p>
                        </div>
                    </div> {/* Footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end">
                        <button type="button" onClick={onClose} className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 " > Cancel </button>
                        <button type="button" onClick={onDelete} className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 " >
                            <Trash2 size={17} /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeletePopup;