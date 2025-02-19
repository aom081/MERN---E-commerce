import React from "react";

const AdminRouter = ({ children }) => {
  const { user, getUser, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user && userInfo && userInfo.role === "admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRouter;
