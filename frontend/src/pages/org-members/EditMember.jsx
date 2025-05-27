import { useState, useEffect } from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";
import api from "../../api/axios.js";
import { Edit2 } from 'lucide-react';

const EditMember = () => {
    const { auth } = useAuth();
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberData, setMemberData] = useState({
        member_id: null,
        academic_year: "",
        semester: "",
        committee: "",
        committee_role: "",
        member_status: "",
        year_joined: null
    });

    const org = auth?.user;
    const id = org.organization_id;

    useEffect(() => {
        const getAllMembers = async () => {
            try {
                const allMembers = await api.get(`/organization/getMembers?id=${id}`);
                setMembers(Array.isArray(allMembers.data.members) ? allMembers.data.members : []);
                console.log("Members:", allMembers.data.members);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getAllMembers();
    }, [id]);

    const handleEditClick = (member) => {
        setSelectedMember(member);
        setMemberData({
            member_id: member.member_id,
            academic_year: member.academic_year,
            semester: member.semester,
            committee: member.committee || "",
            committee_role: member.committee_role || "",
            member_status: member.member_status || "",
            year_joined: member.year_joined || ""
        });
    };

    const handleChange = (e) => {
        setMemberData({
            ...memberData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateMember = async (e) => {
        e.preventDefault();
        const finalMemberData = { ...memberData, id };
        console.log(`Member Data: ${finalMemberData}`);
        try {
            await api.post(`/organization/updateMemberToOrganization`, finalMemberData);
            setMembers((prev) =>
                prev.map((m) =>
                    m.member_id === memberData.member_id ? { ...m, ...memberData } : m
                )
            );
            setSelectedMember(null);
            setMemberData({
                member_id: null,
                academic_year: "",
                semester: "",
                committee: "",
                committee_role: "",
                member_status: "",
                year_joined: null
            });
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    const handleCancel = () => {
        setSelectedMember(null);
        setMemberData({
            member_id: null,
            academic_year: "",
            semester: "",
            committee: "",
            committee_role: "",
            member_status: "",
            year_joined: null
        });
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
                            Here you can view and edit your organization's members.
                        </p>
                    </div>

                    {/* Edit Form */}
                    {selectedMember && (
                        <form onSubmit={handleUpdateMember} className="bg-blue-600 p-6 rounded-lg shadow-lg max-w-md mx-auto mb-6">
                            <h2 className="text-white text-xl font-semibold mb-4">Edit Member Information</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="number"
                                    name="member_id"
                                    value={memberData.member_id}
                                    onChange={handleChange}
                                    placeholder="Member ID"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    disabled
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="academic_year"
                                        value={memberData.academic_year}
                                        onChange={handleChange}
                                        placeholder="A.Y."
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        disabled
                                    />
                                    <input
                                        type="text"
                                        name="semester"
                                        value={memberData.semester}
                                        onChange={handleChange}
                                        placeholder="Semester"
                                        className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        disabled
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="committee"
                                    value={memberData.committee}
                                    onChange={handleChange}
                                    placeholder="Committee"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="committee_role"
                                    value={memberData.committee_role}
                                    onChange={handleChange}
                                    placeholder="Role"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="member_status"
                                    value={memberData.member_status}
                                    onChange={handleChange}
                                    placeholder="Status"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="number"
                                    name="year_joined"
                                    value={memberData.year_joined}
                                    onChange={handleChange}
                                    placeholder="Year Joined"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
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
                    <div className="overflow-x-auto">
                        <table className="text-sm border-collapse mx-auto w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">ID</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Name</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Org Batch</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Committee Role</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Status</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Semester</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">A.Y.</th>
                                    <th className="px-3 py-3 font-normal text-left whitespace-nowrap w-auto">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="text-center py-4 text-gray-400">
                                            No members found.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member, idx) => (
                                        <tr key={member.id || idx}>
                                            <td className="px-3 py-2">{member.member_id}</td>
                                            <td className="px-3 py-2">{member.first_name + " " + member.last_name}</td>
                                            <td className="px-3 py-2">{member.year_joined}</td>
                                            <td className="px-3 py-2">{member.committee}</td>
                                            <td className="px-3 py-2">{member.committee_role}</td>
                                            <td className="px-3 py-2">{member.member_status}</td>
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

export default EditMember;