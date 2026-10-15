import { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaWhatsapp,
  FaBolt,
  FaUniversity,
  FaGraduationCap,
  FaBriefcase,
  FaCheckCircle,
  FaBell,
  FaArrowRight,
  FaCheck,
  FaFire,
  FaBuilding,
  FaUsers,
  FaSuitcase,
  FaShieldAlt,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import "./HeroSection.css";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const NOTES = [
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    iconTone: "green",
    label: "WhatsApp Alert",
    labelTone: "orange",
    heading: "Get notified on whatsapp",
    text: "You'll get all important updates on your whatsapp",
  },
  {
    id: "resume",
    icon: FaBolt,
    iconTone: "purple",
    label: "Resume Builder",
    labelTone: "purple",
    heading: "Build Your Resume",
    text: "Our resume builder gives you dynamic options to build better & faster resume that got you hired",
  },
];

const PATHS = [
  {
    id: "college",
    icon: FaUniversity,
    status: { label: "Coming Soon", available: false },
    title: "College",
    description: "Explore colleges, courses,fees, placements & more",
    features: ["Search by course, location, fees", "Connect directly with colleges", "Improve student placements"],
    cta: { label: "Join Waitlist", kind: "waitlist" },
    art: "college",
  },
  {
    id: "job",
    icon: FaGraduationCap,
    status: { label: "Available Now", available: true },
    title: "I'm Looking for a Job",
    description: "Upload your resume. We'll find jobs that fit you.",
    features: ["Jobs from 1000+ sources", "AI powered matching", "WhatsApp & email alerts"],
    cta: { label: "Explore Jobs", kind: "link" },
    art: "resume",
  },
  {
    id: "hiring",
    icon: FaBriefcase,
    status: { label: "Coming Soon", available: false },
    title: "I'm Hiring",
    description: "Connect with colleges and find candidates — from students to graduates.",
    features: ["Connect directly with colleges", "Find the right candidates", "Simplify your hiring"],
    cta: { label: "Join Waitlist", kind: "waitlist" },
    art: "code",
  },
];

const STATS = [
  { id: "students", icon: FaUsers, tone: "purple", value: 800, suffix: "+", label: "Students" },
  { id: "colleges", icon: FaBuilding, tone: "blue", value: 130, suffix: "+", label: "colleges" },
  { id: "jobs", icon: FaSuitcase, tone: "green", value: 100, suffix: "+", label: "jobs & internships" },
  { id: "trust", icon: FaShieldAlt, tone: "orange", value: 100, suffix: "%", label: "Safe & Trusted" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Counts from 0 → target once `active` becomes true */
function useCountUp(target, active, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3)))); // ease-out
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

/* ------------------------------------------------------------------ */
/* Reusable components                                                 */
/* ------------------------------------------------------------------ */

/** Primary full-width CTA. `icon` renders after the label. */
function Button({ icon: Icon, iconClass = "", className = "", children, ...props }) {
  return (
    <button type="button" className={`hx-btn ${className}`} {...props}>
      <span>{children}</span>
      {Icon && <Icon size={13} aria-hidden className={`hx-btn__icon ${iconClass}`} />}
    </button>
  );
}

/** Small floating info card (WhatsApp alert / Resume builder) */
function FloatingNote({ note, side }) {
  const { icon: Icon } = note;
  return (
    <aside className={`hx-note hx-note--${side}`}>
      <div className="hx-note__label">
        <span className={`hx-note__icon hx-note__icon--${note.iconTone}`}>
          <Icon size={12} aria-hidden />
        </span>
        <span className={`hx-note__name hx-note__name--${note.labelTone}`}>{note.label}</span>
      </div>
      <p className="hx-note__heading">{note.heading}</p>
      <p className="hx-note__text">{note.text}</p>
    </aside>
  );
}

/** Live-activity chip ("142 students matched today", "Radiant Info shortlisted…") */
function ActivityPill({ lead, title, meta, side }) {
  return (
    <div className={`hx-pill hx-pill--${side}`}>
      <div className="hx-pill__lead">{lead}</div>
      <div className="hx-pill__body">
        <p className="hx-pill__title">{title}</p>
        <p className="hx-pill__meta">{meta}</p>
      </div>
    </div>
  );
}

