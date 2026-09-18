import React from 'react'

function Heading({heading, description}) {
    return (
        <div>
            <h2 className="font-semibold text-gray-900">
                {heading}
            </h2>
            <p className="text-xs text-gray-500">
                {description}
            </p>
        </div>
    )
}

export default Heading;