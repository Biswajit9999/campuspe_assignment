import "./PartnersMarquee.css";

/* ------------------------------------------------------------------ */
/* Data — drop your logo files in ./assets and import them here.       */
/*   import ginserv from "./assets/ginserv.png";                       */
/* Any item without `src` falls back to a text wordmark so the         */
/* carousel still renders while you add the real images.               */
/* ------------------------------------------------------------------ */

const PARTNERS = [
  { name: "Ginserv", src: "/images/ginserv.png" },
  { name: "Startup Karnataka", src: "/images/startup_karnataka.png" }, // ← finish this filename
  { name: "Visvesvaraya Technological University", src: "/images/belgium.png" },        // ← add the path when you have the file
  { name: "TalentSpotify", src: "/images/talent_spotify-removebg-preview.png" },    // ← finish this filename
  { name: "Radiant Info", src: "/images/radient_info.jpg" },
  { name: "DPIIT #startupindia", src: "/images/DPIIT.png" },
];

/* ------------------------------------------------------------------ */
/* Reusable components                                                 */
/* ------------------------------------------------------------------ */

/** One logo (image, or text fallback). Renders as a link when `href` is set. */
function LogoItem({ partner, decorative = false }) {
  const { name, src, href } = partner;
  const content = src ? (
    <img className="pm-logo__img" src={src} alt={decorative ? "" : name} loading="lazy" draggable="false" />
  ) : (
    <span className="pm-logo__wordmark">{name}</span>
  );

  const Tag = href ? "a" : "div";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer", tabIndex: decorative ? -1 : 0, "aria-label": name }
    : {};

  return (
    <li className="pm-logo">
      <Tag className="pm-logo__inner" {...linkProps}>
        {content}
      </Tag>
    </li>
  );
}

/**
 * Infinite, seamless marquee.
 * - The list is rendered twice; the track slides exactly -50% then loops.
 * - The 2nd copy is aria-hidden so screen readers only read logos once.
 * - `reverse` flips direction, `speed` is seconds per full loop (higher = slower).
 */
export function LogoMarquee({ logos, speed = 30, reverse = false, label = "Our partners" }) {
  return (
    <div
      className="pm__viewport"
      role="region"
      aria-label={label}
      style={{ "--pm-duration": `${speed}s` }}
    >
      <div className={`pm__track${reverse ? " pm__track--reverse" : ""}`}>
        <ul className="pm__list">
          {logos.map((p) => (
            <LogoItem key={p.name} partner={p} />
          ))}
        </ul>
        <ul className="pm__list" aria-hidden="true">
          {logos.map((p) => (
            <LogoItem key={`${p.name}-copy`} partner={p} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — default export                                            */
/* ------------------------------------------------------------------ */

export default function PartnersMarquee({ title = "Trusted by partners across India", logos = PARTNERS, speed = 30 }) {
  return (
    <section className="pm" aria-labelledby="pm-title">
      <h2 id="pm-title" className="pm__title">
        {title}
      </h2>
      <LogoMarquee logos={logos} speed={speed} />
    </section>
  );
}
