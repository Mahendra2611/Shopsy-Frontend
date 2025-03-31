import { useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAPI from "../../hooks/useAPI";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { callApi } = useAPI();
  
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callApi({
        url: "api/owner/reset-password-token",
        method: "POST",
        data: { email },
      });

      console.log("Reset Password Token Response....", response);

      if (!response.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset email sent");
      setEmailSent(true);
    } catch (error) {
      console.log("Reset Password Token Error", error);
      toast.error("Cannot send email");
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100 dark:bg-gray-900 px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 lg:p-8 transition-all">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="my-4 text-gray-600 dark:text-gray-300 text-center">
            {!emailSent
              ? "We'll send you an email with instructions to reset your password. If you don’t have access to your email, we can help you recover your account."
              : `We have sent a reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {!emailSent && (
              <div>
                <label className="block text-gray-800 dark:text-gray-200 font-medium">
                  Email Address <sup className="text-red-500">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex justify-center">
            <Link to="/login" className="flex items-center gap-x-2 text-blue-600 dark:text-blue-400 hover:underline">
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;