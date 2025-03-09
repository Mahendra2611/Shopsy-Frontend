import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
     const { name,email} = useSelector((state)=>state.auth.owner);
        console.log(name)
    return (name  && email  )? children : <Navigate to="/" /> ;
};

export default ProtectedRoute;
