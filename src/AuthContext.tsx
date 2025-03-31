import axios from "axios";
import { createContext, ReactNode, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "./App";

axios.defaults.withCredentials = true;

type UserRole = "admin" | "guest" | "user" | null;

interface AuthContextType {
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>({
  role: null,
  login: async () => {},
  logout: async () => {},
});
interface AuthProviderProps {
  children: ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const navigate = useNavigate();
  const checkAuth = async () => {
    try {
      const res = await axios.get("https://api.example.com/auth");
      setRole(res?.data?.role as UserRole);
    } catch (error) {
      setRole(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("", { email, password });
      setRole(res.data.role as UserRole);
      switch (res.data.role) {
        case "admin":
          navigate(PATHNAMES.HOME);
          break;
        case "user":
          navigate(PATHNAMES.DASHBOARD);
          break;
        case "guest":
          navigate(PATHNAMES.HOME);
          break;
        default:
          navigate(PATHNAMES.LOGIN);
      }
    } catch (error) {
      alert("invalid User");
    }
  };

  const logout = async () => {
    await axios.post("/logout");
    setRole(null);
    navigate("/");
  };
  const authContextValue = useMemo(() => ({ role, login, logout }), [role]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
