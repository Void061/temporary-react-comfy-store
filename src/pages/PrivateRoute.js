import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
//import { useUserContext } from "../context/user_context";

// ... rest è il rest operator, prende tutte le props (Children ed il resto delle props)

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0();
  
  if(!user){
    return <Navigate to="/" />
  }
  return children;
  
};
export default PrivateRoute;
