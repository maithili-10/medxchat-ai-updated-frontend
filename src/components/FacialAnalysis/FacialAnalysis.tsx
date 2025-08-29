import React, { useState } from "react";
import axios from "axios";
import UploadCard from "./UploadCard.tsx";
import "./FacialAnalysis.css"; 
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
      const res = await axios.post(
        "https://medpharmacy-ai-2.onrender.com/facial-analysis/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Facial Analysis Error:", err);
      alert("Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facial-analysis">
      <h2 className="heading">Facial Wellness Analysis</h2>
      <p className="subtext">
        Upload a photo for AI-powered wellness insights and recommendations.
      </p>

      {/* Upload Row */}
      <div className="upload-row">
        {/* Upload from Device */}
        <UploadCard
          icon="⬆️"
          title="Upload from Device"
          subtitle="Choose a clear, well-lit photo"
          button="Select Photo"
          onFileSelect={handleFileSelect}
        />

        {/* Conditionally show Preview */}
        {uploadedImage && (
          <div className="preview-card">
            <h3 className="card-title">Preview</h3>
            <img src={uploadedImage} alt="Uploaded" className="preview-img" />
          </div>
        )}

        {/* Upload using Camera */}
        {/* <UploadCard
          icon="📷"
          title="Upload using Camera"
          subtitle="Take a live photo"
          button="Open Camera"
          onFileSelect={handleFileSelect}
          capture="user"
        /> */}
      </div>

      {/* Status + Products */}
      {loading && <p className="loading">Analyzing image...</p>}
      {products.length > 0 && (
        <div className="product-section">
       
         {loading && <p>Analyzing image...</p>}
      {products.length > 0 && <ProductGrid products={products} />}

        </div>
      )}
    </div>
  );
}
