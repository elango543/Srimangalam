import React from "react";
import "../styles/ServiceCards.css";

const SERVICES = [
  {
    id: 1,
    title: "DECORATIONS",
    description:
      "From enchanting floral arrangements to breathtaking stage setups, we transform every corner into a reflection of your love story.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#4db5ad" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8 C20 8 12 18 12 28 C12 42 32 56 32 56 C32 56 52 42 52 28 C52 18 44 8 32 8Z"/>
        <path d="M32 8 C32 8 26 20 26 28 C26 36 32 56 32 56"/>
        <path d="M32 8 C32 8 38 20 38 28 C38 36 32 56 32 56"/>
        <path d="M14 24 Q32 20 50 24"/>
        <path d="M13 32 Q32 28 51 32"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "PHOTOGRAPHY",
    description:
      "Capture every precious moment with our expert photographers who craft timeless memories you'll cherish forever.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#4db5ad" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="20" width="48" height="34" rx="4"/>
        <circle cx="32" cy="37" r="10"/>
        <circle cx="32" cy="37" r="6"/>
        <path d="M22 20 L26 12 H38 L42 20"/>
        <circle cx="50" cy="28" r="2" fill="#4db5ad"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "ENTERTAINMENTS",
    description:
      "Elevate your celebration with high-energy DJ music, dazzling LED visuals, cold pyros, and live performances your guests will never forget.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#4db5ad" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 48 L28 16 L32 26 L38 10 L52 48Z"/>
        <path d="M18 48 L46 48"/>
        <path d="M24 38 L40 38"/>
        <path d="M20 44 L44 44"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "CATERING",
    description:
      "Delight your guests with our curated menus featuring traditional favourites and gourmet cuisine crafted by experienced chefs.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="#4db5ad" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="34" r="18"/>
        <path d="M14 34 H50"/>
        <path d="M24 12 C24 12 20 20 20 26"/>
        <path d="M32 10 L32 26"/>
        <path d="M40 12 C40 12 44 20 44 26"/>
        <path d="M22 52 L42 52"/>
        <path d="M26 52 L26 56 L38 56 L38 52"/>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════
   Service Card — reusable
═══════════════════════════════════════════ */
function ServiceCard({ title, description, icon }) {
  return (
    <div className="sc-card">
      <div className="sc-icon">{icon}</div>
      <h3 className="sc-title">{title}</h3>
      <p className="sc-desc">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Section
═══════════════════════════════════════════ */
export default function ServiceCards() {
  return (
    <section className="sc-section">

      {/* Header */}
      <div className="sc-header">
        <p className="sc-eyebrow">WE DO EVERYTHING</p>
        <h2 className="sc-heading">Our Services</h2>
      </div>

      {/* Cards grid */}
      <div className="sc-grid">
        {SERVICES.map(function (svc) {
          return (
            <ServiceCard
              key={svc.id}
              title={svc.title}
              description={svc.description}
              icon={svc.icon}
            />
          );
        })}
      </div>

      {/* Bottom paragraph */}
      <p className="sc-tagline">
       At Sri Mangalam, we craft refined celebrations defined by elegance, detail, and seamless execution.
From bespoke décor and premium catering to photography, entertainment, and DJ experiences, every element is thoughtfully curated.
Whether an intimate gathering or a grand occasion, we tailor each event to reflect your vision and style.
We don’t just create events — we deliver timeless experiences that leave a lasting impression.
      </p>

    </section>
  );
}