import React from "react";

interface SidebarProps {
  menuItems: { key: string; label: string }[];
  activeMenu: string;
  setActiveMenu: (key: string) => void;
}

export default function Sidebar({ menuItems, activeMenu, setActiveMenu }: SidebarProps) {
  return (
    <div className="sidebar">
      <h1 className="logo">VitalAI</h1>
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
