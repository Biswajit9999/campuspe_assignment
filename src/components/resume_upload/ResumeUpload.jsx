import React, { useRef, useState } from "react";
import {
  FiArrowUp,
  FiCheck,
  FiFileText,
  FiX,
  FiZap,
} from "react-icons/fi";
import "./ResumeUpload.css";

/* ==========================================================
   1) UploadCard — reusable drag & drop / browse upload box
   (named export, NOT default)
   props:
     title, description, buttonLabel, hint
     formats    ["PDF","DOC","DOCX"]  -> shown as chips + used as accept list
     maxSizeMB  10
     onFileSelect(file)  called with a valid File
   ========================================================== */
export const UploadCard = ({
  title = "Upload your resume",
  description = "PDF, DOC, or DOCX · Up to 10MB · We’ll use it to understand your skills and experience.",
  buttonLabel = "Upload resume",
  hint = "or drag and drop your file here",
  formats = ["PDF", "DOC", "DOCX"],
  maxSizeMB = 10,
  onFileSelect,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const accept = formats.map((f) => `.${f.toLowerCase()}`).join(",");

  const validate = (selected) => {
    const ext = selected.name.split(".").pop().toLowerCase();
    if (!formats.map((f) => f.toLowerCase()).includes(ext)) {
      return `Please upload a ${formats.join(", ")} file.`;
    }
    if (selected.size > maxSizeMB * 1024 * 1024) {
      return `File is larger than ${maxSizeMB}MB.`;
    }
    return "";
  };

  const handleFile = (selected) => {
    if (!selected) return;
    const message = validate(selected);
    setError(message);
    if (message) {
      setFile(null);
      return;
    }
    setFile(selected);
    if (onFileSelect) onFileSelect(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const sizeLabel = (bytes) =>
    bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.max(1, Math.round(bytes / 1024))} KB`;

  return (
    <div className="cp-upload">
      <div
        className={`cp-upload__zone${dragging ? " is-dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <h3 className="cp-upload__title">{title}</h3>
        <p className="cp-upload__text">{description}</p>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="cp-upload__input"
          onChange={(e) => handleFile(e.target.files?.[0])}
          aria-label={buttonLabel}
        />

        <button
          type="button"
          className="cp-upload__btn"
          onClick={() => inputRef.current?.click()}
        >
          {buttonLabel}
          <FiArrowUp aria-hidden="true" />
        </button>

        <p className="cp-upload__hint">{hint}</p>

        <ul className="cp-upload__formats">
          {formats.map((format) => (
            <li key={format} className="cp-upload__format">
              {format}
            </li>
          ))}
        </ul>

        {file && (
          <div className="cp-upload__file">
            <FiFileText aria-hidden="true" />
            <span className="cp-upload__file-name">{file.name}</span>
            <span className="cp-upload__file-size">{sizeLabel(file.size)}</span>
            <button
              type="button"
              className="cp-upload__file-remove"
              onClick={handleRemove}
              aria-label="Remove file"
            >
              <FiX />
            </button>
          </div>
        )}

        <p className="cp-upload__error" role="alert" aria-live="polite">
          {error}
        </p>
      </div>
    </div>
  );
};

/* ==========================================================
   2) ProcessStep — reusable small repeating card
   (named export, NOT default)
   props: icon (react-icons component), title, subtitle
          tone     "green" | "purple" | "blue"   (icon + subtitle colour)
          showDot  small dot before the subtitle
   ========================================================== */
export const ProcessStep = ({
  icon: Icon = FiCheck,
  title,
  subtitle,
  tone = "green",
  showDot = false,
}) => (
  <div className="cp-step">
    <span className={`cp-step__icon cp-step__icon--${tone}`} aria-hidden="true">
      <Icon />
    </span>
    <div className="cp-step__content">
      <p className="cp-step__title">{title}</p>
      <p className={`cp-step__sub cp-step__sub--${tone}`}>
        {showDot && <span className="cp-step__dot" aria-hidden="true" />}
        {subtitle}
      </p>
    </div>
  </div>
);

/* small floating info badge (internal) */
const FloatingBadge = ({ icon: Icon, title, subtitle, tone, className }) => (
  <div className={`cp-float cp-float--${tone} ${className}`}>
    <span className="cp-float__icon" aria-hidden="true">
      <Icon />
    </span>
    <div>
      <p className="cp-float__title">{title}</p>
      <p className="cp-float__sub">{subtitle}</p>
    </div>
  </div>
);

const steps = [
  { icon: FiCheck, title: "Resume analyzed", subtitle: "Ready in 4s", tone: "green", showDot: true },
  { icon: FiCheck, title: "Skills matched", subtitle: "Deep taxonomy", tone: "purple" },
  { icon: FiCheck, title: "Experience matched", subtitle: "Contextual seniority", tone: "purple" },
  { icon: FiCheck, title: "1,000+ sources searched", subtitle: "Real-time aggregators", tone: "blue" },
];

/* ==========================================================
   3) ResumeUpload — the section (uses UploadCard + ProcessStep)
   ========================================================== */
const ResumeUpload = () => {
  const handleFileSelect = (file) => {
    // TODO: send `file` to your API / parser here
    console.log("Selected resume:", file);
  };

  return (
    <section className="cp-resume" id="upload-resume" aria-labelledby="cp-resume-title">
      <div className="cp-resume__container">
        {/* heading */}
        <header className="cp-resume__header">
          <span className="cp-resume__pill">
            <span className="cp-resume__pill-dot" aria-hidden="true" />
            <strong>TRY IT LIVE</strong>
            <span className="cp-resume__pill-divider" aria-hidden="true" />
            <span className="cp-resume__pill-version">v2.4 AI Engine</span>
          </span>

          <h2 id="cp-resume-title" className="cp-resume__title">
            Upload your resume. <span className="cp-resume__highlight">Find jobs that fit.</span>
          </h2>

          <p className="cp-resume__text">
            Upload once. CampusPe reads your skills, experience, and preferences — then finds
            relevant jobs across 1,000+ sources.
          </p>
        </header>

        {/* upload + floating badges */}
        <div className="cp-resume__showcase">
          <UploadCard onFileSelect={handleFileSelect} />

          <FloatingBadge
            className="cp-resume__float cp-resume__float--left"
            icon={FiZap}
            tone="green"
            title="98% Match Rate"
            subtitle="AI semantic rank"
          />
          <FloatingBadge
            className="cp-resume__float cp-resume__float--right"
            icon={FiFileText}
            tone="orange"
            title="ATS Compliant"
            subtitle="Standardized parser"
          />
        </div>

        {/* process steps */}
        <ul className="cp-resume__steps">
          {steps.map((step) => (
            <li key={step.title} className="cp-resume__step-item">
              <ProcessStep {...step} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResumeUpload;
