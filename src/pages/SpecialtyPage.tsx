import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Specialty } from '../config/specialties';
import { translations, Language } from '../config/translations';

interface SpecialtyPageProps {
  specialty: Specialty;
  lang: Language;
}

// Interactive 2D-to-3D Hover Reveal Component (with Mobile Toggle Support)
function FloorPlanReveal({ spotlightSize = 300 }: { spotlightSize?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [show3DMobile, setShow3DMobile] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--mouse-x', '-500px');
    containerRef.current.style.setProperty('--mouse-y', '-500px');
  };

  return (
    <>
      <style>{`
        .mobile-3d-toggle-btn {
          display: none;
        }

        @media (max-width: 900px) {
          .mobile-3d-toggle-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 0 auto 1.25rem auto;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
        }
      `}</style>

      <button 
        className="mobile-3d-toggle-btn"
        onClick={() => setShow3DMobile(!show3DMobile)}
        type="button"
        aria-label="Toggle 2D and 3D view"
      >
        <span>{show3DMobile ? '👁️ Showing 3D Render (Tap for 2D)' : '✨ Tap to View 3D Render'}</span>
      </button>

      <div
        ref={containerRef}
        className="floorplan-reveal-container"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        style={
          {
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '14 / 12',
            margin: '0 auto 3.5rem auto',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'crosshair',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '--mouse-x': '-500px',
            '--mouse-y': '-500px',
            '--spotlight-size': `${spotlightSize}px`,
          } as CSSProperties
        }
      >
        <img
          src="/3dplan for the websiteee.png"
          alt="3D Architectural Render"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
        <img
          src="/autocad 2d plan for the websiteee.png"
          alt="2D AutoCAD Floor Plan"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: show3DMobile ? 0 : 1,
            transition: 'opacity 0.3s ease',
            maskImage:
              'radial-gradient(circle var(--spotlight-size) at var(--mouse-x) var(--mouse-y), transparent 40%, black 100%)',
            WebkitMaskImage:
              'radial-gradient(circle var(--spotlight-size) at var(--mouse-x) var(--mouse-y), transparent 40%, black 100%)',
          }}
        />
        {!isHovered && !show3DMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.75)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              backdropFilter: 'blur(4px)',
              pointerEvents: 'none',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            Hover to reveal 3D Render
          </div>
        )}
      </div>
    </>
  );
}

