import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const UserNavBar = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const handleSignOut = () => {
        setAuth({});
        localStorage.removeItem("auth");
        navigate("/", { replace: true });
    };
    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-end shadow-md">
            <div className="flex items-center gap-4 md:gap-6">
                <button
                    className="px-2 py-1 hover:bg-blue-500 rounded transition-colors duration-200"
                    onClick={() => navigate("/user-home")}
                >
                    Home
                </button>
                <button
                    className="px-2 py-1 hover:bg-blue-500 rounded transition-colors duration-200"
                    onClick={() => navigate("/user-fees")}
                >
                    Fees
                </button>
                <button
                    className="px-2 py-1 hover:bg-blue-500 rounded transition-colors duration-200"
                    onClick={() => navigate("/user-profile")}
                >
                    Profile
                </button>
                <button
                    className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition-colors duration-200"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default UserNavBar;