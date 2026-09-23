import React from 'react'

function WebsiteHeading({ heading, description }) {
    return (
        <>
            <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-xl font-extrabold text-white shadow-md">
                    QB
                </div>
            </div>

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    {heading}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>
            </div>
        </>
    )
}

export default WebsiteHeading;