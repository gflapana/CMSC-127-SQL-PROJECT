import React, { useState } from "react";
import { Eye, EyeOff as EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={`h-screen w-screen flex items-center justify-center ${toggle ? "bg-blue-900" : "bg-gray-100"}`}>
            <div className={`relative p-8 rounded-lg shadow-lg w-full max-w-sm transition-colors duration-300 ${toggle ? "bg-blue-500 text-white" : "bg-white"}`}>
                <span className={`absolute top-4 left-4 font-semibold uppercase tracking-wide text-sm transition-colors duration-300 ${toggle ? "text-white" : "text-blue-500"}`}>
                    {toggle ? "Organization" : "Member"}
                </span>
                <button
                    className={`absolute top-4 right-4 w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 hover:cursor-pointer ${toggle ? 'bg-white' : 'bg-gray-200'}`}
                    onClick={() => setToggle((prev) => !prev)}
                    type="button"
                >
                    <span
                        className={`bg-blue-500 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${toggle ? 'translate-x-6' : ''}`}
                    />
                </button>
                <h2 className={`text-2xl font-bold my-6 text-center ${toggle ? "text-white" : "text-blue-500"}`}>
                    Welcome Back!
                </h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder={toggle ? "Organization Username" : "Username"}
                        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 w-full ${toggle ? "focus:ring-white bg-blue-400 text-white placeholder-white border-blue-300" : "focus:ring-blue-400 text-black"}`}
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 w-full pr-10 ${toggle ? "focus:ring-white bg-blue-400 text-white placeholder-white border-blue-300" : "focus:ring-blue-400 text-black"}`}
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
                        className={`py-2 rounded transition cursor-pointer ${toggle ? "bg-white text-blue-500 hover:bg-blue-100" : "bg-blue-500 text-white hover:bg-blue-600"}`}
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
                            className={`${toggle ? "text-white" : "text-blue-500"} underline hover: cursor-pointer`}
                        >
                            Sign Up
                        </button>
                        {/* <a href="/sign-up" className={`${toggle ? "text-black" : "text-blue-500"} underline`} >Sign Up</a> */}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;