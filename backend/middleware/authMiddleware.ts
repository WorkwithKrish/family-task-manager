import jwt from "jsonwebtoken";
import User from "../models/User";

// Middleware to protect the route

// Define a proper type for the decoded token
interface JwtPayload {
  id: string;
  role: string;
}
export const authMiddleware = (roles: any) => {
  return async (req: any, res: any, next: any) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token,authorization denied" });
    }
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const userId = decoded?.id; // Assuming the token contains a user ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      req.status(401).json({ message: "Token is not valid" });
    }
  };
};