// Interactive Instagram Chat Component
function SocialChatInteractive({ lang }: { lang: Language }) {
  const [step, setStep] = useState<number>(0);

  const texts = {
    en: {
      q1: "can u lead my posts?",
      btn1: "yes →",
      r1: "yes",
      q2: "can u deal with my dms?",
      btn2: "absolutely →",
      r2: "absolutely",
      finalMsg: "if ur looking for these services hit us up",
      linkText: "Instagram @bitbyout ↗",
      hint: "👆 CLICK TO REPLY"
    },
    fr: {
      q1: "pouvez-vous gérer mes publications ?",
      btn1: "oui →",
      r1: "oui",
      q2: "pouvez-vous gérer mes messages directs ?",
      btn2: "absolument →",
      r2: "absolument",
      finalMsg: "si vous recherchez ces services, contactez-nous",
      linkText: "Instagram @bitbyout ↗",
      hint: "👆 CLIQUEZ POUR RÉPONDRE"
    }
  };

  const t = texts[lang] || texts.en;

  return (
    <div
      style={{
        margin: '2.5rem auto 3.5rem auto',
        maxWidth: '450px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <style>{`
        @keyframes bounceAndGlow {
          0%, 100% {
            transform: translateY(0);
            box-shadow: 0 4px 20px rgba(253, 29, 29, 0.5);
          }
          50% {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(253, 29, 29, 0.8);
          }
        }
        .chat-reply-btn {
          animation: bounceAndGlow 1.4s infinite ease-in-out;
          cursor: pointer;
          transition: filter 0.2s ease, transform 0.1s ease;
        }
        .chat-reply-btn:hover {
          filter: brightness(1.25);
          transform: scale(1.05);
        }
      `}</style>

      <div
        style={{
          padding: '12px 20px',
          background: 'rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          Instagram Direct · @bitbyout
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
        <div
          style={{
            alignSelf: 'flex-start',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '10px 16px',
            borderRadius: '16px 16px 16px 4px',
            fontSize: '0.9rem',
            maxWidth: '85%',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {t.q1}
        </div>

        {step === 0 && (
          <div style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', marginTop: '4px' }}>
            <div
              style={{
                background: 'rgba(253, 29, 29, 0.25)',
                border: '1px solid rgba(253, 29, 29, 0.6)',
                padding: '3px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#ff9999',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              {t.hint}
            </div>
            <button
              onClick={() => setStep(1)}
              className="chat-reply-btn"
              style={{
                background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '22px',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              {t.btn1}
            </button>
          </div>
        )}

        {step >= 1 && (
          <>
            <div
              style={{
                alignSelf: 'flex-end',
                background: 'rgba(253, 29, 29, 0.2)',
                border: '1px solid rgba(253, 29, 29, 0.4)',
                padding: '10px 16px',
                borderRadius: '16px 16px 4px 16px',
                fontSize: '0.9rem',
                color: '#fff',
              }}
            >
              {t.r1}
            </div>

            <div
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '10px 16px',
                borderRadius: '16px 16px 16px 4px',
                fontSize: '0.9rem',
                maxWidth: '85%',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {t.q2}
            </div>

            {step === 1 && (
              <div style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', marginTop: '4px' }}>
                <div
                  style={{
                    background: 'rgba(253, 29, 29, 0.25)',
                    border: '1px solid rgba(253, 29, 29, 0.6)',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    color: '#ff9999',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {t.hint}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="chat-reply-btn"
                  style={{
                    background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '22px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {t.btn2}
                </button>
              </div>
            )}
          </>
        )}

        {step >= 2 && (
          <>
            <div
              style={{
                alignSelf: 'flex-end',
                background: 'rgba(253, 29, 29, 0.2)',
                border: '1px solid rgba(253, 29, 29, 0.4)',
                padding: '10px 16px',
                borderRadius: '16px 16px 4px 16px',
                fontSize: '0.9rem',
                color: '#fff',
              }}
            >
              {t.r2}
            </div>

            <div
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '14px 16px',
                borderRadius: '16px 16px 16px 4px',
                fontSize: '0.9rem',
                maxWidth: '90%',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span>{t.finalMsg}</span>
              <a
                href="https://instagram.com/bitbyout"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                  color: '#fff',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  boxShadow: '0 6px 16px rgba(131, 58, 180, 0.4)',
                }}
              >
                {t.linkText}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function SpecialtyPage({ specialty: s, lang }: SpecialtyPageProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  const location = useLocation();
  const t = translations[lang];

  const specialtyObj = s as any;
  const isSocials = specialtyObj.number === '01' || specialtyObj.id === 'socials' || specialtyObj.route?.includes('socials');
  const isAutocad = specialtyObj.number === '02' || specialtyObj.id === 'autocad' || specialtyObj.route?.includes('autocad');
  const isWeb = specialtyObj.number === '03' || specialtyObj.id === 'web' || specialtyObj.route?.includes('web') || specialtyObj.id === 'tech';

  const title = isSocials ? t.socialsTitle : isAutocad ? t.autocadTitle : t.webTitle;
  const description = isSocials ? t.socialsDesc : isAutocad ? t.autocadDesc : t.webDesc;
  const category = lang === 'fr' 
    ? (isSocials ? 'FAITES-VOUS ENTENDRE' : isAutocad ? "DONNER VIE AUX IDÉES" : "CONSTRUIRE L'AVENIR")
    : (isSocials ? 'MAKE YOURSELF HEARD' : isAutocad ? 'BRING IDEAS TO LIFE' : 'BUILD WHAT\'S NEXT');

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    document.title = `${title} — BitByout`;
    return () => {
      document.title = 'BitByout — A creative house';
    };
  }, [title]);

  return (
    <main
      className="specialty-page"
      style={{ '--accent': specialtyObj.accent } as CSSProperties}
    >
      <style>{`
        .custom-home-btn {
          display: inline-flex !important;
          align-items: center !important;
          gap: 10px !important;
          font-size: 1.1rem !important;
          font-weight: 600 !important;
          color: #ffffff !important;
          text-decoration: none !important;
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          padding: 10px 20px !important;
          border-radius: 30px !important;
          margin-bottom: 2rem !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.2s ease-in-out !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
        }

        .custom-home-btn:hover {
          background: rgba(255, 255, 255, 0.16) !important;
          transform: translateY(-2px) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
        }

        .custom-home-btn svg {
          width: 22px !important;
          height: 22px !important;
          stroke: #ffffff !important;
          fill: none !important;
        }
      `}</style>

      {location.state?.entered && (
        <div
          className="arrival-wash"
          style={{ background: specialtyObj.deep }}
          aria-hidden="true"
        />  
      )}

      {/* Prominent Return Home Button with House Icon */}
      <Link className="back-link custom-home-btn" to="/">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>{lang === 'fr' ? "Retour à l'accueil" : "Back to Home"}</span>
      </Link>

      <p className="eyebrow">
        ROOM {specialtyObj.number || '01'} / {category}
      </p>
      <h1 tabIndex={-1} ref={heading}>
        {title}
        <span>.</span>
      </h1>
      <p className="specialty-lead">{description}</p>
      <p className="specialty-body">
        {lang === 'fr' ? "C'est ici que votre idée prend forme." : 'This is where your idea takes shape.'}
      </p>

      {/* Interactive Socials Instagram Chat */}
      {isSocials && <SocialChatInteractive lang={lang} />}

      {/* Interactive AutoCAD Floor Plan Reveal */}
      {isAutocad && <FloorPlanReveal spotlightSize={300} />}

      {/* Featured Case Study for Web & Technology */}
      {isWeb && (
        <div
          style={{
            margin: '2.5rem auto 3.5rem auto',
            padding: '2rem',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            maxWidth: '900px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
              {lang === 'fr' ? 'Projet en vedette · Cas pratique' : 'Featured Live Project · Case Study'}
            </span>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>React · TypeScript · CSS Masking</span>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            BitByout — Interactive Creative Platform
          </h3>
          <p style={{ opacity: 0.85, lineHeight: '1.6', marginBottom: '1.5rem' }}>
            {lang === 'fr'
              ? "L'application web que vous parcourez actuellement. Conçue avec une architecture modulaire, une double localisation dynamique (FR/ENG), des transitions spatiales fluides par portes virtuelles, et des effets visuels haute performance basés sur le masquage CSS."
              : "The live web application you are currently browsing. Built with modular architecture, dynamic bilingual localization (FR/ENG), immersive spatial door transitions, and high-performance visual effects powered by CSS mask gradients."}
          </p>

          <div
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: '#0a0a0c',
              marginBottom: '1.5rem',
              boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontSize: '0.75rem', opacity: 0.5, marginLeft: '10px', fontFamily: 'monospace' }}>https://bitbyout.com</span>
            </div>
            <img
              src="/screen shot for the website.png"
              alt="BitByout Main Page Preview"
              style={{
                width: '100%',
                display: 'block',
                maxHeight: '400px',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {['Bilingual Localization', 'Custom Spatial Audio', 'Interactive 2D/3D Reveal', 'Zero-Lag 60FPS UI'].map((tag) => (
              <span key={tag} style={{ fontSize: '0.8rem', padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                ✨ {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="service-list">
        {(specialtyObj.services || []).map((service: string, index: number) => (
          <div key={service}>
            <span>0{index + 1}</span>
            <h2>{service}</h2>
          </div>
        ))}
      </div>
      <p className="placeholder-note">
        {lang === 'fr' 
          ? "Un espace pour ce qui vient ensuite. Page de spécialité · preuve de concept" 
          : 'A space for what comes next. Specialty page · proof of concept'}
      </p>
    </main>
  );
}