function FeatureItem({ children }) {
  return (
    <li className="hx-feature">
      <FaCheckCircle size={14} aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function StatusBadge({ available, children }) {
  return <span className={`hx-status${available ? " hx-status--on" : ""}`}>{children}</span>;
}

/* Decorative card artwork (inline SVG, purely visual) */
function CardArt({ kind }) {
  if (kind === "college")
    return (
      <svg className="hx-art hx-art--college" viewBox="0 0 160 110" aria-hidden>
        <path d="M80 8 L150 42 H10 Z" fill="#fde7c8" />
        <rect x="18" y="42" width="124" height="68" fill="#fdefd9" />
        <rect x="34" y="56" width="14" height="54" fill="#fbdcae" />
        <rect x="73" y="56" width="14" height="54" fill="#fbdcae" />
        <rect x="112" y="56" width="14" height="54" fill="#fbdcae" />
        <circle cx="80" cy="30" r="6" fill="#fff" opacity=".8" />
      </svg>
    );
  if (kind === "resume")
    return (
      <svg className="hx-art hx-art--resume" viewBox="0 0 110 120" aria-hidden>
        <rect x="4" y="4" width="84" height="104" rx="8" fill="#f5f3ff" stroke="#c4b5fd" />
        <rect x="14" y="18" width="52" height="5" rx="2.5" fill="#a7c957" />
        <rect x="14" y="30" width="62" height="5" rx="2.5" fill="#a7c957" />
        <rect x="14" y="42" width="44" height="5" rx="2.5" fill="#a7c957" />
        <rect x="14" y="58" width="62" height="5" rx="2.5" fill="#d8b4fe" />
        <rect x="14" y="70" width="52" height="5" rx="2.5" fill="#d8b4fe" />
        <rect x="14" y="82" width="40" height="5" rx="2.5" fill="#d8b4fe" />
        <circle cx="76" cy="88" r="17" fill="#fff" stroke="#fdba74" strokeWidth="3" />
        <circle cx="74" cy="86" r="6" fill="none" stroke="#fb923c" strokeWidth="2.5" />
        <path d="M79 91 L85 97" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg className="hx-art hx-art--code" viewBox="0 0 150 120" aria-hidden>
      <rect x="40" y="6" width="104" height="110" rx="6" fill="#dbeafe" />
      <rect x="4" y="40" width="70" height="76" rx="6" fill="#e0ecff" />
      <rect x="86" y="46" width="52" height="40" rx="8" fill="#fff" stroke="#bfdbfe" />
      <text x="112" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fb923c" fontFamily="monospace">
        {"</>"}
      </text>
    </svg>
  );
}

/** One "path" card: College / Job / Hiring */
function PathCard({ path, onCta }) {
  const { icon: Icon } = path;
  const [joined, setJoined] = useState(false);
  const isWaitlist = path.cta.kind === "waitlist";

  const handleClick = () => {
    if (isWaitlist) setJoined((j) => !j);
    onCta?.(path.id, joined);
  };

  return (
    <article className={`hx-card hx-card--${path.id}`}>
      <CardArt kind={path.art} />

      <div className="hx-card__top">
        <span className="hx-card__icon">
          <Icon size={20} aria-hidden />
        </span>
        <StatusBadge available={path.status.available}>{path.status.label}</StatusBadge>
      </div>

      <h3 className="hx-card__title">{path.title}</h3>
      <p className="hx-card__desc">{path.description}</p>

      <ul className="hx-card__features">
        {path.features.map((f) => (
          <FeatureItem key={f}>{f}</FeatureItem>
        ))}
      </ul>

      <Button
        className="hx-card__cta"
        icon={isWaitlist ? (joined ? FaCheck : FaBell) : FaArrowRight}
        iconClass={isWaitlist && !joined ? "hx-btn__icon--bell" : ""}
        aria-pressed={isWaitlist ? joined : undefined}
        onClick={handleClick}
      >
        {isWaitlist ? (joined ? "You're on the list" : path.cta.label) : path.cta.label}
      </Button>
    </article>
  );
}

/** Stat with count-up when it scrolls into view */
function StatItem({ stat }) {
  const { icon: Icon } = stat;
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = useCountUp(stat.value, seen);

  return (
    <li className="hx-stat" ref={ref}>
      <span className={`hx-stat__icon hx-stat__icon--${stat.tone}`}>
        <Icon size={22} aria-hidden />
      </span>
      <div>
        <p className="hx-stat__value">
          {count}
          {stat.suffix}
        </p>
        <p className="hx-stat__label">{stat.label}</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function HeroSection({ onCta }) {
  return (
    <section className="hx" aria-labelledby="hx-heading">
      <div className="hx__blob hx__blob--a" aria-hidden />
      <div className="hx__blob hx__blob--b" aria-hidden />

      <div className="hx__inner">
        <div className="hx__notes">
          <FloatingNote note={NOTES[0]} side="left" />
          <FloatingNote note={NOTES[1]} side="right" />
        </div>

        <header className="hx__head">
          <span className="hx-assistant">
            <span className="hx-assistant__icon">
              <FaRobot size={13} aria-hidden />
            </span>
            AI-Powered Campus Assistant
          </span>
          <h1 id="hx-heading" className="hx__title">
            Connect <span className="hx__title-accent">10X Faster.</span>
          </h1>
          <p className="hx__sub">One platform connecting students, colleges &amp; employers — faster.</p>
        </header>

        <div className="hx__ask">
          <ActivityPill
            side="left"
            lead={
              <span className="hx-avatars" aria-hidden>
                <i style={{ background: "#6366f1" }}>AK</i>
                <i style={{ background: "#3b82f6" }}>PK</i>
                <i style={{ background: "#14b8a6" }}>SN</i>
              </span>
            }
            title={
              <>
                <span className="hx-live" aria-hidden /> <FaFire size={11} className="hx-flame" aria-hidden /> 142 students
                matched today
              </>
            }
            meta="Just now • IIT, BITS, VIT"
          />

          <h2 className="hx__question">
            <IoSparkles size={14} aria-hidden className="hx-spark" />
            What are you looking for?
            <IoSparkles size={14} aria-hidden className="hx-spark hx-spark--b" />
          </h2>

          <ActivityPill
            side="right"
            lead={
              <span className="hx-pill__badge" aria-hidden>
                <FaBuilding size={12} />
              </span>
            }
            title={
              <>
                <strong>Radiant Info</strong> shortlisted 8 interns
              </>
            }
            meta={
              <>
                <span className="hx-live" aria-hidden /> Verified recruiter • 2 days ago
              </>
            }
          />
        </div>

        <div className="hx__cards">
          {PATHS.map((p) => (
            <PathCard key={p.id} path={p} onCta={onCta} />
          ))}
        </div>

        <ul className="hx__stats">
          {STATS.map((s) => (
            <StatItem key={s.id} stat={s} />
          ))}
        </ul>
      </div>
    </section>
  );
}
