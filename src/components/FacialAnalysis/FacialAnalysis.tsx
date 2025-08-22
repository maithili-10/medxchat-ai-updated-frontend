import React, { useState } from "react";
import axios from "axios";
import UploadCard from "./UploadCard.tsx";
import ProductGrid from "./ProductGrid.tsx";

export default function FacialAnalysis() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploadedImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/facial-analysis/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Facial Analysis Error:", err);
      alert("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="heading">Facial Wellness Analysis</h2>
      <p>Upload a photo for AI-powered wellness insights and recommendations.</p>

      <div className="upload-preview-section">
        <UploadCard
          icon="⬆️"
          title="Upload from Device"
          subtitle="Choose a clear, well-lit photo"
          button="Select Photo"
          onFileSelect={handleFileSelect}
        />
        {uploadedImage && (
          <div className="uploaded-photo-preview">
            <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
          </div>
        )}
      </div>

      {loading && <p>Analyzing image...</p>}
      {products.length > 0 && <ProductGrid products={products} />}
    </div>
  );
}
