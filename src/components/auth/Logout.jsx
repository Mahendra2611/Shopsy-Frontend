import React from 'react'
import { useSelector } from 'react-redux'
const Logout = () => {
    const {name,email} = useSelector((state)=>state.auth)
    console.log("log out")
  return (
    <div>
      
    </div>
  )
}

export default Logout
