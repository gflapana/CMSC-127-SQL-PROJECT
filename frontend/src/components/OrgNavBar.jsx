import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const OrgNavBar = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const handleSelect = (action) => {
        setIsOpen(false); // Close dropdown
        switch (action) {
            case 'add':
                navigate('/add-member');
                break;
            case 'delete':
                navigate('/delete-member');
                break;
            case 'view':
                navigate('/org-members');
                break;
            case 'edit':
                navigate('/edit-member');
                break;
            default:
                break;
        }
    };

    const handleSelect2 = (action) => {
        setIsOpen2(false); // Close dropdown
        switch (action) {
            case 'add':
                navigate('/add-fee');
                break;
            case 'delete':
                navigate('/delete-fee');
                break;
            case 'view':
                navigate('/org-fees');
                break;
            case 'edit':
                navigate('/update-fee');
                break;
            default:
                break;
        }
    };

    const handleSignOut = () => {
        setAuth({});
        localStorage.removeItem("auth");
        navigate("/log-in", { replace: true });
    };

    return (
        <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-end shadow-md">
            <div className="flex items-center gap-4 md:gap-6">
                <button
                    className="px-5 py-1 hover:bg-blue-500 rounded transition-colors duration-200"
                    onClick={() => navigate("/org-home")}
                >
                    Home
                </button>
                <div className="relative">
                    <button
                        className="px-2 py-1 hover:bg-blue-500 rounded transition-colors duration-200 flex items-center gap-1"
                        onClick={() => setIsOpen2(!isOpen2)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                    >
                        Fee
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen2 ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen2 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect2('add')}
                            >
                                Add Fee
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect2('delete')}
                            >
                                Delete Fee
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect2('view')}
                            >
                                View Fees
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect2('edit')}
                            >
                                Edit Fee
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="px-2 py-1 hover:bg-blue-500 rounded transition-colors duration-200 flex items-center gap-1"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                    >
                        Members
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect('add')}
                            >
                                Add Member
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect('delete')}
                            >
                                Delete Member
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect('view')}
                            >
                                View Member
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                onClick={() => handleSelect('edit')}
                            >
                                Edit Member
                            </button>
                        </div>
                    )}
                </div>
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

export default OrgNavBar;