import React, { useState, useEffect, useCallback } from "react";
import "../styles/Gallery.css";

import decor1 from "../assets/decor1.jpeg"
import decor2 from "../assets/decor2.jpeg"
import decor3 from "../assets/decor3.jpeg"
import decor4 from "../assets/decor4.jpeg"
import decor5 from "../assets/decor5.jpeg"
import decor6 from "../assets/decor6.jpeg"
import decor7 from "../assets/decor7.jpg"
import decor8 from "../assets/decor8.jpg"
import cpl3 from "../assets/cplimage3.jpeg"
import cpl4 from "../assets/cplimage4.jpeg"
import cpl5 from "../assets/cplimage5.jpeg"
import cpl6 from "../assets/cplimage6.jpeg"
import cpl7 from "../assets/cplimage7.jpeg"
import cpl8 from "../assets/cplimage8.jpeg"
import pic2 from "../assets/pic2.jpeg"
import pic3 from "../assets/pic3.jpeg"
import addon1 from "../assets/addon1.jpeg"
import addon2 from "../assets/addon2.jpeg"
import addon3 from "../assets/addon3.jpeg"
import addon4 from "../assets/addon4.jpeg"
import addon5 from "../assets/addon5.jpg"
import addon6 from "../assets/addon6.jpeg"
import addon7 from "../assets/addon7.jpeg"
import addon8 from "../assets/addon8.png"

const GALLERY_ITEMS = [
  { id: 1,  category: "Decor Management",            src: decor1,        alt: "decor 1" },
  { id: 2,  category: "Decor Management",            src: decor2,        alt: "decor 2" },
  { id: 3,  category: "Decor Management",            src: decor3,        alt: "decor 3" },
  { id: 4,  category: "Decor Management",            src: decor4,        alt: "decor 4" },
  { id: 5,  category: "Decor Management",         src: decor5,        alt: "decor 5" },
  { id: 6,  category: "Decor Management", src: decor6,        alt: "decor6" },
  { id: 7,  category: "Decor Management",         src: decor7,        alt: "decor 7" },
  { id: 8,  category: "Decor Management", src: decor8,        alt: "Decor 8" },
  { id: 9,  category: "Photography", src: cpl3,        alt: "pic 1" },
  { id: 10,  category: "Photography", src: cpl4,        alt: "pic 2" },
  { id: 11,  category: "Photography", src: cpl5,       alt: "pic 3" },
  { id: 12, category: "Photography", src: cpl6,       alt: "pic 4" },
  { id: 13, category: "Photography", src: cpl7,       alt: "pic 5" },
  { id: 14, category: "Photography", src: cpl8,       alt: "pic 6" },
  { id: 15, category: "Photography",      src: pic2,  alt: "pic 7" },
  { id: 16, category: "Photography",      src: pic3,  alt: "pic 8" },
  { id: 17, category: "Entertainments & addons",      src: addon1,  alt: "ad 1" },
  { id: 18, category: "Entertainments & addons",      src: addon2,  alt: "ad 2" },
  { id: 19, category: "Entertainments & addons",      src: addon3,  alt: "ad 3" },
  { id: 20, category: "Entertainments & addons",      src: addon4,  alt: "ad 4" },
  { id: 21, category: "Entertainments & addons",      src: addon5,  alt: "ad 5" },
  { id: 22, category: "Entertainments & addons",      src: addon6,  alt: "ad 6" },
  { id: 23, category: "Entertainments & addons",      src: addon7,  alt: "ad 7" },
  { id: 24, category: "Entertainments & addons",      src: addon8,  alt: "ad 8" },
];

const TABS = ["All Photos", "Decor Management", "Photography", "Entertainments & addons"];

/* ═══════════════════════════════════════════
   LIGHTBOX MODAL — with Download Protection
═══════════════════════════════════════════ */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  /* Keyboard support */
  useEffect(function () {
    function handleKey(e) {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    }
    window.addEventListener("keydown", handleKey);
    return function () { window.removeEventListener("keydown", handleKey); };
  }, [onClose, onPrev, onNext]);

  /* Lock body scroll */
  useEffect(function () {
    document.body.style.overflow = "hidden";
    return function () { document.body.style.overflow = ""; };
  }, []);

  /* Prevent right-click context menu */
  function handleContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div
      className="glb-overlay"
      onClick={onClose}
      onContextMenu={handleContextMenu}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        className="glb-close"
        onClick={onClose}
        aria-label="Close"
      >✕</button>

      {/* Counter */}
      <div className="glb-counter">{index + 1} / {images.length}</div>

      {/* Prev arrow */}
      <button
        className="glb-arrow glb-arrow--left"
        onClick={function (e) { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >‹</button>

      {/* Centered image — stop click bubbling so overlay click doesn't close */}
      <div
        className="glb-img-wrap"
        onClick={function (e) { e.stopPropagation(); }}
        onContextMenu={handleContextMenu}
      >
        <img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          className="glb-img"
          draggable={false}
          onContextMenu={handleContextMenu}
        />
      </div>

      {/* Next arrow */}
      <button
        className="glb-arrow glb-arrow--right"
        onClick={function (e) { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >›</button>

      {/* Dot indicators */}
      <div
        className="glb-dots"
        onClick={function (e) { e.stopPropagation(); }}
      >
        {images.map(function (_, i) {
          return (
            <span
              key={i}
              className={"glb-dot" + (i === index ? " glb-dot--active" : "")}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN GALLERY COMPONENT
═══════════════════════════════════════════ */
export default function Gallery() {
  const [activeTab,   setActiveTab]   = useState("All Photos");
  const [lightboxIdx, setLightboxIdx] = useState(null); // null = closed

  /* Filter images based on active tab */
  const filtered = activeTab === "All Photos"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(function (item) { return item.category === activeTab; });

  /* Open lightbox at clicked index */
  function openLightbox(i) { setLightboxIdx(i); }

  /* Close */
  const closeLightbox = useCallback(function () { setLightboxIdx(null); }, []);

  /* Prev — loops */
  const goPrev = useCallback(function () {
    setLightboxIdx(function (i) {
      return i === 0 ? filtered.length - 1 : i - 1;
    });
  }, [filtered.length]);

  /* Next — loops */
  const goNext = useCallback(function () {
    setLightboxIdx(function (i) {
      return i === filtered.length - 1 ? 0 : i + 1;
    });
  }, [filtered.length]);

  /* Prevent right-click on grid items */
  function handleGridContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <section className="gallery-section">

      {/* ── Header ── */}
      <div className="gallery-header">
        <p className="gallery-eyebrow">Sweet Memories</p>
        <h2 className="gallery-title">OUR CAPTURED MOMENTS</h2>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="gallery-tabs">
        {TABS.map(function (tab) {
          return (
            <button
              key={tab}
              className={"gallery-tab" + (activeTab === tab ? " gallery-tab--active" : "")}
              onClick={function () {
                setActiveTab(tab);
                setLightboxIdx(null); // close lightbox on tab change
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── Image Grid ── */}
      <div className="gallery-grid">
        {filtered.map(function (item, i) {
          return (
            <div
              key={item.id}
              className="gallery-item"
              onClick={function () { openLightbox(i); }}
              onContextMenu={handleGridContextMenu}
              role="button"
              tabIndex={0}
              aria-label={"Open " + item.alt}
              onKeyDown={function (e) { if (e.key === "Enter") openLightbox(i); }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                draggable={false}
                onContextMenu={handleGridContextMenu}
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-icon">🔍</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

    </section>
  );
}