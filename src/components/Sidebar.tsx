import React from "react";

interface SidebarProps {
  menuItems: { key: string; label: string }[];
  activeMenu: string;
  setActiveMenu: (key: string) => void;
}

export default function Sidebar({ menuItems, activeMenu, setActiveMenu }: SidebarProps) {
  return (
    <div className="sidebar">
      {/* Replace text logo with image */}
      <div className="logo">
        <img src="/medx-logo.png" alt="MedxAI Logo" style={{ width: '150px', height: 'auto' }} />
      </div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveMenu(item.key)}
            className={`menu-btn ${activeMenu === item.key ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
