import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdMailOutline, MdPhone } from "react-icons/md";
import "./Footer.css";

const LOGO_SRC = `${process.env.PUBLIC_URL}/images/company_logo.png`;
const linkGroups = [
  {
    title: "For Students",
    links: [
      { label: "Explore Colleges", href: "/colleges" },
      { label: "Find Opportunities", href: "/opportunities" },
      { label: "Internships", href: "/internships" },
      { label: "Full-time Jobs", href: "/jobs" },
      { label: "Part-time & Gigs", href: "/gigs" },
      { label: "Application Tracker", href: "/tracker" },
    ],
  },
  {
    title: "For Colleges",
    links: [
      { label: "List Your College", href: "/list-college" },
      { label: "Admissions", href: "/admissions" },
      { label: "Fee Collection", href: "/fee-collection" },
      { label: "Placements", href: "/placements" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Find Talent", href: "/find-talent" },
      { label: "Campus Hiring", href: "/campus-hiring" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blogs", href: "/blogs" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund & Cancellation Policy", href: "/refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Grievance Redressal", href: "/grievance" },
      { label: "Job & Internship Disclaimer", href: "/disclaimer" },
    ],
    extra: { label: "View all policies →", href: "/policies" },
  },
];

const socials = [
  { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "X", href: "#", Icon: FaXTwitter },
  { label: "Facebook", href: "#", Icon: FaFacebookF },
  { label: "WhatsApp", href: "#", Icon: FaWhatsapp },
  { label: "YouTube", href: "#", Icon: FaYoutube },
];

const Footer = () => {
  return (
    <footer className="cp-footer">
      <div
        className="cp-footer__glow cp-footer__glow--left"
        aria-hidden="true"
      />
      <div
        className="cp-footer__glow cp-footer__glow--right"
        aria-hidden="true"
      />

      <div className="cp-footer__container">
        {/* CTA card */}
        <section className="cp-footer__cta" aria-labelledby="cp-cta-title">
          <div className="cp-footer__cta-content">
            <h3 id="cp-cta-title" className="cp-footer__cta-title">
              Ready for what’s next?
            </h3>
            <p className="cp-footer__cta-text">
              Discover colleges, find opportunities, list your institution, or
              start hiring with CampusPe.
            </p>
          </div>

          <div className="cp-footer__cta-actions">
            <a
              href="/colleges"
              className="cp-footer__cta-btn cp-footer__cta-btn--primary"
            >
              Explore Colleges <span aria-hidden="true">→</span>
            </a>
            <a
              href="/opportunities"
              className="cp-footer__cta-btn cp-footer__cta-btn--primary"
            >
              Find Opportunities <span aria-hidden="true">→</span>
            </a>
            <a
              href="/list-college"
              className="cp-footer__cta-btn cp-footer__cta-btn--outline"
            >
              List Your College <span aria-hidden="true">→</span>
            </a>
            <a
              href="/post-job"
              className="cp-footer__cta-btn cp-footer__cta-btn--outline"
            >
              Post a Job <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        {/* Brand */}
        <div className="cp-footer__brand">
          <a
            href="/"
            className="cp-footer__logo-link"
            aria-label="CampusPe home"
          >
            <img src={LOGO_SRC} alt="CampusPe" className="cp-footer__logo" />
          </a>
          <p className="cp-footer__tagline">
            From choosing a college to finding your next opportunity. CampusPe
            connects students, colleges and employers in one place.
          </p>
        </div>

        {/* Link sections (stacked vertically on mobile) */}
        <nav className="cp-footer__links" aria-label="Footer">
          {linkGroups.map((group) => (
            <div className="cp-footer__group" key={group.title}>
              <h4 className="cp-footer__title">{group.title}</h4>
              <ul className="cp-footer__list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="cp-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
                {group.extra && (
                  <li>
                    <a
                      href={group.extra.href}
                      className="cp-footer__link cp-footer__link--accent"
                    >
                      {group.extra.label}
                    </a>
                  </li>
                )}
              </ul>
              {group.extra && (
                <p className="cp-footer__note">
                  Separate user, institution and employer terms can live inside
                  the full Policies page.
                </p>
              )}
            </div>
          ))}
        </nav>

        {/* Contact + socials */}
        <div className="cp-footer__contact">
          <div className="cp-footer__contact-items">
            <a
              href="mailto:contactus@campuspe.com"
              className="cp-footer__contact-item"
            >
              <MdMailOutline aria-hidden="true" />
              <span>contactus@campuspe.com</span>
            </a>
            <a href="tel:+916362606464" className="cp-footer__contact-item">
              <MdPhone aria-hidden="true" />
              <span>+91 6362606464</span>
            </a>
          </div>
          <p className="cp-footer__audience">Students · Colleges · Employers</p>
        </div>

        {/* Bottom bar */}
        <div className="cp-footer__bottom">
          <p className="cp-footer__copy">
            © 2026 CampusPe Technologies Pvt. Ltd.{" "}
            <a href="/privacy-policy">Privacy</a> <a href="/terms">Terms</a>{" "}
            <a href="/grievance">Grievance</a>
          </p>
          <ul className="cp-footer__socials">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="cp-footer__social"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
