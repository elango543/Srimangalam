import { useState, useEffect, useCallback, useRef } from "react";
import BookModal from "../components/BookModal";
import "../styles/Services.css";

/* ── Images ── */
import decor1 from "../assets/decor1.jpeg"
import decor2 from "../assets/decor2.jpeg"
import decor3 from "../assets/decor3.jpeg"
import decor4 from "../assets/decor4.jpeg"
import decor5 from "../assets/decor5.jpeg"
import decor6 from "../assets/decor6.jpeg"
import decor7 from "../assets/decor7.jpg"
import decor8 from "../assets/decor8.jpg"
import cpl3 from "../assets/cplimage3.jpeg";
import cpl4 from "../assets/cplimage4.jpeg";
import cpl5 from "../assets/cplimage5.jpeg";
import cpl6 from "../assets/cplimage6.jpeg";
import cpl7 from "../assets/cplimage7.jpeg";
import cpl8 from "../assets/cplimage8.jpeg";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";
import addon1 from "../assets/addon1.jpeg";
import addon2 from "../assets/addon2.jpeg";
import addon3 from "../assets/addon3.jpeg";
import addon4 from "../assets/addon4.jpeg";
import addon5 from "../assets/addon5.jpg";
import addon6 from "../assets/addon6.jpeg";
import addon7 from "../assets/addon7.jpeg";
import addon8 from "../assets/addon8.png"

const decorImages = [
  { id: 1, src: decor1, alt: "decor1" },
  { id: 2, src: decor2, alt: "decor2" },
  { id: 3, src: decor3, alt: "decor3" },
  { id: 4, src: decor4, alt: "decor4" },
  { id: 5, src: decor5, alt: "decor5" },
  { id: 6, src: decor6, alt: "decor6" },
  { id: 7, src: decor7, alt: "decor7" },
  { id: 8, src: decor8, alt: "decor8" },
];

const photos = [
  { id: 1, src: cpl8, alt: "pic 1" },
  { id: 2, src: cpl3, alt: "pic 2" },
  { id: 3, src: cpl4, alt: "pic 3" },
  { id: 4, src: cpl5, alt: "pic 4" },
  { id: 5, src: cpl6, alt: "pic 5" },
  { id: 6, src: cpl7, alt: "pic 6" },
  { id: 7, src: pic2, alt: "pic 7" },
  { id: 8, src: pic3, alt: "pic 8" },
];

const addons = [
  { id: 1, src: addon1, alt: "addon1" },
  { id: 2, src: addon5, alt: "addon2" },
  { id: 3, src: addon6, alt: "addon3" },
  { id: 4, src: addon4, alt: "addon4" },
  { id: 5, src: addon2, alt: "addon5" },
  { id: 6, src: addon3, alt: "addon6" },
  { id: 7, src: addon7, alt: "addon7" },
  { id: 8, src: addon8, alt: "addon8" },
  
];

