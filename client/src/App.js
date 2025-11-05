// client/src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectDetail from "./pages/SubjectDetail";
import AdminDashboard from "./pages/AdminDashboard";
import LoginGoogle from "./pages/LoginGoogle";
import axios from "axios";

export const AuthContext = React.createContext();

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  // On load: try to validate token if exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .post("/api/auth/verify", {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subject/:id" element={<SubjectDetail />} />
          <Route path="/login" element={<LoginGoogle />} />

          {/* Admin protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
