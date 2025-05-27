import UserNavBar from "../../components/UserNavBar";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.jsx";
import { Edit2 } from 'lucide-react';


const UserProfile = () => {
    const { auth, setAuth } = useAuth();

    const member = auth?.user;
    const member_id = member?.member_id;
    console.log("Member ID:", member_id);
    console.log("Home Auth:", auth?.user);

    const [isEditing, setIsEditing] = useState(false);
    const [memberData, setMemberData] = useState({
        member_id: member_id,
        first_name: member.first_name,
        middle_name: member.middle_name || "",
        last_name: member.last_name,
        sex: member.sex,
        degree_program: member.degree_program,
        batch: member.batch,
    })
    const [user, setUser] = useState(member);

    const handleEditClick = (member) => {
        setMemberData({
            member_id: member_id,
            first_name: member.first_name,
            middle_name: member.middle_name || "",
            last_name: member.last_name,
            sex: member.sex,
            degree_program: member.degree_program,
            batch: member.batch,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleUpdateMember = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/member/editDetails`, memberData);
            setUser(memberData)
            setAuth({ user: memberData, role: "member" });
            localStorage.setItem('auth', JSON.stringify({ user: memberData, role: "member" }));
            handleCancel();
        } catch (error) {
            console.error("Error updating member:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavBar />
            <div className="max-w-7xl mx-auto mt-25 p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {isEditing && (
                        <form
                            onSubmit={handleUpdateMember}
                            className="bg-blue-600 p-6 rounded-lg shadow-lg max-w-md flex-1"
                        >
                            <h2 className="text-white text-xl font-semibold mb-4">Edit Member Information</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={memberData.first_name}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={memberData.middle_name}
                                    onChange={handleChange}
                                    placeholder="Middle Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    value={memberData.last_name}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="sex"
                                    value={memberData.sex}
                                    onChange={handleChange}
                                    placeholder="Sex"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="degree_program"
                                    value={memberData.degree_program}
                                    onChange={handleChange}
                                    placeholder="Degree Program"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="number"
                                    name="batch"
                                    value={memberData.batch}
                                    onChange={handleChange}
                                    placeholder="University Batch"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200"
                                    >
                                        Update Profile
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
                    <div className="flex-1 flex justify-center">
                        <div className="bg-white rounded-lg shadow p-6 text-center w-full max-w-md">
                            {!isEditing && (
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        handleEditClick(member);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 mb-6"
                                    aria-label={`Edit member ${user?.first_name} ${user?.last_name}`}
                                >
                                    <Edit2 className="w-5 h-5" />
                                </button>
                            )}
                            <p className="text-gray-700 mb-6">Profile</p>
                            <h1 className="text-3xl font-bold mb-4 text-blue-600 mb-10">
                                {user?.first_name} {user?.middle_name} {user?.last_name}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">user ID:</p>
                                    <p className="text-gray-800">{user?.member_id || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Sex:</p>
                                    <p className="text-gray-800">{user?.sex || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Degree Program:</p>
                                    <p className="text-gray-800">{user?.degree_program || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Batch:</p>
                                    <p className="text-gray-800">{user?.batch || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;