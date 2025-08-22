import React from "react";

interface UploadCardProps {
  icon: string;
  title: string;
  subtitle: string;
  button: string;
  onFileSelect?: (file: File) => void;
}

export default function UploadCard({ icon, title, subtitle, button, onFileSelect }: UploadCardProps) {
  const inputId = `upload-${title.replace(/\s+/g, "-").toLowerCase()}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileSelect) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="upload-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>

      <input type="file" accept="image/*" id={inputId} style={{ display: "none" }} onChange={handleChange} />
      <label htmlFor={inputId} className="upload-btn">
        {button}
      </label>
    </div>
  );
}
