import React from 'react'

const Input = ({type,placeholder,value,onChange,name}) => {
  return (
    <div>
        <label className="block text-subheading-light dark:text-subheading-dark text-sm font-medium">
    {name}
  </label>
    <input
              type={type}
              placeholder={placeholder}
              value={value}
              name={name}
              onChange={onChange}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:ring focus:ring-blue-400 dark:focus:ring-blue-600 outline-none"
              
            />
    </div>
  )
}

export default Input
