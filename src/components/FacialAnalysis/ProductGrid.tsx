import React from "react";

interface ProductGridProps {
  products: {
    title: string;
    link: string;
    snippet: string;
    thumbnail: string;
  }[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.slice(0, 5).map((p, i) => (
        <div className="product-card" key={i}>
          {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="product-thumbnail" />}
          <a href={p.link} target="_blank" rel="noopener noreferrer">
            <h4>{p.title}</h4>
          </a>
          <p className="snippet">{p.snippet}</p>
        </div>
      ))}
    </div>
  );
}
