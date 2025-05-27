import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu } from 'lucide-react';

const OrgMembers = () => {
    const { auth, setAuth } = useAuth();

    const [members, setMembers] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("degree");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const id = auth?.user.organization_id;
    console.log("Members Organization ID:", id);

    useEffect(() => {
        const getAllMembersFiltered = async () => {
            try {
                const allMembersFiltered = await api.get(`/organization/getMembers?id=${id}&${selectedFilter}=${searchInput}`);
                console.log("Filtered Members:", allMembersFiltered.data);
                console.log("array: ", allMembersFiltered.data.members);
                setMembers(Array.isArray(allMembersFiltered.data.members) ? allMembersFiltered.data.members : []);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        }
        getAllMembersFiltered();
    }, [id, selectedFilter, searchQuery]);


    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedFilter(selectedValue);
    }

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortOrder(selectedSort);
    }
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput)
    };



    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="flex items-start justify-center">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto mt-12">
                    <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">Organization Members</h1>
                    <p className="text-gray-700 text-center">
                        Here you can view and manage your organization's members.
                    </p>
                    <div className="flex items-center gap-2 mb-6">
                        {/* Filter Dropdown with Icon */}
                        <div className="relative">
                            <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                onChange={handleSelectChange}
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
                            <form onSubmit={handleSearchSubmit} className="flex">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="border rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="submit"
                                    className="border border-l-0 rounded-r px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Search
                                </button>
                            </form>


                        </div>
                        <div className="relative">
                            <ChartBar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                className="border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                defaultValue="asc"
                                onChange={handleSortChange} // Add handler if needed
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
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
                                    <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Committee</th>
                                    <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Committee Role</th>
                                    <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                    <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Academic Year Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4 text-gray-400">
                                            No members found.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member, idx) => (
                                        <tr key={member.id || idx}>
                                            <td className="px-6 py-2">{member.member_id}</td>
                                            <td className="px-6 py-2">{member.first_name + " " + member.last_name}</td>
                                            <td className="px-6 py-2">{member.sex}</td>
                                            <td className="px-6 py-2">{member.degree_program}</td>
                                            <td className="px-6 py-2">{member.batch}</td>
                                            <td className="px-6 py-2">{member.committee}</td>
                                            <td className="px-6 py-2">{member.committee_role}</td>
                                            <td className="px-6 py-2">{member.status}</td>
                                            <td className="px-6 py-2">{member.academic_year}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgMembers;