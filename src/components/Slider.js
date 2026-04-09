import React, { useState, useEffect, useCallback } from "react";
import "../styles/Slider.css";

import decor1 from "../assets/decor1.jpeg";
import decor2 from "../assets/decor2.jpeg";
import decor3 from "../assets/decor3.jpeg";
import decor4 from "../assets/decor4.jpeg";
import addon1 from "../assets/addon1.jpeg";
import addon7 from "../assets/addon7.jpeg";
import addon8 from "../assets/addon8.png";
import decor8 from "../assets/decor8.jpg";

const slides = [
  { id: 1, image: decor1, alt: "Elegant wedding decoration" },
  { id: 2, image: decor2, alt: "Beautiful event styling" },
  { id: 3, image: decor3, alt: "Floral arrangements" },
  { id: 4, image: decor4, alt: "Grand venue setup" },
  { id: 5, image: addon7, alt: "Reception decor" },
  { id: 6, image: addon8, alt: "Reception decor" },
  { id: 7, image: addon1, alt: "Reception decor" },
  { id: 8, image: decor8, alt: "Reception decor" },
];

const INTERVAL = 4000;

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 800);
    },
    [animating]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <div className="hs-wrapper">
      <div className="hs-track">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`hs-slide ${i === current ? "hs-slide--active" : ""}`}
            onContextMenu={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
          >
            <div
              className="hs-slide-bg"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            />
            <div className="hs-overlay" />
          </div>
        ))}
      </div>

      <div className="hs-dots" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hs-dot ${i === current ? "hs-dot--active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hs-progress" key={current}>
        <div className="hs-progress-bar" />
      </div>
    </div>
  );
}