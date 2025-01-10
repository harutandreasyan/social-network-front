import { useForm, SubmitHandler } from "react-hook-form";
import { IResponse } from "../../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";
import { useState } from "react";

interface IUpdateLogin {
    password: string
    login: string
}

export const UpdateLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IUpdateLogin>()
    const [updateLogin, error] = useHttpMutation<IResponse, IUpdateLogin>(reset)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleNewLogin: SubmitHandler<IUpdateLogin> = data => {
        updateLogin("/update/login", METHODS.PATCH, data)
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-bold text-white mb-4">Update Login</h2>
            <form onSubmit={handleSubmit(handleNewLogin)}>
                {error && <p className="bg-red-400">{error}</p>}

                {errors.login && <p className="text-red-400">{errors.login.message}</p>}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">New Login</label>
                    <input
                        {...register("login", { required: "New login is required" })}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    />
                </div>

                {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                <div className="mb-4 relative">
                    <label className="block text-gray-300 mb-1">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-11 right-3 flex items-center focus:outline-none"
                    >
                        <img
                            src={showPassword ? "/images/close-eye.png" : "/images/view.png"}
                            alt={showPassword ? "Hide Password" : "Show Password"}
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
                >
                    Update Login
                </button>
            </form>
        </div>
    )
}
