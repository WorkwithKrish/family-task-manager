import * as React from "react";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  allowedRoles: ("admin" | "guest" | "user" | null)[];
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { role } = React.useContext(AuthContext);
  if (!role) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  return children;
};
export default PrivateRoute;
