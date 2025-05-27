import { HandMetal } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const MemberSignUp = () => {
    const [inputs, setInputs] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        degree: "",
        sex: "",
        batch: "",
        username: "",
        password: ""
    })

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        degree: "",
        sex: "",
        batch: "",
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setForm({ ...inputs });
        console.log("Submitted form:", inputs);


        try {
            const orgSignIn = await api.post(`auth/signUpAsMember`, {

            })

        } catch (error) {
            console.error("Sign up failed");
            alert("Sign up failed: Username already exists");
            console.error("Error during organization sign up:", error);
        }

    };

    // signUpAsMember

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-4 left-4 text-blue-500 hover:underline font-semibold hover: cursor-pointer"
                    onClick={() => navigate('/log-in', { replace: true })}
                    type="button"
                >
                    &larr; Back
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">Create User Account</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={inputs.firstName}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name (optional)"
                        value={inputs.middleName}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={inputs.lastName}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="degree"
                        placeholder="Degree Program"
                        value={inputs.degree}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <select
                        name="sex"
                        value={inputs.sex}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text"
                        name="batch"
                        placeholder="University Batch"
                        value={inputs.batch}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={inputs.username}
                        onChange={handleInputChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
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

export default MemberSignUp;