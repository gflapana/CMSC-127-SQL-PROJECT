import React from "react";
import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown, TabletSmartphone, Edit2 } from 'lucide-react';

const UpdateFee = () => {
    const { auth } = useAuth();

    const org = auth?.user;
    const id = org.organization_id;

    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [feeData, setFeeData] = useState({
        fee_id: "",
        fee_amount: 0,
        due_date: "",
        date_paid: "",
        semester: "",
        academic_year: "",
        id: "",
        member_id: "",
    })

    useEffect(() => {
        const getMemFees = async () => {
            try {
                const allMemFees = await api.get(
                    `organization/getFees/?id=${id}`
                )
                setMembers(Array.isArray(allMemFees.data.fees) ? allMemFees.data.fees : []);

            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getMemFees();
    }, [id])

    const handleEditClick = (member) => {
        setSelectedMember(member);
        setFeeData({
            fee_amount: member.fee_amount || 0,
            due_date: (member.due_date) ? member.due_date.substring(0,10) : "",
            date_paid: (member.date_paid) ? member.date_paid.substring(0,10): "",
            semester: member.semester || "",
            academic_year: member.academic_year || "",
            id: member.organization_id,
            member_id: member.member_id,
            fee_id: member.fee_id,
        });
    }


    const handleChange = (e) => {
        setFeeData({
            ...feeData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateFee = async (e) => {
        e.preventDefault();
        var finalFeeData = { ...feeData, id };
        finalFeeData.date_paid = (finalFeeData.date_paid == '') ? null : finalFeeData.date_paid;
        console.log(`Fee Data: ${finalFeeData}`);
        try {
            await api.put(`/organization/updateFee`, finalFeeData);
            setMembers((prev) =>
                prev.map((m) =>
                    m.fee_id === feeData.fee_id ? { ...m, ...feeData } : m
                )
            );
            setSelectedMember(null);
            setFeeData({
                fee_amount: 0,
                due_date: "",
                date_paid: "",
                semester: "",
                academic_year: "",
                id: "",
                member_id: "",
                fee_id: "",
            });
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    const handleCancel = () => {
        setSelectedMember(null);
        setFeeData({
            fee_amount: 0,
            due_date: "",
            date_paid: "",
            semester: "",
            academic_year: "",
            id: "",
            member_id: "",
            fee_id: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="flex items-start justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center">{org.organization_name} Fees</h1>
                        <p className="text-gray-700 text-center">
                            Here you can view and manage your organization's fee.
                        </p>
                    </div>
                    {selectedMember && (
                        <form onSubmit={handleUpdateFee} className="bg-blue-600 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-6">
                            <h2 className="text-white text-xl font-semibold mb-4">Edit Fees</h2>
                            <div className="grid grid-cols-1 gap-4">


                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        name="member_id"
                                        value={feeData.member_id}
                                        onChange={handleChange}
                                        placeholder="Member ID"
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        disabled
                                    />
                                    <input
                                        type="number"
                                        name="fee_amount"
                                        value={feeData.fee_amount}
                                        onChange={handleChange}
                                        placeholder="Fee Amount"
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="due_date"
                                    value={feeData.due_date.substring(0, 10)}
                                    onChange={handleChange}
                                    placeholder="Due Date (YYYY/MM/DD)"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="date_paid"
                                    value={(feeData.date_paid != null) ? feeData.date_paid.substring(0, 10) : ""}
                                    onChange={handleChange}
                                    placeholder="Date Paid"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="academic_year"
                                        value={feeData.academic_year}
                                        onChange={handleChange}
                                        placeholder="A.Y"
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                    <input
                                        type="text"
                                        name="semester"
                                        value={feeData.semester}
                                        onChange={handleChange}
                                        placeholder="Semester"
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />

                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200"
                                    >
                                        Update Member
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}




                    {/* Table */}
                    <div>

                        <table className="text-sm border-collapse mx-auto w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee ID</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Member ID</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Fee Amount</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Due Date</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Date Paid</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Payment Status</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">A.Y.</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Edit</th>
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
                                            <td className="px-3 py-2">
                                                <button
                                                    onClick={() => handleEditClick(member)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    aria-label={`Edit member ${member.first_name} ${member.last_name}`}
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                            </td>
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

export default UpdateFee;