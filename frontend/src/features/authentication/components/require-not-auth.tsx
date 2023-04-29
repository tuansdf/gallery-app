import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectCurrentToken } from "@/features/authentication/stores/auth-slice";

const RequireNotAuth = () => {
  const token = useSelector(selectCurrentToken);

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireNotAuth;
