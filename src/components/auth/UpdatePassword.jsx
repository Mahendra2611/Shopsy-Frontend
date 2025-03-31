import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import useAPI from "../../hooks/useAPI"
import toast from "react-hot-toast"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { callApi } = useAPI()

  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    try {
      const response = await callApi({
        url: "api/owner/reset-password",
        method: "POST",
        data: { password, confirmPassword, token },
      })

      if (!response.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password has been reset successfully")
      navigate('/login');
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error)
      toast.error("Unable to reset password")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Choose New Password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Almost done. Enter your new password and you’re all set.
          </p>

          <form onSubmit={handleOnSubmit} className="mt-6">
            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                New Password <sup className="text-red-500">*</sup>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 pr-10 text-gray-900 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-600 dark:text-gray-300"
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Confirm New Password <sup className="text-red-500">*</sup>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 pr-10 text-gray-900 shadow-sm focus:border-yellow-400 focus:ring-yellow-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-10 cursor-pointer text-gray-600 dark:text-gray-300"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-4 flex justify-center">
            <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <BiArrowBack size={18} /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
