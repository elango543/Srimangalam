import React from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <section className="contact-section">

      <div className="contact-grid">

        {/* ── Left: Info Card ── */}
        <div className="contact-info">

          {/* Header Banner */}
          <div className="contact-header">
            <h2>Contact Us</h2>
          </div>

          {/* Phone + Email row */}
          <div className="contact-items">

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="#5BBDB5" stroke="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013.09 4.18 2 2 0 015.07 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <p className="contact-label">Phone Number</p>
              <p className="contact-val">
                <a href="tel:+918072800880">+91 8072800880</a>
              </p>
            </div>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="#5BBDB5" stroke="none">
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
              </div>
              <p className="contact-label">Email Id</p>
              <p className="contact-val">
                <a href="mailto:srimangalameventscatering@gmail.com">
                  srimangalameventscatering@gmail.com
                </a>
              </p>
            </div>

          </div>

          {/* Address */}
          <div className="contact-address">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" fill="#5BBDB5" stroke="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/>
              </svg>
            </div>
            <p className="contact-label">Office Address</p>
            <p className="contact-val">
             Srimangalamevents & catering services,<br/> 
            Chinnakadai street,Tiruvannamalai,606604.
            </p>
          </div>

        </div>

        {/* ── Right: Map ── */}
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.339311538231!2d79.07212077357548!3d12.22528933080398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc1003fff8103%3A0x3f6a07edae2cb96f!2sSri%20Mangalam%20Events%20%26%20Catering!5e0!3m2!1sen!2sin!4v1775722982606!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sri Mangalam Location"
            style={{ border: 0 }}
          />
        </div>

      </div>
    </section>
  );
};

export default ContactUs;