import { useState } from "react";
import {
  FaBolt,
  FaArrowRight,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaHome,
  FaWallet,
} from "react-icons/fa";
// import annotationLabel from "./assets/annotation-label.png";
import "./OpportunityDiscovery.css";
const annotationLabel = `${process.env.PUBLIC_URL}/images/Annotation.png`;
/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Set your preferences",
    text: "Tell us what you're looking for, from colleges and courses to jobs, internships and gigs.",
    tag: { label: "Smart Profile", tone: "purple" },
  },
  {
    title: "Discover relevant opportunities",
    text: "Explore colleges and career opportunities matched to your profile, interests and goals",
    tag: { label: "AI Ranked", tone: "gray" },
  },
  {
    title: "Get notified when something fits",
    text: "Get notified when a relevant college or new opportunity is found, so you can act early.",
    tag: { label: "Instant Alerts", tone: "green" },
  },
];

const FILTERS = ["All", "Colleges", "Jobs", "Internships", "Freelance", "Part-time"];

const ITEMS = [
  {
    id: "iim",
    logo: <span className="od-logo od-logo--iim">IIM</span>,
    title: "IIM Bangalore",
    badge: { label: "Top College", tone: "purple" },
    meta: [
      { icon: FaGraduationCap, text: "MBA" },
      { icon: FaMapMarkerAlt, text: "Bengaluru" },
      { icon: FaWallet, text: "₹ 3L+" },
    ],
    description: "India's premier management institute with global exposer...",
    action: "View Details",
    type: "Colleges",
  },
  {
    id: "product-intern",
    logo: <span className="od-logo od-logo--google">G</span>,
    title: "Product Intern",
    badge: { label: "Internship", tone: "blue" },
    meta: [
      { icon: FaMapMarkerAlt, text: "Bengaluru" },
      { icon: FaBriefcase, text: "Hybrid" },
      { icon: FaWallet, text: "₹ 35K/mo" },
    ],
    description: "Work on real products, learn from top engineers and build...",
    action: "Apply Now",
    type: "Internships",
  },
  {
    id: "marketing-gig",
    logo: <span className="od-logo od-logo--notion">N</span>,
    title: "Marketing Gig",
    badge: { label: "Freelance", tone: "green" },
    meta: [
      { icon: FaHome, text: "Remote" },
      { icon: FaBriefcase, text: "Freelance" },
      { icon: FaWallet, text: "₹ 10K - ₹ 25K" },
    ],
    description: "Create content and help with social media campaigns for...",
    action: "View Details",
    type: "Freelance",
  },
];

/* ------------------------------------------------------------------ */
/* Reusable components                                                 */
/* ------------------------------------------------------------------ */

/** Small tinted label. tone: purple | blue | green | gray */
function Badge({ tone = "gray", outlined = false, className = "", children }) {
  return (
    <span
      className={`od-badge od-badge--${tone}${outlined ? " od-badge--outlined" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

/** Pill-shaped primary button, optional trailing arrow */
function PrimaryButton({ arrow = false, className = "", children, ...props }) {
  return (
    <button type="button" className={`od-btn ${className}`} {...props}>
      {children}
      {arrow && <FaArrowRight size={16} aria-hidden />}
    </button>
  );
}

/** Small button used inside feed rows */
function RowButton({ className = "", children, ...props }) {
  return (
    <button type="button" className={`od-row-btn ${className}`} {...props}>
      {children}
    </button>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`od-chip${active ? " od-chip--active" : ""}`}
    >
      {children}
    </button>
  );
}

function StepCard({ index, title, text, tag }) {
  return (
    <li className="od-step">
      <span className="od-step__num">{String(index + 1).padStart(2, "0")}</span>
      <div className="od-step__body">
        <div className="od-step__head">
          <h3 className="od-step__title">{title}</h3>
          <Badge tone={tag.tone}>{tag.label}</Badge>
        </div>
        <p className="od-step__text">{text}</p>
      </div>
    </li>
  );
}

function FeedItem({ item }) {
  return (
    <li className="od-item">
      <div className="od-item__top">
        <div className="od-item__logo">{item.logo}</div>

        <div className="od-item__info">
          <div className="od-item__title-row">
            <h4 className="od-item__title">{item.title}</h4>
            <Badge tone={item.badge.tone}>{item.badge.label}</Badge>
          </div>
          <ul className="od-item__meta">
            {item.meta.map(({ icon: Icon, text }) => (
              <li key={text}>
                <Icon size={12} aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Shown beside the title from 640px up */}
        <RowButton className="od-item__btn--inline">{item.action}</RowButton>
      </div>

      <p className="od-item__desc">{item.description}</p>

      {/* Full-width under the text on mobile */}
      <RowButton className="od-item__btn--block">{item.action}</RowButton>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Opportunity feed card — NAMED export only (not default)             */
/* ------------------------------------------------------------------ */

export function OpportunityFeed({ className = "" }) {
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? ITEMS : ITEMS.filter((i) => i.type === filter);

  return (
    <div className={`od-feed ${className}`}>
      <header className="od-feed__header">
        <div className="od-feed__brand">
          <span className="od-feed__icon">
            <FaBolt size={16} aria-hidden />
          </span>
          <div>
            <h3 className="od-feed__title">CampusPe Opportunity Feed</h3>
            <p className="od-feed__sub">Colleges &amp; opportunities matched to you</p>
          </div>
        </div>
        <Badge tone="green" outlined>
          <span className="od-dot od-dot--green" aria-hidden />
          12 new matches today
        </Badge>
      </header>

      <div className="od-chips" role="group" aria-label="Filter opportunities">
        {FILTERS.map((f) => (
          <FilterChip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </FilterChip>
        ))}
      </div>

      <ul className="od-feed__list">
        {items.map((item) => (
          <FeedItem key={item.id} item={item} />
        ))}
      </ul>

      <footer className="od-feed__footer">
        <a href="/" className="od-feed__link">
          View all matched opportunities <FaArrowRight size={14} aria-hidden />
        </a>
        <span className="od-feed__updated">Curated for you • Updated daily</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — default export                                            */
/* ------------------------------------------------------------------ */

export default function OpportunityDiscovery() {
  return (
    <section className="od" aria-labelledby="od-heading">
      <div className="od__inner">
        <div className="od__content">
          <Badge tone="blue" outlined className="od-eyebrow">
            <span className="od-dot od-dot--blue" aria-hidden />
            01 • Opportunity Discovery
          </Badge>

          <h2 id="od-heading" className="od__heading">
            Stop searching.
            <br />
            <span className="od__heading-accent">Start getting matched.</span>
          </h2>

          <p className="od__lead">
            Tell CampusPe your skills, preferences and goals. We continuously monitor company
            career pages and job sources, find opportunities that match you, and notify you when
            they appear.
          </p>

          <ol className="od__steps">
            {STEPS.map((step, i) => (
              <StepCard key={step.title} index={i} {...step} />
            ))}
          </ol>

          <PrimaryButton arrow className="od__cta">
            Explore opportunities
          </PrimaryButton>
        </div>

        <div className="od__visual">
          <OpportunityFeed />
          <img
            className="od__annotation"
            src={annotationLabel}
            alt="A mix of colleges, jobs, internships and gigs — all in one place."
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}