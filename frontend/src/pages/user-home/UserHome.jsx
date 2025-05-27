import React from "react";
import UserNavBar from "../../components/UserNavBar";
import useAuth from "../../hooks/useAuth.jsx";

const UserHome = () => {

    const { auth, setAuth } = useAuth();

    const member = auth?.user;
    const id = member.id;
    console.log("Member ID:", id);
    console.log("Home Auth:", auth.user);
    console.log(member)


    return (
        <div className="min-h-screen bg-gray-100">
            <UserNavBar />
            <div className="max-w-7xl mx-auto mt-12 p-8 bg-white rounded-lg shadow text-center">
                <h1 className="text-3xl font-bold mb-4 text-blue-600">{member.member_name}</h1>
                <p className="text-gray-700">
                    Welcome to your organization's dashboard! Use the navigation bar above to manage fees, view members, and more.
                </p>
            </div>
        </div>
    );
};

export default UserHome;