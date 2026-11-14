import { Link } from 'react-router-dom';
import { Language } from '../config/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  t: Record<string, string>;
}

export function Header({ lang, onToggleLang, t }: HeaderProps) {
  return (
    <>
      <style>{`
        /* Desktop Header Layout */
        .site-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .brand-logo {
          height: 75px;
          width: auto;
          display: block;
        }

        .header-contacts-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .header-contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.05rem; /* Larger, clearer text for PC */
          font-weight: 500;
          color: inherit;
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .header-contact-item:hover {
          opacity: 1;
        }

        .header-desktop-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-mobile-wrapper {
          display: contents;
        }

        /* Mobile Only Styles (Strictly below 900px) */
        @media (max-width: 900px) {
          .site-header {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            position: relative !important;
            padding: 1rem !important;
            gap: 0.75rem !important;
            height: auto !important;
            background: transparent !important;
          }

          .brand-logo {
            height: 36px !important;
          }

          .header-desktop-right {
            display: none !important;
          }

          .header-mobile-wrapper {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            position: relative !important;
          }

          .header-contacts-group {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            background: rgba(255, 255, 255, 0.04) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 12px !important;
            position: relative !important;
            transform: none !important;
            left: auto !important;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            margin: 0.5rem 0 0 0 !important;
            box-sizing: border-box !important;
            clear: both !important;
          }

          .header-contact-item {
            font-size: 0.9rem !important; /* Balanced font size for mobile view */
          }

          .mobile-only-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>

      <header className="site-header">
        {/* Mobile Top Row: Logo + Language Toggle */}
        <div className="header-mobile-wrapper">
          <Link className="brand-link" to="/" aria-label="BitByout home">
            <img
              className="brand-logo"
              src={`${import.meta.env.BASE_URL}brand/bitbyout-logo.svg`}
              width="900"
              height="900"
              alt="BitByout"
            />
          </Link>

          <button 
            className="lang-toggle-btn mobile-only-toggle" 
            onClick={onToggleLang} 
            aria-label="Switch Language"
            style={{ display: 'none', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            <span className={lang === 'en' ? 'active-lang' : ''} style={{ opacity: lang === 'en' ? 1 : 0.5 }}>ENG</span>
            <span className="lang-separator" style={{ margin: '0 4px', opacity: 0.4 }}>|</span>
            <span className={lang === 'fr' ? 'active-lang' : ''} style={{ opacity: lang === 'fr' ? 1 : 0.5 }}>FR</span>
          </button>
        </div>

        {/* Contact Links Container */}
        <div className="header-contacts-group">
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/bitbyout/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="header-contact-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0 }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>bitbyout</span>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/212700101057" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="header-contact-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0 }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+212700101057</span>
          </a>

          {/* Gmail */}
          <div className="header-contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', flexShrink: 0 }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>bitbyout@gmail.com</span>
          </div>
        </div>

        {/* Right Section: Tagline + Desktop Language Switcher */}
        <div className="header-desktop-right">
          <span className="header-note" style={{ fontSize: '0.85rem', opacity: 0.75 }}>
            {t?.tagline} <span className="availability-dot" />
          </span>

          <button 
            className="lang-toggle-btn" 
            onClick={onToggleLang} 
            aria-label="Switch Language"
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            <span className={lang === 'en' ? 'active-lang' : ''} style={{ opacity: lang === 'en' ? 1 : 0.5 }}>ENG</span>
            <span className="lang-separator" style={{ margin: '0 4px', opacity: 0.4 }}>|</span>
            <span className={lang === 'fr' ? 'active-lang' : ''} style={{ opacity: lang === 'fr' ? 1 : 0.5 }}>FR</span>
          </button>
        </div>
      </header>
    </>
  );
}