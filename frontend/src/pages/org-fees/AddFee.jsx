import React from "react";
import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown, TabletSmartphone } from 'lucide-react';

const AddFee = () => {
    const { auth } = useAuth();
    const [eligibleMembers, setEligibleMembers] = useState([]);
    const [feeData, setFeeData] = useState({
        fee_amount: "",
        due_date: "",
        date_paid: "",
        member_id: '',
        academic_year: '',
        semester: ''
    });

    const org = auth?.user;
    const id = org.organization_id;

    useEffect(() => {

        const getAllEligibleMembers = async () => {
            try {
                const allEligibleMembers = await api.get(`/organization/findEligibleMembers?id=${id}`);
                setEligibleMembers(Array.isArray(allEligibleMembers.data.members) ? allEligibleMembers.data.members : []);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getAllEligibleMembers();
    }, [eligibleMembers])

    const handleChange = (e) => {
        setFeeData({
            ...feeData,
            [e.target.name]: e.target.value
        });
    };

    const addFee = async () => {

        var finalFeeData = { ...feeData, id };
        finalFeeData.date_paid = (finalFeeData.date_paid == '') ? null : finalFeeData.date_paid;
        console.log(`Member Data: ${finalFeeData}`);
        await api.post(`/organization/addFee`, finalFeeData)
        setMemberData({
            fee_amount: "",
            due_date: "",
            date_paid: "",
            member_id: '',
            academic_year: '',
            semester: ''
        });
    }

    return (
        <div className="min-h-screen bg-gray-100" >
            <OrgNavBar />
            < div className="flex items-start justify-center py-12" >
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl" >
                    {/* Card Header */}
                    < div className="mb-6" >
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center" > {org.organization_name} Members </h1>
                        < p className="text-gray-700 text-center" >
                            Here you can add fee to your organization.
                        </p>
                    </div>
                    <div className="m-7">

                    </div>
                    <form onSubmit={addFee} className="bg-blue-600 p-6 rounded-lg shadow-lg max-w-md mx-auto relative">

                        <div className="grid grid-cols-1 gap-4">


                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    name="member_id"
                                    value={feeData.member_id}
                                    onChange={handleChange}
                                    placeholder="Member ID"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                                value={feeData.due_date}
                                onChange={handleChange}
                                placeholder="Due Date (YYYY/MM/DD)"
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <input
                                type="text"
                                name="date_paid"
                                value={feeData.date_paid}
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


                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200 mt-2"
                            >
                                Add Fee
                            </button>
                        </div>
                    </form>
                    <div className="m-15">

                    </div>
                    {/* Table */}
                    <div className="w-full">
                        <table className="text-sm border-collapse mx-auto w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Sex</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Degree Program</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Univ Batch</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Year Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eligibleMembers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-gray-400">
                                            No members found.
                                        </td>
                                    </tr>
                                ) : (
                                    eligibleMembers.map((member, idx) => (
                                        <tr key={member.id || idx}>
                                            <td className="px-3 py-2">{member.member_id}</td>
                                            <td className="px-3 py-2">{member.first_name + " " + member.last_name}</td>
                                            <td className="px-3 py-2">{member.sex}</td>
                                            <td className="px-3 py-2">{member.degree_program}</td>
                                            <td className="px-3 py-2">{member.batch}</td>
                                            <td className="px-3 py-2">{member.year_joined}</td>
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

export default AddFee;