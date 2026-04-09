import React, { useState, useEffect, useRef } from "react";
import "../styles/Whatsappbutton.css";

/**
 * WhatsAppButton
 * Props:
 *  phoneNumber  {string}  — e.g. "919876543210"
 *  message      {string}  — pre-filled WhatsApp message
 *  footerSelector {string} — CSS selector for your footer, default "footer"
 */
function Whatsappbutton({ phoneNumber, message, footerSelector }) {
  var resolvedPhone    = phoneNumber     || "918072800880";
  var resolvedMessage  = message         || "Hello! I'm interested in booking your services.";
  var resolvedSelector = footerSelector  || "footer";

  /* bottomOffset: how far from the bottom of the viewport the button sits */
  var [bottomOffset, setBottomOffset] = useState(28);
  var rafRef = useRef(null);

  useEffect(function () {
    function updateOffset() {
      var footer = document.querySelector(resolvedSelector);
      if (!footer) {
        setBottomOffset(28);
        return;
      }

      var footerRect  = footer.getBoundingClientRect();
      var viewportH   = window.innerHeight;
      var defaultGap  = 28;

      /* How many px of the footer are visible from the bottom */
      var footerVisible = viewportH - footerRect.top;

      if (footerVisible > 0) {
        /* Push button up by however much footer is showing, plus default gap */
        setBottomOffset(footerVisible + defaultGap);
      } else {
        setBottomOffset(defaultGap);
      }
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateOffset);
    }

    updateOffset(); /* run once on mount */
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [resolvedSelector]);

  var url =
    "https://wa.me/" +
    resolvedPhone +
    "?text=" +
    encodeURIComponent(resolvedMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-btn"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: bottomOffset + "px" }}
    >
      {/* Pulse rings */}
      <span className="wa-pulse" aria-hidden="true" />
      <span className="wa-pulse wa-pulse--delay" aria-hidden="true" />

      {/* WhatsApp icon */}
      <svg
        className="wa-icon"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="16" fill="#25D366" />
        <path
          d="M23.5 8.5A10.44 10.44 0 0016 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.84.48 3.63 1.39 5.22L5.5 26.5l5.4-1.38A10.45 10.45 0 0016 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5z"
          fill="#fff"
        />
        <path
          d="M21.3 18.74c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.57-.34z"
          fill="#25D366"
        />
      </svg>

      {/* Tooltip */}
      <span className="wa-tooltip">Chat with us</span>
    </a>
  );
}

export default Whatsappbutton;