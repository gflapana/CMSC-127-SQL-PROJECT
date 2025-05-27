import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar } from 'lucide-react';

const OrgMembers = () => {
    const { auth, setAuth } = useAuth();

    const [selectedFilter, setSelectedFilter] = useState("degree");

    const id = auth?.user.organization_id;
    console.log("Members Organization ID:", id);

    useEffect(() => {

    }, [])

    const getAllMembersFiltered = async (query, orderBy, sort) => {
        try {
            const allMembersFiltered = await api.get(`/organization/getMembers?organization_id=${id}&${query}=`);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedFilter(selectedValue);
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow text-center">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">Organization Members</h1>
                <p className="text-gray-700">
                    Here you can view and manage your organization's members.
                </p>
                <div className="flex items-center gap-2 mb-6">
                    {/* Filter Dropdown with Icon */}
                    <div className="relative">
                        <ChartBar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                            onChange = {handleSelectChange}
                            className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                            defaultValue="degree"
                        >
                            <option value="degree">Role</option>
                            <option value="status">Status</option>
                            <option value="sex">Sex</option>
                            <option value="degree_program">Degree Program</option>
                            <option value="batch">Batch</option>
                            <option value="committee_role">Committee</option>
                            {/* Add more filter options as needed */}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <table className="text-sm border-collapse mx-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Sex</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Degree Program</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">University Batch</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Academic Year Joined</th>
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

export default OrgMembers;