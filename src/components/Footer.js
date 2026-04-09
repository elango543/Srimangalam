import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "../styles/Footer.css";
import smlogo from "../assets/smlogo.png"

function Footer() {
  // ── Replace these with your actual details ──
  const INSTAGRAM_URL  = "https://www.instagram.com/sri_mangalam_80?utm_source=qr&igsh=MW03dnl4YmdveHAxeA==";
  const WHATSAPP_NUM   = "918072800880"; // country code + number, no + or spaces
  const GMAIL          = "srimangalameventscatering@gmail.com";
  const PHONE          = "+91 8072800880";
  const COPYRIGHT_YEAR = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── LEFT ── */}
        <div className="footer-left">
          
          {/* Brand Row */}
          <div className="footer-brand">
            <img src={smlogo} alt="Sri Mangalam Logo" className="footer-logo" />
            <span className="footer-brand-name">Sri Mangalam</span>
          </div>

          {/* Tagline Below */}
          <p className="footer-tagline">
            Making your dream wedding a beautiful reality.
          </p>

        </div>


        {/* ── Contact ── */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>

          <a href={`mailto:${GMAIL}`} className="footer-contact-row">
            <MdEmail className="footer-contact-icon" />
            <span>{GMAIL}</span>
          </a>

          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="footer-contact-row">
            <MdPhone className="footer-contact-icon" />
            <span>{PHONE}</span>
          </a>
        </div>

        {/* ── Social ── */}
        <div className="footer-social-wrap">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-social">

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Hello! I'm interested in booking your services")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <p>© {COPYRIGHT_YEAR} Sri Mangalam. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;
