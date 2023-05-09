import { Navigate, Outlet } from "react-router-dom";

import { useAuthAccessToken } from "@/features/authentication/stores/auth-store";

const RequireNotAuth = () => {
  const token = useAuthAccessToken();

  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default RequireNotAuth;
