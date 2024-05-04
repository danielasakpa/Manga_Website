import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import showToast from "../utils/toastUtils";
import {
  handleTokenExpiration,
  setAuthData,
  removeAuthData,
} from "../utils/authUtils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      if(!token) {
        try {
            const response = await axios({
              method: "GET",
              url: `https://yuki-manga-server.netlify.app/api/auth/login/success`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
               "Access-Control-Allow-Credentials": true,
              },
              withCredentials: true,
            });
    
            if (response.status !== 200) {
              showToast("Authentication has failed!", "error");
            }
    
            if (response.data) {
              const { user, token, message } = response.data;
              setAuthData(user, token, message, "google");
              setToken(token);
              navigate(location.state?.prevUrl || "/");
            }
          } catch (err) {
            console.error(err);
          }
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    handleTokenExpiration(token, logout);
  }, []);

  const login = async (userData) => {
    try {
      const { data } = await axios.post(
        "https://yuki-manga-server.netlify.app/api/auth/login",
        userData
      );
      const { user, message, token } = data;

      setToken(token);
      setAuthData(user, token);
      showToast(message, "success", "top-center");
      navigate(location.state?.prevUrl || "/");
    } catch (error) {
      showToast(error?.message || "Login failed", "error", "top-center");
    }
  };

  function logout() {
    // Check if the user logged in with Google
    if (localStorage.getItem("isGoogle")) {
      setToken(null);
      removeAuthData();

      // Clear the 'isGoogle' flag
      localStorage.removeItem("isGoogle");

      // Trigger a logout by opening the server-side logout endpoint
      window.open("https://yuki-manga-server.netlify.app/api/auth/logout", "_self");

      return;
    }

    setToken(null);
    removeAuthData();

    navigate("/login");
  }

  function isAuthenticated() {
    return !!token;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
