import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Unauthorized</h2>
                <p className="mb-6 text-gray-700">You do not have access to this page.</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition hover: cursor-pointer"
                    onClick={() => navigate('/log-in')}
                >
                    Go to Log In
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;