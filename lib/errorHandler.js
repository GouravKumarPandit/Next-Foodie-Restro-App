// Handles that error and converts it into HTTP response "I received an error. Now turn it into an HTTP response."

import { NextResponse } from "next/server"

export const handleApiError = (error) => {
    return NextResponse.json(
        {
            success: false,
            message: error.message || "Something went wrong!",
            errors: error.errors || []
        }, 
        {
            status: error.statusCode || 500
        }
    ) 
}