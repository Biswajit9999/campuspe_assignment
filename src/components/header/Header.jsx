import { useCallback, useEffect, useRef, useState } from 'react';
import './Header.css';

const NAV_ITEMS = ['Colleges', 'Employers', 'Jobs', 'Blogs'];

// Logo lives in public/images. Change the file name here if yours differs.
const LOGO_SRC = `${process.env.PUBLIC_URL}/images/company_logo.png`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const panelRef = useRef(null);

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

  // Focus the close button on open, close on Escape, keep Tab inside the sidebar.
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

  const handleItemClick = () => {
    if (open) closeMenu();
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

        {/* Sidebar on mobile, inline nav on desktop (same markup, CSS decides). */}
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
                <li key={item}>
                  <button type="button" className="header__link" onClick={handleItemClick}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button type="button" className="header__btn header__btn--outline" onClick={handleItemClick}>
              Sign In
            </button>
            <button type="button" className="header__btn header__btn--primary" onClick={handleItemClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
