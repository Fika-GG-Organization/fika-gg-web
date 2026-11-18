import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
  {
    return null;
  }

  if (!isAuthenticated)
	{
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
