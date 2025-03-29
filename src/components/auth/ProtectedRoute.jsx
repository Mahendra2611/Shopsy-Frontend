import { Navigate } from "react-router-dom";
import { useSelector ,shallowEqual} from "react-redux";

const ProtectedRoute = ({ children }) => {

     const { name,email} = useSelector((state)=>state.auth.owner || {name:"",email:""},shallowEqual);

       // console.log(name)
    return (name  && email  )? children : <Navigate to="/" /> ;
};

export default ProtectedRoute;
