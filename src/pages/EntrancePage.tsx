import type { CSSProperties } from 'react';
import { Door } from '../components/Door';
import { SoundToggle } from '../components/SoundToggle';
import { specialties } from '../config/specialties';
import { motion } from '../config/animation';
import { useDoorEntry } from '../hooks/useDoorEntry';
import { useKnockSound } from '../hooks/useKnockSound';
import { translations, Language } from '../config/translations';

interface EntrancePageProps {
  lang: Language;
}

export function EntrancePage(props: EntrancePageProps) {
  const { lang } = props;
  const t = translations[lang];
  const { audioRef, enabled, toggle, play } = useKnockSound();
  const { selected, fading, selectDoor, zoomIntoDoor } = useDoorEntry(play);

  return (
    <main
      className={`home ${selected ? 'has-selection' : ''}`}
      style={{ '--fade-duration': `${motion.fadeMs}ms` } as CSSProperties}
    >
      <audio ref={audioRef} preload="auto" aria-hidden="true" />
      <SoundToggle enabled={enabled} locked={!!selected} onToggle={toggle} />
      <section className="intro">
        <p className="eyebrow">
          <span /> {lang === 'fr' ? 'ESPRITS INDÉPENDANTS. IMAGINATION PARTAGÉE.' : 'INDEPENDENT MINDS. SHARED IMAGINATION.'}
        </p>
        <h1>
          {t.heroTitlePrefix}
          <br />
          <em>{t.heroTitleAccent}</em>
        </h1>
        <p className="intro-description">
          {t.heroSubtitle}
        </p>
      </section>
      <section
        className="entrances"
        aria-label="Choose your specialty"
        aria-busy={!!selected}
      >
        {specialties.map((s) => {
          const specialtyObj = s as any;
          const isSocials = specialtyObj.number === '01' || specialtyObj.id === 'socials' || specialtyObj.route?.includes('socials');
          const isAutocad = specialtyObj.number === '02' || specialtyObj.id === 'autocad' || specialtyObj.route?.includes('autocad');

          const translatedSpecialty = {
            ...s,
            title: isSocials ? t.socialsTitle : isAutocad ? t.autocadTitle : t.webTitle,
            name: isSocials ? t.socialsTitle : isAutocad ? t.autocadTitle : t.webTitle,
            description: isSocials ? t.socialsDesc : isAutocad ? t.autocadDesc : t.webDesc,
            category: lang === 'fr' 
              ? (isSocials ? 'FAITES-VOUS ENTENDRE' : isAutocad ? "DONNER VIE AUX IDÉES" : "CONSTRUIRE L'AVENIR")
              : (isSocials ? 'MAKE YOURSELF HEARD' : isAutocad ? 'BRING IDEAS TO LIFE' : "BUILD WHAT'S NEXT"),
            actionLabel: lang === 'fr' ? 'ENTRER' : 'STEP INSIDE',
            openingLabel: lang === 'fr' ? 'OUVERTURE DE VOTRE PORTE' : 'OPENING YOUR DOOR',
          };

          return (
            <Door
              key={s.id}
              specialty={translatedSpecialty as any}
              selected={selected?.id === s.id}
              locked={!!selected}
              onSelect={(element) => selectDoor(s, element)}
              onOpened={() => zoomIntoDoor(s)}
            />
          );
        })}
      </section>
      <p className="interaction-hint">
        <span className="hint-icon">↳</span> {lang === 'fr' ? 'UN PEU DE CURIOSITÉ OUVRE BEAUCOUP DE POSSIBILITÉS' : 'A LITTLE CURIOSITY OPENS A LOT OF POSSIBILITIES'}
      </p>
      <span className="sr-only" role="status">
        {selected ? `Opening ${selected.name}` : ''}
      </span>
      {selected && (
        <div
          className={`entry-wash ${fading ? 'is-visible' : ''}`}
          style={{ background: selected.deep }}
          aria-hidden="true"
        />
      )}
    </main>
  );
}