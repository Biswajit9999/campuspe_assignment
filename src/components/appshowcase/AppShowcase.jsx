import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import "./AppShowcase.css";

// Carousel screenshots + iPhone mockup live in this same folder.
// Rename the imports if your files are called something else.
// Images are served from public/images, so use URL paths (no import needed)
const screen1 = "/images/iphone1.png";
const screen2 = "/images/iphone2.png";
const screen3 = "/images/iphone3.png";
const screen4 = "/images/iphone4.png";
const screen5 = "/images/iphone5.png";
const iphoneMockup = "/images/ui_image.png";

const slides = [
  { src: screen1, alt: "CampusPe jobs home screen" },
  { src: screen2, alt: "CampusPe post a job screen" },
  { src: screen3, alt: "CampusPe discover colleges screen" },
  { src: screen4, alt: "CampusPe my applications screen" },
  { src: screen5, alt: "CampusPe college profile screen" },
];

const AUTOPLAY_MS = 3500;
const SWIPE_THRESHOLD = 40;

const AppShowcase = () => {
  const total = slides.length;
  const half = Math.floor(total / 2);

  const [active, setActive] = useState(half); // start on the middle slide
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (index) => setActive(((index % total) + total) % total),
    [total]
  );

  // Autoplay (skipped when paused or reduced motion is requested)
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setInterval(() => setActive((p) => (p + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  // Swipe support
  const handleTouchStart = (e) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        goTo(diff < 0 ? active + 1 : active - 1);
      }
    }
    touchStartX.current = null;
    setPaused(false);
  };

  // -half ... 0 ... +half, wrapped around the circle
  const getPosition = (index) =>
    ((index - active + total + half) % total) - half;

  return (
    <section className="cp-app" aria-labelledby="cp-app-title">
      {/* ---------- Interface carousel ---------- */}
      <div className="cp-app__container">
        <header className="cp-app__header">
          <h2 id="cp-app-title" className="cp-app__title">
            Checkout Our App Interface Look
          </h2>
          <p className="cp-app__text">
            Experience the power of a unified campus ecosystem right in your
            pocket. <strong>CampusPe</strong> offers a tailored interface for
            every user: students can explore trending courses, colleges can
            showcase their campus life, and companies can post job vacancies
            directly to a pool of qualified candidates.
          </p>
        </header>

        <div
          className="cp-app__stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="CampusPe app screens"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => {
            const pos = getPosition(index);
            return (
              <button
                type="button"
                key={slide.alt}
                className="cp-app__slide"
                data-pos={pos}
                onClick={() => goTo(index)}
                aria-label={`Show screen ${index + 1} of ${total}`}
                aria-current={pos === 0 ? "true" : undefined}
                tabIndex={Math.abs(pos) > 1 ? -1 : 0}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="cp-app__slide-img"
                  draggable="false"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>

        <div className="cp-app__dots" role="tablist" aria-label="Choose a screen">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.alt}
              role="tab"
              aria-selected={index === active}
              aria-label={`Go to screen ${index + 1}`}
              className={`cp-app__dot${index === active ? " is-active" : ""}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      {/* ---------- Download app ---------- */}
      <div className="cp-app__container cp-app__download">
        <div className="cp-app__download-copy">
          <h2 className="cp-app__download-title">Download App Now</h2>
          <p className="cp-app__download-text">
            Elevate your academic journey with Campuspe, the all-in-one digital
            ecosystem designed to bridge the gap between education and
            industry. Whether you’re a student seeking your next big
            internship, a college looking to empower your cohort, or a company
            scouting for top-tier talent, Campuspe streamlines the
            connection. Your career doesn’t start at graduation—it starts
            here.
          </p>

          <div className="cp-app__stores">
            <a
              href="https://play.google.com/store"
              className="cp-app__store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <FaGooglePlay className="cp-app__store-icon" aria-hidden="true" />
              <span className="cp-app__store-label">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </a>

            <a
              href="https://www.apple.com/app-store/"
              className="cp-app__store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <FaApple className="cp-app__store-icon" aria-hidden="true" />
              <span className="cp-app__store-label">
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
          </div>
        </div>

        <div className="cp-app__download-visual">
          <img
            src={iphoneMockup}
            alt="CampusPe app shown on two iPhones"
            className="cp-app__iphone"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
