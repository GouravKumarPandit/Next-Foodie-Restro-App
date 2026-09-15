function TableLoading({ colLength = 1 }) {
    return (
        <>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
                <tr
                    key={rowIndex}
                    className="border-b border-orange-100 last:border-0"
                >
                    {Array.from({ length: colLength }).map(
                        (_, colIndex) => (
                            colIndex === colLength - 1 ? (
                                <td
                                    key={colIndex}
                                    className="px-5 py-4"
                                >
                                    <div className="flex gap-2 justify-end">
                                        <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
                                        <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
                                    </div>
                                </td>
                            ) : (
                                <td
                                    key={colIndex}
                                    className="px-5 py-4"
                                >
                                    <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
                                </td>
                            )
                        )
                    )}
                </tr>
            ))}
        </>
    );
}

export default TableLoading;