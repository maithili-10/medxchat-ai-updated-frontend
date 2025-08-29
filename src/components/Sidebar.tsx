import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css"; 

interface SidebarProps {
  menuItems: { key: string; label: string; path: string }[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img
          src="/medx-logo.png"
          alt="MedxAI Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link key={item.key} to={item.path}>
            <button
              className={`menu-btn ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
