import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";



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
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true} // <-- adds arrows
      breakpoints={{
        600: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
    >
      {products.map((p, i) => (
        <SwiperSlide key={i}>
          <div
            className="product-card"
            onClick={() => window.open(p.link, "_blank")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === "Enter" && window.open(p.link, "_blank")}
          >
            {p.thumbnail && (
              <img src={p.thumbnail} alt={p.title} className="product-thumbnail" />
            )}
            <h4>{p.title}</h4>
            <p className="snippet">{p.snippet}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
