import { NextResponse } from "next/server"

export const apiResponse = (message = "Data fetched", data = [], status = 200) => {
    return NextResponse.json(
        {
            success: true,
            message: message,
            data: data
        },
        {
            status: status
        }
    )
}