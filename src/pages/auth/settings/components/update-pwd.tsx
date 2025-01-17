import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IResponse } from "../../../../helpers/types";
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp";

interface IUpdatePassword {
    old: string
    newpwd: string
}

export const UpdatePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IUpdatePassword>()
    const [updatePassword, error] = useHttpMutation<IResponse, IUpdatePassword>(reset)

    const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)

    const handleNewPassword: SubmitHandler<IUpdatePassword> = (data) => {
        updatePassword("/update/password", METHODS.PATCH, data)
    }

    const oldPassword = watch("old")
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
            <h2 className="text-xl font-bold text-white mb-4">Update Password</h2>
            <form onSubmit={handleSubmit(handleNewPassword)}>
                {error && <p className="bg-red-400">{error}</p>}

                {errors.old && <p className="text-red-400">{errors.old.message}</p>}
                <div className="mb-4 relative">
                    <label className="block text-gray-300 mb-1">Old Password</label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        {...register("old", { required: "Old password is required" })}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute inset-y-11 right-3 flex items-center focus:outline-none"
                    >
                        <img
                            src={showOldPassword ? "/images/view.png" : "/images/close-eye.png"}
                            alt={showOldPassword ? "Hide Password" : "Show Password"}
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                {errors.newpwd && <p className="text-red-400">{errors.newpwd.message}</p>}
                <div className="mb-4 relative">
                    <label className="block text-gray-300 mb-1">New Password</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        {...register("newpwd", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long",
                            },
                            validate: {
                                complexity: (value) =>
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
                                        value
                                    ) || "Password must include uppercase, lowercase, numbers, and symbols",
                                difference: (value) =>
                                    value !== oldPassword || "New password must be different from the old password",
                            },
                        })}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-11 right-3 flex items-center focus:outline-none"
                    >
                        <img
                            src={showNewPassword ? "/images/view.png" : "/images/close-eye.png"}
                            alt={showNewPassword ? "Hide Password" : "Show Password"}
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white rounded"
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}
