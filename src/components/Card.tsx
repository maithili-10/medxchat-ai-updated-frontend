import React from "react";

interface CardProps {
  title: string;
  value: string;
  subtitle: string;
  status: string;
}

export default function Card({ title, value, subtitle, status }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="value">{value}</p>
      <p className="subtitle">{subtitle}</p>
      <span className="status">{status}</span>
    </div>
  );
}
