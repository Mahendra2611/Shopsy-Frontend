import React, { useState } from "react";
import Input from "../common/Input";
import useAPI from "../../hooks/useAPI";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOwner } from "../../redux/AuthSlice";


const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "", // Holds either email or mobile number
    password: "",
  });

  const [errors, setErrors] = useState({ identifier: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { callApi, loading, error } = useAPI();

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Mobile number validation function (10-digit Indian numbers)
  const validateMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  // Password validation function (min length 6)
  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "identifier") {
      setErrors((prev) => ({
        ...prev,
        identifier:
          validateEmail(value) || validateMobile(value)
            ? ""
            : "Enter a valid email or mobile number",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 6 characters",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { identifier, password } = formData;

    // Final validation check before submitting
    if (!validateEmail(identifier) && !validateMobile(identifier)) {
      setErrors((prev) => ({
        ...prev,
        identifier: "Enter a valid email or mobile number",
      }));
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    // Determine whether identifier is an email or mobile number
    const requestData = {
      email: validateEmail(identifier) ? identifier : undefined,
      mobileNumber: validateMobile(identifier) ? identifier : undefined,
      password,
    };

    const response = await callApi({
      url: "api/owner/login",
      method: "POST",
      data: requestData,
      headers: { "Content-Type": "application/json" },
    });
   
    if (response) {
      

      const owner = {"email":response?.email||"","name":response?.name||"","id":response.id||""}
      localStorage.setItem("owner", JSON.stringify(owner));
      dispatch(addOwner(owner));
      navigate("/dashboard");
    } 
    else {
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 dark:bg-gray-900">
      <div className="w-full max-w-md mx-3 md:mx-0 p-8 shadow-2xl bg-white dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold font-heading text-gray-800 dark:text-gray-200 text-center mb-6">
           Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Mobile Input */}
          <div>
            <Input
              type="text"
              placeholder="Email or Mobile Number"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <Link to="/forgot-password" className="self-end text-sm text-blue-500 dark:text-blue-400 hover:underline">
            Forgot Password?
          </Link>
          <p className="text-center text-gray-700 dark:text-gray-300 mt-3">
            Don't have an account? {" "}
            <a href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
