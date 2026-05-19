import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "./AuthContext";


function ProtectedRoute({

  children

}: {
  children: React.ReactNode
}) {

  const {
    token,
    loading
  } = useAuth();


  // WAIT FOR TOKEN RESTORE
  if (loading) {

    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        Loading...
      </div>
    );
  }


  // NO TOKEN
  if (!token) {

    return (
      <Navigate
        to="/login"
      />
    );
  }


  return children;
}

export default ProtectedRoute;