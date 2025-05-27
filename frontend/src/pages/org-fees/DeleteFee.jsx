import React from "react";
import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown, TabletSmartphone } from 'lucide-react';

const DeleteFee = () => {
    const { auth, setAuth } = useAuth();

    const org = auth?.user;
    const id = org.organization_id;
    console.log("Fees Organization ID:", id);

    const [members, setMembers] = useState([]);
    const [debtors, setDebtors] = useState([]);
    const [tableView, setTableView] = useState("viewall");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [totalFees, setTotalFees] = useState();;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [acadYearInput, setAcadYearInput] = useState("");
    const [acadYearQuery, setAcadYearQuery] = useState("");
    const [semester, setSemester] = useState("");
    const [dateQuery, setDateQuery] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [semesterDebt, setSemesterDebt] = useState("");
    const [acadYearDebtInput, setAcadYearDebtInput] = useState("");
    const [acadYearDebtQuery, setAcadYearDebtQuery] = useState("");
    const [delMemId, setDelMemId] = useState("");
    const [delOrgId, setDelOrgId] = useState("");
    const [delSemester, setDelSemester] = useState("");
    const [delAcadYear, setDelAcadYear] = useState("");
    const [delFeeId, setDelFeeId] = useState("");

    const getMemFees = async () => {
        try {
            const allMemFees = await api.get(
                `organization/getFees/?id=${id}&academic_year=${acadYearQuery}&semester=${semester}&payment_status=${selectedFilter}`
            )
            setMembers(Array.isArray(allMemFees.data.fees) ? allMemFees.data.fees : []);
            console.log("semester:", semester);
            console.log("Fetched Members:", allMemFees.data.fees);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
        getMemFees();
    }, [])

    useEffect(() => {
        const getOrgFees = async () => {
            try {
                console.log("Fetching total fees for organization ID:", id);
                const getAllFees = await api.get(
                    `organization/getTotalFees/?id=${id}&date=${dateQuery}`
                );
                console.log("Total Fees Response:", getAllFees.data);
                console.log("Total Fees Response: payments", getAllFees.data.payments.total_paid_fees);
                setTotalFees(getAllFees.data.payments);
            } catch (error) {
                console.error("Error fetching total fees:", error);
            }
        }

        getOrgFees();
    }, [id, dateQuery]);

    useEffect(() => {
        const getDebtMembers = async () => {
            try {
                const allDebtMemFees = await api.get(
                    `organization/getHighestDebtor/?id=${id}&semester=${semesterDebt}&academic_year=${acadYearDebtQuery}`
                )
                setDebtors(Array.isArray(allDebtMemFees.data.debtor) ? allDebtMemFees.data.debtor : []);
                console.log("Fetched Debt Members:", allDebtMemFees.data.debtor);
            } catch (error) {
                console.error("Error fetching debt members:", error);
            }
        };
        getDebtMembers();
    }, [semesterDebt, acadYearDebtQuery, id]);

    const handleSelectChange = (e) => setSelectedFilter(e.target.value);


    const handleSemChange = (e) => {
        setSemester(e.target.value);
    };

    const handleSemChangeDebt = (e) => {
        setSemesterDebt(e.target.value);
    }

    const handleAcadYearSubmit = (e) => {
        e.preventDefault();
        setAcadYearQuery(acadYearInput);
    };

    const handleAcadYearSubmitDebt = (e) => {
        e.preventDefault();
        setAcadYearDebtQuery(acadYearDebtInput);
    }

    const handleTableChange = (e) => {
        setTableView(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "fee_id") setDelFeeId(value);
    }

    const deleteFee = async (e) => {
        e.preventDefault();
        console.log("Deleting Fee ID:", delFeeId);
        await api.post(`/organization/deleteFee`, {
            fee_id: delFeeId,
        });
        getMemFees();
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="flex items-start justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">{org.organization_name} Fees</h1>
                        <p className="text-gray-700 text-center">
                            Delete Org Fees.
                        </p>
                    </div>
                    <form onSubmit={deleteFee} className="bg-blue-600 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-10">
                        <div className="grid grid-cols-1 gap-4 pt-5">
                            <input
                                type="number"
                                name="fee_id"
                                value={delFeeId}
                                onChange={handleChange}
                                placeholder="Fee ID"
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            {/* <input
                                type="number"
                                name="org_id"
                                value={delOrgId}
                                onChange={handleChange}
                                placeholder="Organization ID"
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <input
                                type="text"
                                name="semester"
                                value={delSemester}
                                onChange={handleChange}
                                placeholder="Semester"
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <input
                                type="text"
                                name="acad_year"
                                value={delAcadYear}
                                onChange={handleChange}
                                placeholder="Academic Year"
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            /> */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200 mt-2"
                            >
                                Delete Member
                            </button>
                        </div>
                    </form>

                    <div>
                        {tableView === "viewall" ? (
                            <table className="text-sm border-collapse mx-auto w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee ID</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Member ID</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Org ID</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee Amount</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Due Date</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Date Paid</th>
                                        <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Payment Status</th>
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
                                                <td className="px-3 py-2">{member.fee_id}</td>
                                                <td className="px-3 py-2">{member.member_id}</td>
                                                <td className="px-3 py-2">{member.organization_id}</td>
                                                <td className="px-3 py-2">{member.first_name + " " + member.last_name}</td>
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
                        ) : (
                            <div className="flex gap-6">
                                <div className="bg-gray-50 rounded-lg shadow p-6 w-1/3">
                                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Paid and Unpaid Fees</h2>
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
                                    <p className="text-gray-700 mb-2">
                                        Total Paid Fees: ₱{totalFees?.total_paid_fees != null ? totalFees.total_paid_fees : 0}
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        Total Unpaid Fees: ₱{totalFees?.total_unpaid_fees != null ? totalFees.total_unpaid_fees : 0}
                                    </p>

                                    {/* Search bar for "How many semesters from now?" without form and submit button */}
                                    {/* <input
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
                                    </p> */}
                                </div>
                                <div className="bg-gray-50 rounded-lg shadow p-6 w-2/3 overflow-x-auto">
                                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Members with highest debt</h2>
                                    <div className="flex flex-row items-center gap-2 w-full md:w-auto">
                                        <div className="relative flex flex-row items-center gap-2 w-full">
                                            <Menu className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <select
                                                onChange={handleSemChangeDebt}
                                                className="border rounded-l pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                                                defaultValue="1st Semester"
                                            >
                                                <option value="1st Semester">1st semester</option>
                                                <option value="2nd Semester">2nd semester</option>
                                            </select>
                                            <form onSubmit={handleAcadYearSubmitDebt} className="flex flex-row w-full md:w-auto">
                                                <input
                                                    type="text"
                                                    placeholder="Search A.Y."
                                                    value={acadYearDebtInput}
                                                    onChange={(e) => setAcadYearDebtInput(e.target.value)}
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
                                    {/* <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            setDateQuery(dateInput);
                                        }}
                                        className="flex mb-4"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search by date..."
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
                                    </form> */}
                                    <table className="text-sm border-collapse w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">User ID</th>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                                <th className="px-6 py-3 font-normal text-left whitespace-nowrap w-auto">Total Debt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {debtors.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="text-center py-4 text-gray-400">
                                                        No members found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                debtors.map((debtor, idx) => (
                                                    <tr key={debtor.id || idx}>
                                                        <td className="px-6 py-2">{debtor.member_id}</td>
                                                        <td className="px-6 py-2">{debtor.first_name + " " + debtor.last_name}</td>
                                                        <td className="px-6 py-2">{debtor.total_debt}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DeleteFee;