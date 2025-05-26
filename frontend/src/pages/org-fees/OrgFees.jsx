import React from "react";
import OrgNavBar from "../../components/OrgNavBar";
import useAuth from "../../hooks/useAuth.jsx";

const OrgFees = () => {
    const { auth, setAuth } = useAuth();

    const id = auth?.user;
    console.log("Fees Organization ID:", id);

    return (
        <div className="min-h-screen bg-gray-100">
            <OrgNavBar />
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow text-center">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">Organization Fees</h1>
                <p className="text-gray-700">
                    Here you can view and manage your organization's fees.
                </p>
            </div>
        </div>
    );
};

export default OrgFees;