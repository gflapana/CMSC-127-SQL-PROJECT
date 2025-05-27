import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { ChartBar, Menu, ArrowDown } from 'lucide-react';

const AddMember = () => {
    const { auth } = useAuth();
    const [eligibleMembers, setEligibleMembers] = useState([]);

    useEffect(() => {
        const getAllEligibleMembers = async () => {
            try {
                const allEligibleMembers = await api.get(`/organization//findEligibleMembers`);
                setEligibleMembers(Array.isArray(allEligibleMembers.data.members) ? allEligibleMembersFiltered.data.members : []);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getAllEligibleMembers();
    }, [eligibleMembers])

    useEffect(() => {
        const addMember = async () => {
            await api.get(``)
        }
    })

    return (
        <div className="min-h-screen bg-gray-100" >
            <OrgNavBar />
            < div className="flex items-start justify-center py-12" >
                <div className="bg-white p-8 rounded-lg shadow inline-block mx-auto w-full max-w-6xl" >
                    {/* Card Header */}
                    < div className="mb-6" >
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 text-center" > {org.organization_name} Members </h1>
                        < p className="text-gray-700 text-center" >
                            Here you can add members to your organization.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="" >
                        <table className="text-sm border-collapse mx-auto" >
                            <thead className="bg-gray-100" >
                                <tr>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > ID </th>
                                    < th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > Name </th>
                                    < th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > Sex </th>
                                    < th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > Degree Program </th>
                                    < th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > Univ Batch </th>
                                    < th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto" > </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    members.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4 text-gray-400" >
                                                No members found.
                                            </td>
                                        </tr>
                                    ) : (
                                        members.map((member, idx) => (
                                            <tr key={member.id || idx} >
                                                <td className="px-3 py-2" > {member.member_id} </td>
                                                < td className="px-3 py-2" > {member.first_name + " " + member.last_name} </td>
                                                < td className="px-3 py-2" > {member.sex} </td>
                                                < td className="px-3 py-2" > {member.degree_program} </td>
                                                < td className="px-3 py-2" > {member.batch} </td>
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




}




export default AddMember;