import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrgSignUp = () => {
    const [form, setForm] = useState({
        orgName: "",
        orgType: "",
        dateEstablished: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign up logic here
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-4 left-4 text-blue-500 hover:underline font-semibold hover:cursor-pointer"
                    onClick={() => navigate('/log-in', { replace: true })}
                    type="button"
                >
                    &larr; Back
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Create Organization Account</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="orgName"
                        placeholder="Organization Name"
                        value={form.orgName}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="orgType"
                        placeholder="Organization Type"
                        value={form.orgType}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="date"
                        name="dateEstablished"
                        placeholder="Date Established"
                        value={form.dateEstablished}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Organization Username (unique)"
                        value={form.username}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Organization Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="text-blue-500 underline hover:cursor-pointer"
                        onClick={() => navigate('/log-in')}
                    >
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default OrgSignUp;