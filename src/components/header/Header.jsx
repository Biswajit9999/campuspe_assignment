import { useCallback, useEffect, useRef, useState } from 'react';
import './Header.css';

// `target` matches a key in sectionRefs. Items without a target show "coming soon".
const NAV_ITEMS = [
  { label: 'Colleges', target: 'colleges' },
  { label: 'Employers', target: 'employers' },
  { label: 'Jobs' },
  { label: 'Blogs' },
];

const LOGO_SRC = `${process.env.PUBLIC_URL}/images/company_logo.png`;

export default function Header({ sectionRefs = {} }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const pendingScrollRef = useRef(null);
  const toastTimerRef = useRef(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock page scroll while the sidebar is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Scroll AFTER the sidebar has closed and the scroll lock is released.
  useEffect(() => {
    if (open || !pendingScrollRef.current) return;
    const el = pendingScrollRef.current;
    pendingScrollRef.current = null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [open]);

  // Focus close button on open, close on Escape, keep Tab inside the sidebar.
  useEffect(() => {
    if (!open) return undefined;

    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const items = panelRef.current.querySelectorAll('button');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeMenu]);

  // If the screen grows to desktop while the sidebar is open, reset it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Clear the snackbar timer on unmount.
  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const showComingSoon = (message) => {
    setToast(message);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(''), 3000);
  };

  const scrollToSection = (el) => {
    if (open) {
      pendingScrollRef.current = el; // scrolled by the effect once the menu closes
      closeMenu();
    } else {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (item) => {
    const el = item.target ? sectionRefs[item.target]?.current : null;
    if (el) {
      scrollToSection(el);
    } else {
      if (open) closeMenu();
      showComingSoon(`${item.label} coming soon!`);
    }
  };

  const handleComingSoon = () => {
  if (open) closeMenu();
  showComingSoon('This feature is coming soon!');
};

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <img className="header__logo" src={LOGO_SRC} alt="CampusPe" />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div
          className={`header__overlay${open ? ' is-open' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          id="site-menu"
          ref={panelRef}
          className={`header__panel${open ? ' is-open' : ''}`}
        >
          <div className="header__panel-top">
            <button
              ref={closeRef}
              type="button"
              className="header__close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="header__nav-wrap" aria-label="Main">
            <ul className="header__nav">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <button type="button" className="header__link" onClick={() => handleNavClick(item)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__btn header__btn--outline"
              onClick={() => handleComingSoon('Sign In')}
            >
              Sign In
            </button>
            <button
              type="button"
              className="header__btn header__btn--primary"
              onClick={() => handleComingSoon('Sign Up')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <div className={`header__toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </header>
  );
}