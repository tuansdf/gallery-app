import { Navigate, Outlet } from "react-router-dom";

import { useAuthToken } from "@/features/authentication/stores/auth-store";

const RequireNotAuth = () => {
  const token = useAuthToken();

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default RequireNotAuth;
