import React from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiLink2,
  FiMessageSquare,
  FiStar,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import "./FeatureSection.css";

/* ==========================================================
   1) FeatureTag  — tiny pill used inside a card (internal helper)
   variants: green | outline | soft | dark | purple | neutral | red | solid
   dot:      "green" | "red"  (optional coloured dot before the label)
   icon:     any react-icons component (optional)
   ========================================================== */
const FeatureTag = ({ label, variant = "neutral", dot, icon: Icon }) => (
  <span className={`cp-feature-tag cp-feature-tag--${variant}`}>
    {dot && <span className={`cp-feature-tag__dot cp-feature-tag__dot--${dot}`} aria-hidden="true" />}
    {Icon && <Icon className="cp-feature-tag__icon" aria-hidden="true" />}
    {label}
  </span>
);

/* ==========================================================
   2) FeatureCard — the short repeating part
   props: number, title, description, tags[], note
          label  -> small caps label above the title (number sits beside it)
          badge  -> small chip next to the title (number becomes a box on the left)
   ========================================================== */
export const FeatureCard = ({ number, label, badge, title, description, tags = [], note }) => {
  const hasLabel = Boolean(label);

  return (
    <article className={`cp-feature-card${hasLabel ? "" : " cp-feature-card--numbered"}`}>
      <div className="cp-feature-card__main">
        {!hasLabel && (
          <span className="cp-feature-card__number cp-feature-card__number--box">{number}</span>
        )}

        <div className="cp-feature-card__body">
          {hasLabel && (
            <div className="cp-feature-card__meta">
              <span className="cp-feature-card__number">{number}</span>
              <span className="cp-feature-card__label">{label}</span>
            </div>
          )}

          <div className="cp-feature-card__heading">
            <h3 className="cp-feature-card__title">{title}</h3>
            {badge && <span className="cp-feature-card__badge">{badge}</span>}
          </div>

          <p className="cp-feature-card__text">{description}</p>
        </div>
      </div>

      {(tags.length > 0 || note) && (
        <div className="cp-feature-card__aside">
          {tags.map((tag) => (
            <FeatureTag key={tag.label} {...tag} />
          ))}
          {note && <span className="cp-feature-card__note">{note}</span>}
        </div>
      )}
    </article>
  );
};

/* ==========================================================
   3) FeatureSection — the whole reusable section
   props:
     id             optional anchor id
     eyebrow        "02 • FOR COLLEGES"
     title          "Get Discovered by"
     highlight      "Students and Recruiters."   (shown in blue)
     highlightBreak true -> blue text starts on a new line
     description    paragraph under the heading
     ctaLabel       "List Your College"
     ctaHref        "/list-college"
     items          array of FeatureCard props
   ========================================================== */
