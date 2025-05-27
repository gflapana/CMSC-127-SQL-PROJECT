import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const OrgSignUp = () => {
    // Local state for input fields (not the final form state)
    const [inputs, setInputs] = useState({
        orgName: "",
        orgType: "",
        dateEstablished: "",
        username: "",
        password: ""
    });

    const [form, setForm] = useState({
        orgName: "",
        orgType: "",
        dateEstablished: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // Only set the form state on submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setForm({ ...inputs });
        console.log("Submitted form:", inputs);

        try {
            const orgSignIn = await api.post(`auth/signUpAsOrganization`, {
                organization_name: inputs.orgName,
                organization_type: inputs.orgType,
                date_established: inputs.dateEstablished,
                username: inputs.username,
                password: inputs.password
            });
            if (orgSignIn.data.status === "success") {
                navigate('/log-in', { replace: true });
            }
            else {
                console.error("Sign up failed:", orgSignIn.data.message);
                alert("Sign up failed: " + orgSignIn.data.message);
            }
            console.log("Organization Sign Up Response:", orgSignIn.data);
        } catch (error) {
            console.error("Sign up failed");
            alert("Sign up failed: Username already exists");
            console.error("Error during organization sign up:", error);
        }

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
                        value={inputs.orgName}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="orgType"
                        placeholder="Organization Type"
                        value={inputs.orgType}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="number"
                        name="dateEstablished"
                        placeholder="Year Established"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={inputs.dateEstablished}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Organization Username (unique)"
                        value={inputs.username}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Organization Password"
                        value={inputs.password}
                        onChange={handleInputChange}
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