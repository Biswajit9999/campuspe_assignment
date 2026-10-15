import React from "react";
import { FiArrowUpRight, FiPhoneCall } from "react-icons/fi";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="cp-folder" aria-labelledby="cp-folder-title">
      <div className="cp-folder__card">
        {/* decorative gradient glows */}
        <span className="cp-folder__glow cp-folder__glow--left" aria-hidden="true" />
        <span className="cp-folder__glow cp-folder__glow--right" aria-hidden="true" />

        <div className="cp-folder__content">
          <h2 id="cp-folder-title" className="cp-folder__title">
            Still have questions?
          </h2>
          <p className="cp-folder__text">
            Our support team is here to help you succeed. Get in touch anytime.
          </p>

          <div className="cp-folder__actions">
            <a href="/contact" className="cp-folder__btn cp-folder__btn--primary">
              <span>Contact Support</span>
              <span className="cp-folder__icon cp-folder__icon--light" aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </a>

            <a href="/schedule-call" className="cp-folder__btn cp-folder__btn--outline">
              <span>Schedule a Call</span>
              <span className="cp-folder__icon cp-folder__icon--solid" aria-hidden="true">
                <FiPhoneCall />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;