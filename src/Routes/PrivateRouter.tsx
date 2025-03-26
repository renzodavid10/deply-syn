import { Navigate } from "react-router";
 
interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}
 
export const PrivateRouter = ({ children, isAuthenticated }: Props) => {
  return !isAuthenticated ? <Navigate to="/login" /> : children;
};