import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthToken } from "@/features/authentication/stores/auth-store";

const RequireAuth = () => {
  const token = useAuthToken();

  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location }} />
  );
};

export default RequireAuth;
