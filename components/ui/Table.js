function Table({columns = [], children}) {
    return (
        <>
            <table className="w-full min-w-[700px]">
                <thead className="border-b border-orange-200 bg-gray-50">
                    <tr>
                        {
                            columns.length ? 
                                columns.map((column, index) => <th key={index} className={`px-6 py-4 ${index === columns.length - 1 ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-700`}>{column}</th>) :
                                <th className="px-6 py-4 text-sm text-center font-semibold text-gray-700"># ID</th>
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-200">
                    {children}
                </tbody>
            </table>
        </>
    )
}

export default Table;