import React from "react";
import "../styles/Testimonials.css";

import couple1 from "../assets/cplimage2.jpeg";
import couple2 from "../assets/cplimage3.jpeg";
import couple3 from "../assets/cplimage7.jpeg";
import couple4 from "../assets/cplimage6.jpeg";

const testimonials = [
  {
    id: 1,
    photo: couple1,
    names: "Priya & Arjun",
    review:
      "Sri Mangalam made our wedding day absolutely magical. Every detail was perfect — from the stunning floral decorations to the seamless coordination. We didn't have to worry about a single thing. Our guests are still talking about how beautiful everything was!",
  },
  {
    id: 2,
    photo: couple2,
    names: "Meena & Karthik",
    review:
      "We had a dream beach wedding and Sri Mangalam executed it beyond our expectations. The way they planned every element, the photography, the decor, the food — everything was above and beyond. We were completely stress-free and enjoyed every moment.",
  },
  {
    id: 3,
    photo: couple3,
    names: "Divya & Rahul",
    review:
      "Choosing Sri Mangalam was the best decision we made for our wedding. The team was professional, creative, and genuinely cared about making our day special. The decorations were breathtaking and everything ran like clockwork. Truly unforgettable!",
  },
  {
    id: 4,
    photo: couple4,
    names: "Sneha & Vikram",
    review:
      "From the very first meeting, Sri Mangalam understood exactly what we wanted. They transformed our vision into reality with such elegance and grace. The venue decoration left everyone speechless. We are so grateful for making our day so perfect.",
  },
];

export default function Testimonials() {
  return (
    <section className="testi-section">

      {/* Decorative background quotes */}
      <span className="testi-bg-quote testi-bg-quote--top">❝</span>
      <span className="testi-bg-quote testi-bg-quote--bottom">❞</span>

      <div className="testi-inner">

        {/* Header */}
        <div className="testi-header">
          <h2 className="testi-title">What Clients Say About Us</h2>
          <p className="testi-subtitle">
            We have been delighted to receive many letters of thanks from couples
            who have chosen Sri Mangalam for their unique wedding.
          </p>
        </div>

        {/* Scrollable cards container */}
        <div className="testi-scroll-wrapper">
          <div className="testi-scroll-track">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={t.id}>

                {/* Left: accent bars + photo */}
                <div className="testi-photo-col">
                  <div className="testi-accent-bars">
                    <span className="testi-bar testi-bar--teal" />
                    <span className="testi-bar testi-bar--coral" />
                  </div>

                  {/* ── photo-ring: blocks right-click and drag ── */}
                  <div
                    className="testi-photo-ring"
                    onContextMenu={e => e.preventDefault()}
                    onDragStart={e => e.preventDefault()}
                  >
                    {t.photo ? (
                      /* background-image div instead of <img> — removes right-click "Save image as" */
                      <div
                        className="testi-photo testi-photo-bg"
                        style={{ backgroundImage: `url(${t.photo})` }}
                        role="img"
                        aria-label={t.names}
                      />
                    ) : (
                      <div className="testi-photo-placeholder">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth="1.2">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <span>Photo {i + 1}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: review text */}
                <div className="testi-content">
                  <span className="testi-open-quote">❝</span>
                  <p className="testi-review">{t.review}</p>
                  <p className="testi-names">{t.names}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}