const FeatureSection = ({
  id,
  eyebrow,
  title,
  highlight,
  highlightBreak = false,
  description,
  ctaLabel,
  ctaHref = "#",
  items = [],
}) => (
  <section className="cp-feature" id={id}>
    <div className="cp-feature__container">
      {/* heading block */}
      <div className="cp-feature__intro">
        {eyebrow && (
          <span className="cp-feature__eyebrow">
            <span className="cp-feature__eyebrow-dot" aria-hidden="true" />
            {eyebrow}
          </span>
        )}

        <h2 className="cp-feature__title">
          {title}{" "}
          {highlight && (
            <>
              {highlightBreak && <br />}
              <span className="cp-feature__highlight">{highlight}</span>
            </>
          )}
        </h2>

        {description && <p className="cp-feature__text">{description}</p>}

        {ctaLabel && (
          <a href={ctaHref} className="cp-feature__cta">
            {ctaLabel}
            <FiArrowRight aria-hidden="true" />
          </a>
        )}
      </div>

      {/* repeating cards */}
      <div className="cp-feature__list">
        {items.map((item) => (
          <FeatureCard key={item.number} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default FeatureSection;

/* ==========================================================
   Data — one object per section (same shape for every section)
   ========================================================== */
export const collegeSectionData = {
  id: "for-colleges",
  eyebrow: "02 • FOR COLLEGES",
  title: "Get Discovered by",
  highlight: "Students and Recruiters.",
  description:
    "Put your college in front of students searching for the right course and recruiters looking for the right talent. CampusPe helps you build your presence, attract enquiries and connect with opportunities.",
  ctaLabel: "List Your College",
  ctaHref: "/list-college",
  items: [
    {
      number: "01",
      label: "VERIFIED PROFILE",
      title: "Build your college profile",
      description:
        "Showcase your college, courses, fees, campus, placements and achievements in one structured profile that students and recruiters can discover.",
      tags: [
        { label: "NAAC A++ Ready", variant: "green", icon: FiCheckCircle },
        { label: "98% Match", variant: "outline" },
      ],
    },
    {
      number: "02",
      label: "DIRECT ENROLL",
      title: "Students discover and connect",
      description:
        "Students searching for colleges can discover your profile, explore your courses and fees, and connect directly with your admission team.",
      tags: [
        { label: "Direct Enquiries", variant: "soft", icon: FiMessageSquare },
        { label: "WHATSAPP / CHAT", variant: "dark", dot: "green" },
      ],
      note: "Avg. response: <15 min",
    },
    {
      number: "03",
      label: "CAMPUS RECRUITING",
      title: "Recruiters discover your College",
      description:
        "Companies hiring fresh talent can discover your college, explore your talent and connect with your placement team.",
      tags: [
        { label: "500+ Hiring Partners", variant: "purple", icon: FiUsers },
        { label: "Connect Directly", variant: "neutral", icon: FiLink2 },
      ],
    },
    {
      number: "04",
      label: "LIVE HUB",
      title: "Track placements in real time",
      description:
        "Track students, interviews, offers and placements from one centralized dashboard.",
      tags: [
        { label: "LIVE PLACEMENTS", variant: "red", dot: "red" },
        { label: "Students · Interviews · Offers", variant: "solid" },
      ],
    },
  ],
};

export const employerSectionData = {
  id: "for-employers",
  eyebrow: "03 • FOR EMPLOYERS",
  title: "Stop running campus drives.",
  highlight: "Start hiring the right people.",
  highlightBreak: true,
  description:
    "Post a role in minutes and reach relevant candidates without the time, travel and coordination of traditional hiring. CampusPe helps you discover, match and connect with talent from colleges and beyond.",
  ctaLabel: "Post a Job",
  ctaHref: "/post-job",
  items: [
    {
      number: "01",
      badge: "Instant setup",
      title: "Post a role in minutes",
      description:
        "Define your skills, location and hiring requirements. Reach relevant candidates across the CampusPe network.",
      tags: [
        { label: "5 Min Deployment", variant: "green", icon: FiZap },
        { label: "500+ Campus Network", variant: "neutral" },
      ],
    },
    {
      number: "02",
      badge: "Instant setup",
      title: "Receive a matched shortlist",
      description:
        "Get candidates matched to your role by skills, experience, location and hiring requirements.",
      tags: [
        { label: "Zero CV Clutter", variant: "purple", icon: FiStar },
        { label: "Tier 1–Tier 3 Parity", variant: "neutral" },
      ],
    },
    {
      number: "03",
      badge: "Instant setup",
      title: "Connect with candidates directly",
      description:
        "Message, schedule interviews, and move candidates through your pipeline — all in one place.",
      tags: [
        { label: "In-App Scheduling", variant: "soft", icon: FiCalendar },
        { label: "1-Click Video / Chat", variant: "neutral" },
      ],
    },
    {
      number: "04",
      badge: "Instant setup",
      title: "Reduce your time-to-hire",
      description:
        "Find matched candidates, connect with them and move from shortlist to offer in one streamlined workflow.",
      tags: [
        { label: "<2 DAYS", variant: "solid" },
        { label: "57% Faster Hiring", variant: "green" },
      ],
    },
  ],
};

/* ==========================================================
   4) FeatureSections — the whole page part: colleges + employers
   Use:  import { FeatureSections } from "./component/feature-section/FeatureSection";
         <FeatureSections />
   ========================================================== */
export const FeatureSections = () => (
  <>
    <FeatureSection {...collegeSectionData} />
    <FeatureSection {...employerSectionData} />
  </>
);
