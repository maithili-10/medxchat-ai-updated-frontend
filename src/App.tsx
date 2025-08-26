import React, { useState } from "react";
import Sidebar from "./components/Sidebar.tsx";
import HealthDashboard from "./pages/HelathDashboard.tsx";
import FacialAnalysis from "./components/FacialAnalysis/FacialAnalysis.tsx";
import ChatUI from "./components/ChatUI.tsx";
import "./App.css";

const menuItems = [
  { key: "ai-chat", label: "AI Chat" },
  { key: "health-dashboard", label: "Health Dashboard" },
  { key: "facial-analysis", label: "Facial Analysis" },
  // { key: "profile", label: "Profile" },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("ai-chat");

  const renderContent = () => {
    switch (activeMenu) {
      case "health-dashboard":
        return <HealthDashboard />;
      case "facial-analysis":
        return <FacialAnalysis />;
      case "profile":
        return <p className="info">👤 Profile settings will be here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Sidebar menuItems={menuItems} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="content">
        {renderContent()}
        <div className={`chat-wrapper ${activeMenu === "ai-chat" ? "visible" : "hidden"}`}>
          <ChatUI />
        </div>
      </div>
    </div>
  );
}
