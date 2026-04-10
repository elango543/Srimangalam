import React, { useState, useEffect, useCallback } from "react";
import emailjs from "emailjs-com";
import "../styles/BookModal.css";
import smlogo from "../assets/smlogo.png"

const COUNTRY_CODES = [
  { code: "+91",  flag: "🇮🇳" },
  { code: "+1",   flag: "🇺🇸" },
  { code: "+44",  flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+65",  flag: "🇸🇬" },
  { code: "+61",  flag: "🇦🇺" },
  { code: "+60",  flag: "🇲🇾" },
];

const ALL_SERVICES = [
  "Decorations",
  "Photography",
  "Entertainments & Add-ons",
  "Catering",
];

// ── Replace with your EmailJS dashboard values ──
var EMAILJS_SERVICE_ID  = "service_s24rfmk";
var EMAILJS_TEMPLATE_ID = "template_sidohtq";
var EMAILJS_PUBLIC_KEY  = "3hIL1NSYJaLFf9fkU";

/* ═══════════════════════════════════════════
   Toast Component
═══════════════════════════════════════════ */
function Toast({ message, type, onDone }) {
  useEffect(function () {
    var timer = setTimeout(onDone, 3500);
    return function () { clearTimeout(timer); };
  }, [onDone]);

  return (
    <div className={"bm-toast bm-toast--" + type}>
      <span className="bm-toast-icon">
        {type === "success" ? "✓" : "✕"}
      </span>
      <span className="bm-toast-msg">{message}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BookModal Component
═══════════════════════════════════════════ */
function BookModal({ isOpen, onClose, serviceLabel }) {
  var resolvedLabel = serviceLabel || "";

  var [fullName,    setFullName]    = useState("");
  var [countryCode, setCountryCode] = useState("+91");
  var [phone,       setPhone]       = useState("");
  var [services,    setServices]    = useState([]);
  var [error,       setError]       = useState("");
  var [sending,     setSending]     = useState(false);

  /* Toast state — lives OUTSIDE modal so it survives after modal closes */
  var [toast, setToast] = useState(null); // { message, type }

  /* Pre-tick checkbox when opened from a service section */
  useEffect(function () {
    if (isOpen && resolvedLabel !== "") {
      setServices([resolvedLabel]);
    } else if (!isOpen) {
      setServices([]);
    }
  }, [isOpen, resolvedLabel]);

  /* Lock body scroll */
  useEffect(function () {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) {
      setFullName("");
      setPhone("");
      setError("");
      setSending(false);
      setCountryCode("+91");
    }
    return function () { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Escape key */
  var handleKey = useCallback(
    function handleKeyDown(e) { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(function () {
    if (isOpen) window.addEventListener("keydown", handleKey);
    return function () { window.removeEventListener("keydown", handleKey); };
  }, [isOpen, handleKey]);

  function toggleService(name) {
    setServices(function (prev) {
      return prev.includes(name)
        ? prev.filter(function (s) { return s !== name; })
        : prev.concat(name);
    });
    setError("");
  }

  function handleSend() {
    if (!fullName.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    if (services.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    setError("");
    setSending(true);

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        full_name : fullName.trim(),
        phone     : countryCode + " " + phone.trim(),
        services  : services.join(", "),
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(function () {
      setSending(false);
      onClose(); // close modal immediately
      setToast({ message: "Email sent successfully! We'll be in touch soon.", type: "success" });
    })
    .catch(function () {
      setSending(false);
      setToast({ message: "Failed to send. Please try again.", type: "error" });
    });
  }

  return (
    <>
      {/* ── Toast — always rendered, outside modal ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={function () { setToast(null); }}
        />
      )}

      {/* ── Modal ── */}
      {isOpen && (
        <div
          className="bm-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Booking modal"
        >
          <div className="bm-card" onClick={function (e) { e.stopPropagation(); }}>

            <span className="bm-accent bm-accent--tl" aria-hidden="true" />
            <span className="bm-accent bm-accent--br" aria-hidden="true" />

            {/* Close */}
            <button className="bm-close" onClick={onClose} aria-label="Close modal">✕</button>

            {/* Logo */}
            <div className="bm-logo-row">
              <img src={smlogo} alt="Sri Mangalam logo" className="bm-logo-img" />
              <div className="bm-logo-text">
                <span className="bm-brand">SRI MANGALAM</span>
                <span className="bm-tagline">Crafting Moments, Creating Memories.</span>
              </div>
            </div>

            <div className="bm-divider" aria-hidden="true" />

            {/* Headline */}
            <div className="bm-headline">
              <p className="bm-eyebrow">Let's make it happen</p>
              <h2 className="bm-title">Book With Us</h2>
            </div>

            {/* Form */}
            <div className="bm-form">

              {/* Full Name */}
              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-fullname">Full Name</label>
                <input
                  id="bm-fullname"
                  className="bm-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={function (e) { setFullName(e.target.value); setError(""); }}
                  autoComplete="name"
                  autoFocus
                />
              </div>

              {/* Mobile No. */}
              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-phone">Mobile No.</label>
                <div className="bm-phone-row">
                  <select
                    className="bm-select"
                    value={countryCode}
                    onChange={function (e) { setCountryCode(e.target.value); }}
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map(function (c, i) {
                      return (
                        <option key={i} value={c.code}>{c.flag} {c.code}</option>
                      );
                    })}
                  </select>
                  <input
                    id="bm-phone"
                    className="bm-input bm-phone-input"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={function (e) { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }}
                    maxLength={10}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Services */}
              <div className="bm-field">
                <label className="bm-label">Which Service Do You Need?</label>
                <div className="bm-services-grid">
                  {ALL_SERVICES.map(function (svc) {
                    var checked = services.includes(svc);
                    return (
                      <label
                        key={svc}
                        className={"bm-service-item" + (checked ? " bm-service-item--checked" : "")}
                      >
                        <input
                          type="checkbox"
                          className="bm-checkbox"
                          checked={checked}
                          onChange={function () { toggleService(svc); }}
                        />
                        <span className="bm-checkmark" aria-hidden="true">
                          {checked ? "✓" : ""}
                        </span>
                        <span className="bm-service-name">{svc}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Inline validation error */}
              {error !== "" && (
                <p className="bm-error" role="alert">{error}</p>
              )}

              {/* Send button */}
              <button
                className="bm-submit"
                onClick={handleSend}
                type="button"
                disabled={sending}
              >
                {sending ? (
                  <span className="bm-spinner" aria-label="Sending..." />
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Mail
                  </>
                )}
              </button>

            </div>

            <p className="bm-footnote">Your details will be sent directly to our team.</p>

          </div>
        </div>
      )}
    </>
  );
}

export default BookModal;