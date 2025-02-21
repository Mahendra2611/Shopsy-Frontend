import React, { useState } from "react";
import Input from "../common/Input";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add signup logic here (API call)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-100 dark:bg-background-dark">
      <div className="w-full max-w-md mx-3 md:mx-0 p-8 shadow-2xl shadow-background-dark bg-white dark:bg-gray-900  rounded-lg">
        <h2 className="text-2xl font-bold text-heading-light dark:text-heading-dark text-center mb-6">
          Shop Owner Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
         
            <Input type="text" name="name" value={formData.name} onChange={handleChange}/>

            <Input type="email" name="email" value={formData.email} onChange={handleChange}/>
          
            <Input type="password" name="password" value={formData.password} onChange={handleChange}/>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
