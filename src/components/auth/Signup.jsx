import React, { useState } from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import useAPI from "../../hooks/useAPI";
import { addOwner } from "../../redux/AuthSlice";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { callApi, loading, error } = useAPI();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Invalid email format");
    return;
  }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
  
    console.log("Form Data:", formData);
  
    const response = await callApi({
      url: "api/owner/register",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "application/json" },
    });
  
    //console.log(response);
    if (response) {
      console.log("Signup Successful:", response);
      dispatch(addOwner({ name: formData.name, email: formData.email }));
      toast.success("Signup Successful");
      navigate("/registerShop");
    } else {
      console.error("Signup Failed:", error);
      toast.error("Signup Failed");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 dark:bg-background-dark">
      <div className="w-full max-w-md mx-3 md:mx-0 p-8 shadow-2xl shadow-background-dark bg-white dark:bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-heading-light dark:text-heading-dark text-center mb-6">
          Shop Owner Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <button
  type="submit"
  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition flex items-center justify-center"
  disabled={loading}
>
  {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Sign Up"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
