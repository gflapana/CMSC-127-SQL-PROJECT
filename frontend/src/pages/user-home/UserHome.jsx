import React from "react";
import UserNavBar from "../../components/UserNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown, TabletSmartphone } from 'lucide-react';


const UserHome = () => {

    const { auth, setAuth } = useAuth();

    const member = auth?.user;
    const id = member.member_id;
    console.log("Member ID:", id);
    console.log("Home Auth:", auth.user);
    console.log(member)

    const [myOrgs, setMyOrgs] = useState([]);

    useEffect(() => {
        const fetchMyFees = async () => {
            try {
                const getOrgs = await api.get(
                    `member/getOrganizations/?id=${id}`);
                setMyOrgs(getOrgs.data.organizations);
                console.log("My Fees:", getOrgs.data.organizations);
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        }
        fetchMyFees();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavBar />
            <div className="flex items-start justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">Welcome back, {member.first_name}! </h1>
                        <p className="text-gray-700 text-center">
                            Here are the list of organizations you are a member of. You can view your fees, manage your profile, and more using the navigation bar above.
                        </p>
                    </div>
                    {/* Table View Selector and Sort */}
                    <div className="flex flex-row justify-between gap-4 mb-6">
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative">
                                {/* <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" /> */}
                                {/* <select
                                    onChange={handleSelectChange}
                                    className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                    defaultValue=""
                                >
                                    <option value="">All Status</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Paid Late">Paid Late</option>
                                </select> */}
                            </div>
                        </div>
                    </div>
                    <table className="text-sm border-collapse mx-auto w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Organization</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Org Type</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Date Established</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Org Batch</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee Role</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">A.Y.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrgs.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className="text-center py-4 text-gray-400">
                                            No members found.
                                        </td>
                                    </tr>
                                ) : (
                                    myOrgs.map((member, idx) => (
                                        <tr key={member.id || idx}>
                                            <td className="px-3 py-2">{member.organization_name}</td>
                                            <td className="px-3 py-2">{member.organization_type}</td>
                                            <td className="px-3 py-2">{member.date_established}</td>
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
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;