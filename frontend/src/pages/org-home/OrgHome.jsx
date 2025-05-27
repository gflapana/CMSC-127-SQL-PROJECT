import React from "react";
import OrgNavBar from "../../components/OrgNavBar";
import { useState } from "react";
import api from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.jsx";
import { Edit2 } from 'lucide-react';


const OrgHome = () => {

    const { auth, setAuth } = useAuth();

    const organization = auth?.user;
    // const organization_id = organization?.organization_id;
    console.log("organization ID:", auth?.user.organization_id   );
    console.log("Home Auth:", auth?.user);

    const [isEditing, setIsEditing] = useState(false);
    const [organizationData, setOrganizationData] = useState({
        organization_id: organization.organization_id,
        date_established: organization.date_established,
        organization_name: organization.organization_name,
        organization_type: organization.organization_type,
        years_active: organization.years_active,
    })
    const [user, setUser] = useState(organizationData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrganizationData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleUpdateOrganization = async (e) => {
        e.preventDefault();
        try {
            console.log("new orgdaata:",  organizationData);
            await api.post(`/organization/editDetails`, organizationData);
            setUser(organizationData);
            setAuth({ user: organizationData, role: "organization" });
            localStorage.setItem('auth', JSON.stringify({ user: organizationData, role: "organization" }));
            handleCancel();
        } catch (error) {
            console.error("Error updating organization:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />

            <div className="max-w-7xl mx-auto mt-25 p-8">

                <div className="flex flex-col md:flex-row gap-8">

                    {isEditing && (
                        <form
                            onSubmit={handleUpdateOrganization}
                            className="bg-blue-600 p-6 rounded-lg shadow-lg flex-1"
                        >
                            <h2 className="text-white text-xl font-semibold mt-3 mb-4">Edit Organization Information</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    name="organization_name"
                                    value={organizationData.organization_name}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="organization_type"
                                    value={organizationData.organization_type}
                                    onChange={handleChange}
                                    placeholder="Middle Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="number"
                                    name="date_established"
                                    value={organizationData.date_established}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <input
                                    type="number"
                                    name="years_active"
                                    value={organizationData.years_active}
                                    onChange={handleChange}
                                    placeholder="Sex"
                                    className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />

                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors duration-200"
                                    >
                                        Update Organization Details
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
                        <div className="bg-white rounded-lg shadow p-6 text-center w-full">
                            <div className="mt-7 mb-4 flex justify-center">
                                <h1 className="text-3xl font-bold mb-4 text-blue-600 mr-3">{organization.organization_name}</h1>

                                {!isEditing && (
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            handleEditClick(member);
                                        }}
                                        className="text-blue-500 hover:text-blue-700 mb-5"
                                        aria-label={`Edit member ${user?.organization_name}`}
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-700 mb-10">
                                Welcome to your organization's dashboard! Use the navigation bar above to manage fees, view members, and more.
                            </p>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mx-auto">
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Organization ID:</p>
                                    <p className="text-gray-800">{user?.organization_id || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Organization Type:</p>
                                    <p className="text-gray-800">{user?.organization_type || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Date Established:</p>
                                    <p className="text-gray-800">{user?.date_established || "N/A"}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg shadow">
                                    <p className="text-gray-600 font-semibold">Years Active:</p>
                                    <p className="text-gray-800">{user?.years_active || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OrgHome;




