import React from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import { ChartBar } from 'lucide-react';

const OrgFees = () => {
    const { auth, setAuth } = useAuth();

    const id = auth?.user.organization_id;
    console.log("Fees Organization ID:", id);

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Organization Fees</h1>
                <p className="text-gray-700 text-center">
                    Here you can view and manage your organization's fees.
                </p>
                <div className="flex items-center gap-2 mb-6">
                    {/* Filter Dropdown with Icon */}
                    <div className="relative">
                        <ChartBar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                            className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                            defaultValue="degree"
                        >
                            <option value="degree">Role</option>
                            <option value="batch">Status</option>
                            <option value="batch">Gender</option>
                            <option value="batch">Degree Program</option>
                            <option value="batch">Batch</option>
                            <option value="batch">Committee</option>
                            {/* Add more filter options as needed */}
                        </select>
                    </div>
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <table className="text-sm border-collapse mx-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Degree Program</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">University Batch</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Committee</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Year Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrgFees;