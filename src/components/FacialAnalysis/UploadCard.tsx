import React from "react";
import "./FacialAnalysis.css"; // reuse same css

interface UploadCardProps {
  icon: string;
  title: string;
  subtitle: string;
  button: string;
  onFileSelect: (file: File) => void;
  capture?: "user" | "environment";
}

export default function UploadCard({
  icon,
  title,
  subtitle,
  button,
  onFileSelect,
  capture,
}: UploadCardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-subtitle">{subtitle}</p>

      <input
        type="file"
        accept="image/*"
        capture={capture}
        onChange={handleChange}
        className="file-input"
        id={title}
      />
      <label htmlFor={title} className="upload-btn">
        {button}
      </label>
    </div>
  );
}
