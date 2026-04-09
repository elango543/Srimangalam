import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BookModal from "../components/BookModal";
import "../styles/Navbar.css";
import smlogo from "../assets/smlogo.png"

export default function Navbar() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => setIsOpen((p) => !p);
  const closeMenu  = () => setIsOpen(false);
  const openModal  = (e) => { e.preventDefault(); setShowModal(true); closeMenu(); };

  return (
    <>
      <nav className="nav">

        {/* ── Hamburger (mobile, left) ── */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* ── Logo ── */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src={smlogo} alt="Sri Mangalam Logo" className="nav-logo-img" />
          <span className="nav-brand">SRI MANGALAM</span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="nav-links-desktop">
          <li><NavLink to="/" end>HOME</NavLink></li>
          <li><NavLink to="/services">SERVICES</NavLink></li>
          <li><NavLink to="/gallery">GALLERY</NavLink></li>
          <li><NavLink to="/testimonials">TESTIMONIALS</NavLink></li>
        </ul>

        {/* ── Desktop CTA ── */}
        <a href="#book" className="nav-cta nav-cta-desktop" onClick={openModal}>
          BOOK US NOW
        </a>

        <div className="nav-spacer" />
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={`mobile-drawer ${isOpen ? "active" : ""}`}>
        <ul className="drawer-links">
          <li><NavLink to="/"             end onClick={closeMenu}>HOME</NavLink></li>
          <li><NavLink to="/services"         onClick={closeMenu}>SERVICES</NavLink></li>
          <li><NavLink to="/gallery"         onClick={closeMenu}>GALLERY</NavLink></li>
          <li><NavLink to="/testimonials"     onClick={closeMenu}>TESTIMONIALS</NavLink></li>
        </ul>
        <div className="drawer-cta-wrap">
          <a href="#book" className="drawer-cta" onClick={openModal}>
            BOOK US NOW
          </a>
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      {isOpen && <div className="nav-overlay" onClick={closeMenu} />}

      {/* ── Shared Booking Modal ── */}
      <BookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        toEmail="dhanushkumar@gmail.com"
        subject="New Booking Request"
      />
    </>
  );
}