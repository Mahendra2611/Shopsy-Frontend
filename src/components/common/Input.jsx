import React from 'react'
import { UploadCloud, Mic, MicOff, Loader2 } from "lucide-react";
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

export const  InputWithVoice = ({ name, icon, placeholder, value, onChange, startListening, listening, currentField }) => (
  <div className="relative flex">
    {icon && <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-300">{icon}</span>}
    <Input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} className="pl-10" />
    <button type="button" className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md" onClick={() => startListening(name)}>
      {listening && currentField === name ? <MicOff /> : <Mic />}
    </button>
  </div>
);

