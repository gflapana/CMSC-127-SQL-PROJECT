import { useState, useEffect, } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown } from 'lucide-react';

const OrgMembers = () => {
    const { auth } = useAuth();
    const [members, setMembers] = useState([]);
    const [percentageMems, setPercentageMems] = useState([]);
    const [alumni, setAlumni] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("committee_role");
    const [filterSort, setFilterSort] = useState("committee_role");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [tableView, setTableView] = useState("viewall");
    const [semester, setSemester] = useState("");
    const [acadYearInput, setAcadYearInput] = useState("");
    const [acadYearQuery, setAcadYearQuery] = useState("");
    const [pastSemesters, setPastSemesters] = useState(0);
    const [dateQuery, setDateQuery] = useState("");
    const [dateInput, setDateInput] = useState("");

    const org = auth?.user;
    const id = org.organization_id;
    console.log("Members Organization ID:", id);

    useEffect(() => {
        setSortOrder("asc");
        setSearchQuery("");
        setSearchInput("");
        setSemester("");
        setAcadYearInput("");
        setAcadYearQuery("");
        setPastSemesters(0);
        setDateQuery("");
        setDateInput("");
        setFilterSort("committee_role");
    }, [selectedFilter, tableView]);

    useEffect(() => {
        const getAllMembersFiltered = async () => {
            try {
                const allMembersFiltered = await api.get(
                    `/organization/getMembers?id=${id}&${selectedFilter}=${searchQuery}&semester=${semester}&academic_year=${acadYearQuery}&order=${filterSort}&desc=${sortOrder}`);
                setMembers(Array.isArray(allMembersFiltered.data.members) ? allMembersFiltered.data.members : []);
                console.log("Filtered Members:", allMembersFiltered.data.members);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getAllMembersFiltered();
    }, [id, selectedFilter, sortOrder, searchQuery, acadYearQuery, semester, filterSort]);

    useEffect(() => {
        const getMemPercentage = async () => {
            try {
                const response = await api.get(`/organization/getPercentage?id=${id}&semesters=${pastSemesters}`);
                console.log("Percentage Data:", response.data);
                console.log("Percentage Data Specific:", response.data.percentage);
                setPercentageMems(response.data.percentage);
            } catch (error) {
                console.error("Error fetching percentage data:", error);
            }
        }
        getMemPercentage();
    }, [pastSemesters, id]);

    useEffect(() => {
        const getAllAlumni = async () => {
            try {
                const allAlumni = await api.get(`/organization/getAlumni?id=${id}&date=${dateQuery}`);
                setAlumni(Array.isArray(allAlumni.data.alumni) ? allAlumni.data.alumni : []);
                console.log("Alumni Data:", allAlumni.data.alumni);
            } catch (error) {
                console.error("Error fetching alumni:", error);
            }
        }
        getAllAlumni();
    }, [dateQuery, id]);

    const handleSelectChange = (e) => setSelectedFilter(e.target.value);
    const handleFilterSortChange = (e) => setFilterSort(e.target.value);
    const handleSortChange = (e) => setSortOrder(e.target.value);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };
    const handleAcadYearSubmit = (e) => {
        e.preventDefault();
        setAcadYearQuery(acadYearInput);
        // You can also trigger a fetch or filter here if needed
    };

    const handleSemChange = (e) => {
        setSemester(e.target.value);
    };

    // Update tableView on dropdown change
    const handleTableChange = (e) => {
        setTableView(e.target.value);
    };

    const handlePastSemChange = (e) => {
        setPastSemesters(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="flex items-start justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl">
                    {/* Card Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">{org.organization_name} Members</h1>
                        <p className="text-gray-700 text-center">
                            Here you can view and manage your organization's members.
                        </p>
                    </div>
                    {/* Table View Selector and Sort */}
                    <div className="flex flex-row justify-between gap-4 mb-6">
                        <div className="relative">
                            <ArrowDown className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                onChange={handleTableChange}
                                className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                value={tableView}
                            >
                                <option value="viewall">View All</option>
                                <option value="statusreport">Status Report</option>
                            </select>
                        </div>

                        {tableView === "viewall" && (
                            <div className="flex items-center gap-2">
                                <p>
                                    Sort By:
                                </p>
                                <div className="relative w-full md:w-auto max-w-xs">
                                    <ChartBar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        className="border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none w-full md:w-auto"
                                        value={filterSort}
                                        onChange={handleFilterSortChange}
                                    >
                                        <option value="committee_role">Committee Role</option>
                                        <option value="member_status">Status</option>
                                        <option value="degree_program">Degree Program</option>
                                        <option value="sex">Sex</option>
                                        <option value="year_joined">Org Batch</option>
                                        <option value="committee">Committee</option>
                                        <option value="semester">Semester</option>
                                        <option value="academic_year">A.Y.</option>
                                    </select>
                                </div>
                                <div className="relative w-full md:w-auto max-w-xs">
                                    <ChartBar className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        className="border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none w-full md:w-auto"
                                        value={sortOrder}
                                        onChange={handleSortChange}
                                    >
                                        <option value="etc">Ascending</option>
                                        <option value="true">Descending</option>
                                    </select>
                                </div>
                            </div>



                        )}


                    </div>
                    {/* Only show filters/search in viewall */}
                    {tableView === "viewall" && (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="relative">
                                    <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        onChange={handleSelectChange}
                                        className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                        defaultValue="committee_role"
                                    >
                                        <option value="committee_role">Committee Role</option>
                                        <option value="member_status">Status</option>
                                        <option value="degree_program">Degree Program</option>
                                        <option value="sex">Sex</option>
                                        <option value="year_joined">Org Batch</option>
                                        <option value="committee">Committee</option>

                                    </select>
                                </div>
                                <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-48 rounded-r"
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Search
                                    </button>
                                </form>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <div className="relative">
                                    <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    <select
                                        onChange={handleSemChange}
                                        className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                        defaultValue=""
                                    >
                                        <option value="">All semester</option>
                                        <option value="1st Semester">1st semester</option>
                                        <option value="2nd Semester">2nd semester</option>
                                    </select>
                                </div>
                                <form onSubmit={handleAcadYearSubmit} className="flex w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search A.Y."
                                        value={acadYearInput}
                                        onChange={(e) => setAcadYearInput(e.target.value)}
                                        className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-40 rounded-l"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                                    >
                                        Search
                                    </button>
                                </form>

                            </div>
                        </div>
                    )}
                    {/* Table */}
                    <div>
                        {tableView === "viewall" ? (
                            <table className="text-sm border-collapse mx-auto w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Sex</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Degree Program</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Univ Batch</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Org Batch</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee Role</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">A.Y.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.length === 0 ? (
                                        <tr>
                                            <td colSpan={11} className="text-center py-4 text-gray-400">
                                                No members found.
                                            </td>
                                        </tr>
                                    ) : (
                                        members.map((member, idx) => (
                                            <tr key={member.id || idx}>
                                                <td className="px-3 py-2">{member.member_id}</td>
                                                <td className="px-3 py-2">{member.first_name + " " + member.last_name}</td>
                                                <td className="px-3 py-2">{member.sex}</td>
                                                <td className="px-3 py-2">{member.degree_program}</td>
                                                <td className="px-3 py-2">{member.batch}</td>
                                                <td className="px-3 py-2">{member.year_joined}</td>
                                                <td className="px-3 py-2">{member.committee}</td>
                                                <td className="px-3 py-2">{member.committee_role}</td>
                                                <td className="px-3 py-2">{member.member_status}</td>
                                                <td className="px-3 py-2">{member.semester}</td>
                                                <td className="px-3 py-2">{member.academic_year}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex gap-6">
                                <div className="bg-gray-50 rounded-lg shadow p-6 w-1/3">
                                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Inactive and Active Percentage Count</h2>
                                    {/* Search bar for "How many semesters from now?" without form and submit button */}
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="How many semesters from now?"
                                        value={pastSemesters}
                                        onChange={handlePastSemChange}
                                        className="border px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full rounded"
                                    />
                                    <p className="text-gray-700 mb-2">Total Members: {percentageMems.total_members}</p>
                                    <p className="text-gray-700 mb-2">
                                        Active: {percentageMems.active_count_percentage ? `${parseFloat(percentageMems.active_count_percentage).toFixed(0)}%` : "0%"}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        Inactive: {percentageMems.inactive_count_percentage ? `${parseFloat(percentageMems.inactive_count_percentage).toFixed(0)}%` : "0%"}
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg shadow p-6 w-2/3 overflow-x-auto">
                                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Search all alumni based on date </h2>

                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            setDateQuery(dateInput);
                                        }}
                                        className="flex mb-4"
                                    >
                                        <input
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            value={dateInput}
                                            onChange={e => setDateInput(e.target.value)}
                                            className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-48 rounded-l"
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                                        >
                                            Search
                                        </button>
                                    </form>
                                    <table className="text-sm border-collapse w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Academic year</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {alumni.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="text-center py-4 text-gray-400">
                                                        No members found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                alumni.map((alum, idx) => (
                                                    <tr key={alum.id || idx}>
                                                        <td className="px-6 py-2">{alum.member_id}</td>
                                                        <td className="px-6 py-2">{alum.first_name + " " + alum.last_name}</td>
                                                        <td className="px-6 py-2">{alum.semester}</td>
                                                        <td className="px-6 py-2">{alum.academic_year}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgMembers;