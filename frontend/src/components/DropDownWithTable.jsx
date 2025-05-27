// Example: Dropdown with a table inside
import React, { useState } from "react";

const DropdownWithTable = () => {
    const [open, setOpen] = useState(false);

    // Example data
    const members = [
        { name: "Alice", sex: "Female", age: 22 },
        { name: "Bob", sex: "Male", age: 24 },
        { name: "Charlie", sex: "Other", age: 23 },
    ];

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-t hover:bg-blue-600 transition"
                onClick={() => setOpen((prev) => !prev)}
            >
                {open ? "Hide Members" : "Show Members"}
            </button>
            {open && (
                <div className="bg-white border border-blue-500 rounded-b shadow">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Sex</th>
                                <th className="px-4 py-2 border-b">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m, idx) => (
                                <tr key={idx}>
                                    <td className="px-4 py-2 border-b">{m.name}</td>
                                    <td className="px-4 py-2 border-b">{m.sex}</td>
                                    <td className="px-4 py-2 border-b">{m.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DropdownWithTable;