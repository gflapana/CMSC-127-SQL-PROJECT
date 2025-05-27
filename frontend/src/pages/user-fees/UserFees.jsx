import React from "react";
import UserNavBar from "../../components/UserNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown, TabletSmartphone } from 'lucide-react';

const UserFees = () => {

    const { auth, setAuth } = useAuth();

    const member = auth?.user;
    const id = member.member_id;
    console.log("Member ID:", id);
    console.log("Home Auth:", auth.user);

    const [myFees, setMyFees] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");

    useEffect(() => {
        const fetchMyFees = async () => {
            try {
                const getmyFees = await api.get(
                    `organization/getFees/?member_id=${id}&payment_status=${selectedFilter}`);
                setMyFees(getmyFees.data.fees);
                console.log("My Fees:", getmyFees.data.fees);
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        }

        fetchMyFees();
    }, [id, selectedFilter]);

    const handleSelectChange = (e) => setSelectedFilter(e.target.value);

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavBar />
            <div className="flex items-start justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">{member.first_name}'s Fees</h1>
                        <p className="text-gray-700 text-center">
                            Here you can view and manage your fee.
                        </p>
                    </div>
                    {/* Table View Selector and Sort */}
                    <div className="flex flex-row justify-between gap-4 mb-6">
                        {/* <div className="relative">
                            <ArrowDown className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                                onChange={handleTableChange}
                                className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                value={tableView}
                            >
                                <option value="viewall">View All</option>
                                <option value="statusreport">Status Report</option>
                            </select>
                        </div> */}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative">
                                <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select
                                    onChange={handleSelectChange}
                                    className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                    defaultValue=""
                                >
                                    <option value="">All Status</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Paid Late">Paid Late</option>
                                </select>
                            </div>
                            {/* <div className="relative">
                                <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <select
                                    onChange={handleSelectChange}
                                    className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                    defaultValue=""
                                >
                                    <option value="">All Status</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Paid Late">Paid Late</option>
                                </select>
                            </div> */}
                            {/* <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
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
                                </form> */}
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">

                            {/* <div className="relative">
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
                            </form> */}

                        </div>
                    </div>

                    <table className="text-sm border-collapse mx-auto w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Organization</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee ID</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee Amount</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Due Date</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Date Paid</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Payment Status</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">A.Y.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFees.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="text-center py-4 text-gray-400">
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                myFees.map((member, idx) => (
                                    <tr key={member.id || idx}>
                                        <td className="px-3 py-2">{member.fee_id}</td>
                                        <td className="px-3 py-2">{member.fee_id}</td>
                                        <td className="px-3 py-2">{member.fee_amount}</td>
                                        <td className="px-3 py-2">
                                            {member.due_date
                                                ? new Date(member.due_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : ""}
                                        </td>
                                        <td className="px-3 py-2">
                                            {member.date_paid
                                                ? new Date(member.date_paid).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : <span className="italic">null</span>
                                            }
                                        </td>
                                        <td className="px-3 py-2">{member.payment_status}</td>
                                        <td className="px-3 py-2">{member.semester}</td>
                                        <td className="px-3 py-2">{member.academic_year}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserFees;