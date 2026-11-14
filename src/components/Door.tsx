import { useId, type CSSProperties } from 'react';
import type { Specialty } from '../config/specialties';
import { motion, doorGeometry } from '../config/animation';
import { ServiceBadge } from './ServiceBadge';
import { DoorScene } from './DoorScene';

type Props = {
  specialty: Specialty & { actionLabel?: string; openingLabel?: string };
  selected: boolean;
  locked: boolean;
  onSelect: (scene: HTMLElement) => void;
  onOpened: () => void;
};

export function Door({
  specialty: s,
  selected,
  locked,
  onSelect,
  onOpened,
}: Props) {
  const id = useId().replace(/:/g, '');
  const specialtyObj = s as any;

  const actionText = specialtyObj.actionLabel || 'STEP INSIDE';
  const openingText = specialtyObj.openingLabel || 'OPENING YOUR DOOR';

  const style = {
    '--accent': s.accent,
    '--bright': s.bright,
    '--deep': s.deep,
    '--hinge-x': `${(doorGeometry.hingeX / doorGeometry.width) * 100}%`,
    '--preview-angle': motion.previewAngle,
    '--preview-duration': `${motion.previewMs}ms`,
    '--open-angle': motion.openAngle,
    '--open-duration': `${motion.openMs}ms`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  } as CSSProperties;

  return (
    <button
      className={`entrance ${selected ? 'is-opening' : ''}`}
      style={style}
      aria-label={`Enter ${s.name}`}
      aria-describedby={`${id}-description ${id}-services`}
      aria-disabled={locked}
      onClick={(event) => {
        if (!locked)
          onSelect(
            event.currentTarget.querySelector<HTMLElement>('.door-scene')!,
          );
      }}
    >
      <span className="entrance-top">
        <span>{s.number} /</span>
        <span>{s.category}</span>
      </span>
      <ServiceBadge specialtyId={s.id} descriptionId={`${id}-services`} />
      <DoorScene specialty={s} selected={selected} onOpened={onOpened} />
      <span 
        className="entrance-copy" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flex: 1,
          width: '100%' 
        }}
      >
        <span className="entrance-title">
          {s.name}
          <span className="enter-arrow">↗</span>
        </span>
        <span 
          id={`${id}-description`} 
          className="entrance-description"
          style={{ flex: 1 }}
        >
          {s.description}
        </span>
        <span 
          className="enter-label"
          style={{ marginTop: 'auto' }}
        >
          {selected ? openingText : actionText} <span>→</span>
        </span>
      </span>
    </button>
  );
}