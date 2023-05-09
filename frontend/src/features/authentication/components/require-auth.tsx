import { Navigate, Outlet } from "react-router-dom";

import { useAuthAccessToken } from "@/features/authentication/stores/auth-store";

const RequireAuth = () => {
  const token = useAuthAccessToken();

  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default RequireAuth;
