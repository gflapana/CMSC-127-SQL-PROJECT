import React from "react";
import UserNavBar from "../../components/UserNavBar";
import useAuth from "../../hooks/useAuth.jsx";

const UserProfile = () => {
    const { auth, setAuth } = useAuth();

    const member = auth?.user;
    const id = member?.member_id; // Using member_id instead of id to match the image
    console.log("Member ID:", id);
    console.log("Home Auth:", auth?.user);

    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavBar />

            <div className="max-w-7xl mx-auto mt-5 p-8 bg-white rounded-lg shadow text-center">
                <p className="text-gray-700 mb-6">Profile</p>

                <h1 className="text-3xl font-bold mb-4 text-blue-600 mb-10">
                    {member?.first_name} {member?.middle_name} {member?.last_name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <p className="text-gray-600 font-semibold">Member ID:</p>
                        <p className="text-gray-800">{member?.member_id || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <p className="text-gray-600 font-semibold">Sex:</p>
                        <p className="text-gray-800">{member?.sex || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <p className="text-gray-600 font-semibold">Degree Program:</p>
                        <p className="text-gray-800">{member?.degree_program || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <p className="text-gray-600 font-semibold">Batch:</p>
                        <p className="text-gray-800">{member?.batch || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;