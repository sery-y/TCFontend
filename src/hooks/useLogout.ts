import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // 🔴 clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");

    // 🔁 redirect
    navigate("/login", { replace: true });
  };

  return logout;
}
