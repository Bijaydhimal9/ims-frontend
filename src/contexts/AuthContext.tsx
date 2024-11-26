import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthContextType,
  AuthState,
  LoginCredentials,
  User,
} from "@/types/auth";
import authAxios from "@/shared/axios/authAxios";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

// Add interface for login response
interface LoginResponse {
  user: User;
  token: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      setState({
        user,
        isAuthenticated,
        isLoading: false,
      });
    } catch (error) {
      console.error("Auth check failed:", error);
      setState({
        ...initialState,
        isLoading: false,
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authAxios.post<LoginResponse>(
        "/account/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { user, token } = response.data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      navigate("/dashboard");
    } catch (error) {
      // Clear all auth data
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
