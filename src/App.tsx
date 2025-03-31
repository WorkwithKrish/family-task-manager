import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthProvider from "./AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./utils/PrivateRoute";

export const PATHNAMES = {
  DASHBOARD: "/dashboard",
  HOME: "/",
  UNAUTHORIZED: "/unauthorized",
  LOGIN: "/login",
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path={PATHNAMES.HOME}
          element={
            <PrivateRoute allowedRoles={["guest", "user", "admin"]}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={PATHNAMES.DASHBOARD}
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path={PATHNAMES.LOGIN} element={<Login />} />
        <Route
          path={PATHNAMES.HOME}
          element={
            <PrivateRoute allowedRoles={["guest", "user", "admin"]}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path={"*"} element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