/* ═══════════════════════════════════════════
   MODAL — fullscreen lightbox
═══════════════════════════════════════════ */
function Modal({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [fade,  setFade]  = useState(true);

  function goTo(i) {
    setFade(false);
    setTimeout(function() {
      setIndex(i);
      setFade(true);
    }, 180);
  }

  const prev = useCallback(function() {
    goTo(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length]);

  const next = useCallback(function() {
    goTo(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length]);

  /* Keyboard */
  useEffect(function() {
    function onKey(e) {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    }
    window.addEventListener("keydown", onKey);
    return function() { window.removeEventListener("keydown", onKey); };
  }, [prev, next, onClose]);

  /* Lock scroll */
  useEffect(function() {
    document.body.style.overflow = "hidden";
    return function() { document.body.style.overflow = ""; };
  }, []);

  /* Prevent right-click download on modal image */
  function handleContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div className="modal-overlay" onClick={onClose} onContextMenu={handleContextMenu}>

      {/* Close */}
      <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>

      {/* Counter */}
      <div className="modal-counter">{index + 1} / {images.length}</div>

      {/* Prev */}
      <button
        className="modal-nav modal-nav--left"
        onClick={function(e) { e.stopPropagation(); prev(); }}
        aria-label="Previous"
      >‹</button>

      {/* Image */}
      <div className="modal-img-wrap" onClick={function(e) { e.stopPropagation(); }}>
        <img
          src={images[index].src}
          alt={images[index].alt}
          className={"modal-img" + (fade ? " modal-img--visible" : "")}
          onContextMenu={handleContextMenu}
          draggable={false}
        />
      </div>

      {/* Next */}
      <button
        className="modal-nav modal-nav--right"
        onClick={function(e) { e.stopPropagation(); next(); }}
        aria-label="Next"
      >›</button>

      {/* Dots */}
      <div className="modal-dots" onClick={function(e) { e.stopPropagation(); }}>
        {images.map(function(_, i) {
          return (
            <button
              key={i}
              className={"modal-dot" + (i === index ? " modal-dot--active" : "")}
              onClick={function() { goTo(i); }}
            />
          );
        })}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════
   THUMBNAIL SLIDER — auto-scrolls to keep
   active thumb visible
═══════════════════════════════════════════ */
function ThumbnailSlider({ images, activeIndex, onSelect, color }) {
  const stripRef  = useRef(null);
  const thumbRefs = useRef([]);

  /* Scroll active thumb into view */
  useEffect(function() {
    var strip = stripRef.current;
    var thumb = thumbRefs.current[activeIndex];
    if (!strip || !thumb) return;

    var stripRect = strip.getBoundingClientRect();
    var thumbRect = thumb.getBoundingClientRect();

    var scrollLeft = strip.scrollLeft;
    var thumbLeft  = thumbRect.left - stripRect.left + scrollLeft;
    var thumbRight = thumbLeft + thumbRect.width;

    if (thumbLeft < scrollLeft) {
      strip.scrollTo({ left: thumbLeft - 10, behavior: "smooth" });
    } else if (thumbRight > scrollLeft + stripRect.width) {
      strip.scrollTo({ left: thumbRight - stripRect.width + 10, behavior: "smooth" });
    }
  }, [activeIndex]);

  /* Prevent right-click download */
  function handleContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div className="thumb-strip" ref={stripRef}>
      {images.map(function(img, i) {
        return (
          <div
            key={img.id}
            ref={function(el) { thumbRefs.current[i] = el; }}
            className={"thumb-item" + (i === activeIndex ? " thumb-item--active" : "")}
            style={i === activeIndex ? { "--t-color": color } : {}}
            onClick={function() { onSelect(i); }}
            onContextMenu={handleContextMenu}
            role="button"
            tabIndex={0}
            aria-label={"View " + img.alt}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              draggable={false}
              onContextMenu={handleContextMenu}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   IMAGE PREVIEW — big image on right
═══════════════════════════════════════════ */
function ImagePreview({ images, activeIndex, onPrev, onNext, onExpand }) {
  var img = images[activeIndex];

  /* Prevent right-click download */
  function handleContextMenu(e) {
    e.preventDefault();
    return false;
  }

  return (
    <div className="preview-wrap">

      {/* Big image */}
      <div className="preview-img-box" onClick={onExpand} title="Click to enlarge" onContextMenu={handleContextMenu}>
        <img
          key={activeIndex}
          src={img.src}
          alt={img.alt}
          className="preview-img"
          draggable={false}
          onContextMenu={handleContextMenu}
        />

        {/* Expand hint */}
        <span className="preview-expand">⛶</span>
      </div>

      {/* Arrows */}
      <button
        className="preview-arrow preview-arrow--left"
        onClick={function(e) { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >‹</button>

      <button
        className="preview-arrow preview-arrow--right"
        onClick={function(e) { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >›</button>

    </div>
  );
}

/* ═══════════════════════════════════════════
   GALLERY SECTION — combines all sub-components
═══════════════════════════════════════════ */
function GallerySection({ number, title, description, buttonText, images, themeClass, color, onBook }) {
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [modalOpen,    setModalOpen]    = useState(false);

  /* Navigate with loop */
  function goTo(i) {
    var total = images.length;
    setActiveIndex(((i % total) + total) % total);
  }

  const prev = useCallback(function() { goTo(activeIndex - 1); }, [activeIndex, images.length]);
  const next = useCallback(function() { goTo(activeIndex + 1); }, [activeIndex, images.length]);

  /* Auto-rotate every 3s */
  useEffect(function() {
    var id = setInterval(next, 3000);
    return function() { clearInterval(id); };
  }, [next]);

  return (
    <>
      <section className={"svc-section " + themeClass}>
        <div className="svc-inner">

          {/* ── Number + Title above grid ── */}
          <div className="svc-label-row">
            <span className="svc-number">{number}</span>
            <h2 className="svc-title">{title}</h2>
          </div>

          <div className="svc-grid">

            {/* ── LEFT ── */}
            <div className="svc-left">
              <p className="svc-desc">{description}</p>

              <button className="svc-btn" onClick={onBook}
                style={{ background: color }}>
                {buttonText}
              </button>

              {/* Synced thumbnail strip */}
              <ThumbnailSlider
                images={images}
                activeIndex={activeIndex}
                onSelect={goTo}
                color={color}
              />
            </div>

            {/* ── RIGHT ── */}
            <div className="svc-right">
              <ImagePreview
                images={images}
                activeIndex={activeIndex}
                onPrev={prev}
                onNext={next}
                onExpand={function() { setModalOpen(true); }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox modal */}
      {modalOpen && (
        <Modal
          images={images}
          startIndex={activeIndex}
          onClose={function() { setModalOpen(false); }}
        />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function Services() {
  const [modalLabel, setModalLabel] = useState(null);

  return (
    <>
      <GallerySection
        number="01"
        title="DECORATIONS"
        description="From enchanting floral arrangements to stunning theme decoration, we bring your dream wedding vision to life. Let every corner reflect your style and create unforgettable memories."
        buttonText="Book Us for Decorations"
        images={decorImages}
        themeClass="svc-theme-teal"
        color="#4db5ad"
        onBook={function() { setModalLabel("Decorations"); }}
      />

      <GallerySection
        number="02"
        title="PHOTOGRAPHY"
        description="Transform your special occasions into breathtaking celebrations with our elegant and customised photography services. From grand wedding stages to intimate family functions, we capture every moment with beauty and sophistication."
        buttonText="Book Us for Photography"
        images={photos}
        themeClass="svc-theme-teal"
        color="#4db5ad"
        onBook={function() { setModalLabel("Photography"); }}
      />

      <GallerySection
        number="03"
        title="ENTERTAINMENTS & ADD-ONS"
        description="Make your event extraordinary with our vibrant entertainment and luxury add-ons. Experience high-energy DJ music, dazzling LED visuals, cold pyros entry, welcome performances, and customised attractions designed to impress your guests."
        buttonText="Book Us for Entertainments & Add-ons"
        images={addons}
        themeClass="svc-theme-teal"
        color="#4db5ad"
        onBook={function() { setModalLabel("Entertainments & Add-ons"); }}
      />

      <BookModal
        isOpen={modalLabel !== null}
        onClose={function() { setModalLabel(null); }}
        serviceLabel={modalLabel ?? ""}
        toEmail="srimangalameventscatering@gmail.com"
        subject={"New Booking Request" + (modalLabel ? " — " + modalLabel : "")}
      />
    </>
  );
}