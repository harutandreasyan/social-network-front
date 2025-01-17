import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IAuth, IResponse } from "../../helpers/types";
import { METHODS, useHttpMutation } from "../../helpers/useHttp";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>()
  const [postLogin, error] = useHttpMutation<IResponse, IAuth>(() => navigate('/profile'))
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleLogin: SubmitHandler<IAuth> = data => {
    postLogin("/login", METHODS.POST, data)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mt-2">Login to continue</p>
        <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
          {error && <p className="bg-red-400">{error}</p>}

          {errors.login && <p className="text-red-400">{errors.login.message}</p>}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Login
            </label>
            <input
              id="email"
              {...register("login", { required: 'Login is required' })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: 'Password is required' })}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-gray-400 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

