import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IResponse, IUser } from "../../helpers/types";
import { METHODS, useHttpMutation } from "../../helpers/useHttp";
import { useState } from "react";

export const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUser>()
    const [postSignup, error] = useHttpMutation<IResponse, IUser>(reset)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
                <p className="text-gray-400 text-center mt-2">
                    Join us and start your journey
                </p>
                <form className="mt-6" onSubmit={handleSubmit(data => postSignup("/signup", METHODS.POST, data))}>
                    {error && <p className="bg-red-400 p-2">{error}</p>}

                    {errors.name && <p className="text-red-400">{errors.name.message}</p>}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errors.surname && <p className="text-red-400">{errors.surname.message}</p>}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Surname
                        </label>
                        <input
                            {...register("surname", { required: "Surname is required" })}

                            type="text"
                            placeholder="Enter your surname"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errors.login && <p className="text-red-400">{errors.login.message}</p>}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Login
                        </label>
                        <input
                            {...register("login", {
                                required: "Login is required",
                                minLength: {
                                    value: 6,
                                    message: "Login must be at least 6 characters long"
                                }
                            })}

                            placeholder="Enter your login"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    <div className="mb-4 relative">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                                validate: {
                                    complexity: (value) =>
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
                                            value
                                        ) || "Password must include uppercase, lowercase, numbers, and symbols",
                                },
                            })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-2 right-3 flex items-center justify-center h-full focus:outline-none"
                        >
                            <img
                                src={showPassword ? "/images/view.png" : "/images/close-eye.png"}
                                alt={showPassword ? "Hide Password" : "Show Password"}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>

                    <button
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-gray-400 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link to='/' className="text-blue-500 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

