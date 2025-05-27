import React, { useState } from "react";
import { Eye, EyeOff as EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import useAuth from "../../hooks/useAuth.jsx";

const LogIn = () => {
    const { setAuth } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = toggle ? "organization" : "member";
        try {
            const response = await api.post('/auth/login', {
                username: username,
                password: password,
                type: role
            });
            if (response.data && response.data.user) {
                if (role === "organization") {
                    console.log(response.data.user, "logged in successfully");
                    setAuth({ user: response.data.user, role: role });
                    localStorage.setItem('auth', JSON.stringify({ user: response.data.user.organization_id, role: role }));
                }


                setSuccess(true);
                setError("");

                setTimeout(() => navigate(role === "organization" ? '/org-home' : '/user-home', { replace: true }), 1500);
            } else {
                setError("Invalid credentials.");
                setSuccess(false);
            }
        } catch (error) {
            setError("Login failed. Please try again.");
            setSuccess(false);
            console.error("Login failed:", error);
        }
    };

    return (
        <div className={`h-screen w-screen flex items-center justify-center ${toggle ? "bg-blue-900" : "bg-[#333446]"}`}>
            <div className={`relative p-8 rounded-lg shadow-lg w-full max-w-sm transition-colors duration-300 ${toggle ? "bg-blue-500 text-white" : "bg-[#B8CFCE]"}`}>
                <span className={`absolute top-4 left-4 font-semibold uppercase tracking-wide text-sm transition-colors duration-300 ${toggle ? "text-white" : "text-black"}`}>
                    {toggle ? "Organization" : "Member"}
                </span>
                <button
                    className={`absolute top-4 right-4 w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 hover:cursor-pointer ${toggle ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setToggle((prev) => !prev)}
                    type="button"
                >
                    <span
                        className={`bg-[#7F8CAA] w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${toggle ? 'translate-x-6' : ''}`}
                    />
                </button>
                <h2 className={`text-2xl font-bold my-6 text-center ${toggle ? "text-white" : "text-black"}`}>
                    Welcome Back!
                </h2>
                {success && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center border border-green-300">
                        Login successful!
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-center border border-red-300">
                        {error}
                    </div>
                )}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={toggle ? "Organization Username" : "Username"}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 w-full ${toggle ? "focus:ring-white bg-blue-400 text-white placeholder-white border-blue-300" : "placeholder-black text-black bg-[#EAEFEF] border-gray-300 focus:ring-neutral-200"}`}
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 w-full pr-10 ${toggle ? "focus:ring-white bg-blue-400 text-white placeholder-white border-blue-300" : "focus:ring-neutral-200 bg-[#EAEFEF] border-gray-300 placeholder-black text-black"}`}
                            required
                        />
                        <button
                            type="button"
                            className={`absolute inset-y-0 right-0 flex items-center px-3 ${toggle ? "text-white" : "text-gray-500"} hover:cursor-pointer`}
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`py-2 rounded transition cursor-pointer ${toggle ? "bg-white text-blue-500 hover:bg-blue-100" : "bg-[#7F8CAA] text-white hover:bg-[#6C7A8A]"} font-semibold`}
                    >
                        Log In
                    </button>
                    <p className={`text-sm text-center ${toggle ? "text-white" : "text-gray-600"}`}>
                        {toggle ? "Create an Organization? " : "Don't have an account yet? "}
                        <button
                            onClick={() => {
                                toggle
                                    ? navigate('/org-sign-up', { replace: true })
                                    : navigate('/member-sign-up', { replace: true });
                            }}
                            className={`${toggle ? "text-white" : "text-[#7F8CAA]"} underline hover: cursor-pointer`}
                        >
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;