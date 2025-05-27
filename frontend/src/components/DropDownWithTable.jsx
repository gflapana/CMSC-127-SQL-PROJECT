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
            <div
                className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-t cursor-pointer select-none"
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>Members</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
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