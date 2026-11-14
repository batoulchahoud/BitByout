import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { EntrancePage } from './pages/EntrancePage';
import { SpecialtyPage } from './pages/SpecialtyPage';
import { specialties } from './config/specialties';
import { translations, Language } from './config/translations';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const location = useLocation();

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const t = translations[lang];

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {t.skipContent}
      </a>
      
      <Header lang={lang} onToggleLang={toggleLang} t={t} />

      <div id="main-content" tabIndex={-1}>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<EntrancePage lang={lang} />} />
          {specialties.map((s) => (
            <Route
              key={s.id}
              path={s.route}
              element={<SpecialtyPage specialty={s} lang={lang} />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}