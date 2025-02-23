import React, { useState } from "react";
import Input from "../common/Input";
import useAPI from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOwner } from "../../redux/AuthSlice";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { callApi, loading, error } = useAPI();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function (min length 6)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Live validation
    if (e.target.name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(e.target.value) ? "" : "Invalid email format",
      }));
    } else if (e.target.name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(e.target.value)
          ? ""
          : "Password must be at least 6 characters",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check before submitting
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }
    if (!validatePassword(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    const response = await callApi({
      url: "api/ownerAuth/login",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      console.log("Login Successful:", response);
      dispatch(addOwner({ name: response.name, email: response.email }));
      navigate("/dashboard");
    } else {
      console.error("Login Failed:", error);
      alert(error || "Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 dark:bg-gray-900">
      <div className="w-full max-w-md mx-3 md:mx-0 p-8 shadow-2xl bg-white dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Shop Owner Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input with Icon */}
          <div>
            
             
              <Input
                type="email"
                placeholder="Email"
                
                value={formData.email}
                onChange={handleChange}
                required
              />
          
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input with Icon */}
          <div>
           
              
              <Input
                type="password"
              
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
           
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button with Loading State */}
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
      </div>
    </div>
  );
};

export default Login;
