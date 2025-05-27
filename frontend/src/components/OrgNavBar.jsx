import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const OrgNavBar = () => {
    const navigate = useNavigate();

    const { auth, setAuth } = useAuth();

    const id = auth?.user;
    console.log("Nav Bar Organization ID:", id);

    const handleSignOut = () => {
        setAuth({});
        localStorage.removeItem("auth");
        navigate("/log-in", { replace: true });
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-end shadow">
            <div className="flex gap-6">
                <button
                    className="hover:underline hover: cursor-pointer"
                    onClick={() => navigate("/org-home")}
                >
                    Home
                </button>
                <button
                    className="hover:underline hover: cursor-pointer"
                    onClick={() => navigate("/org-fees")}
                >
                    Fees
                </button>
                <button
                    className="hover:underline hover: cursor-pointer"
                    onClick={() => navigate("/org-members")}
                >
                    Members
                </button>
                <button
                    className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition hover: cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>

        </nav>
    );
};

export default OrgNavBar;