import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import HealthDashboard from "./pages/HelathDashboard.tsx";
import FacialAnalysis from "./components/FacialAnalysis/FacialAnalysis.tsx";
import ChatUI from "./components/ChatUI.tsx";
import "./App.css";

export default function App() {
  const menuItems = [
    { key: "ai-chat", label: "AI Chat", path: "/chat" },
    { key: "health-dashboard", label: "Health Dashboard", path: "/dashboard" },
    { key: "facial-analysis", label: "Facial Analysis", path: "/facial-analysis" },
    // { key: "profile", label: "Profile", path: "/profile" },
  ];

  return (
    <Router>
      <div className="app">
        {/* Sidebar always visible */}
        <Sidebar menuItems={menuItems} />

        {/* Main content changes with route */}
        <div className="content">
          <Routes>
            <Route path="/chat" element={<ChatUI />} />
            <Route path="/dashboard" element={<HealthDashboard />} />
            <Route path="/facial-analysis" element={<FacialAnalysis />} />
            <Route path="/" element={<ChatUI />} /> {/* default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
