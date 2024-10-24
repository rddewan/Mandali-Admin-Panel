import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/presentation";
import { useEffect } from "react";

const AuthChecker = () => {
  const checkAuthState = useAuthStore.use.checkAuthState();

  useEffect(() => {
    // Check if the user is authenticated on any route access
    const fetchAuthState = async () => {
      await checkAuthState();
    };
    // Render the nested routes
    fetchAuthState();
  }, [checkAuthState]);

  return <Outlet />;
};

export default AuthChecker;
