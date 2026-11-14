import { serviceGroups, type SpecialtyId } from '../config/specialties';
// Small local SVG drawings: no network assets or icon runtime required.
const social = [
  <>
    <rect x="4" y="4" width="24" height="24" rx="7" />
    <circle cx="16" cy="16" r="6" />
    <circle cx="23" cy="9" r="1" fill="currentColor" />
  </>,
  <path d="M18 4v17a6 6 0 1 1-5-6v4a2 2 0 1 0 1 2V4h4c1 5 4 7 8 7v4c-4 0-6-2-8-3" />,
  <path d="M19 29V18h4l1-5h-5V9c0-2 1-2 5-2V3h-5c-5 0-6 3-6 7v3H9v5h4v11" />,
  <>
    <path d="M5 26 7 21a12 12 0 1 1 5 6Z" />
    <path d="m12 10-2 3c2 5 4 7 9 9l3-3-4-2-1 2-4-4 1-1Z" />
  </>,
];
const film = [
  <>
    <rect x="2" y="4" width="28" height="24" rx="5" />
    <text
      x="16"
      y="21"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      fontSize="16"
      fontFamily="sans-serif"
    >
      3D
    </text>
  </>,
  <>
    <ellipse cx="12" cy="10" rx="9" ry="6" />
    <ellipse cx="12" cy="10" rx="4" ry="2" />
    <path d="M3 10v11c0 8 18 8 18 0V10m0 7h9v9H12m12-9v5m3-5v3M7 17v6m5-5v6m5-7v6" />
  </>,
  <>
    <path d="m3 6 9-3 9 3 8-3v23l-8 3-9-3-9 3Zm9-3v23M21 6v23" />
    <path d="m6 14 3-2 7 6 8-8 3 1M16 10v3m-9 9 3-2m14 2 3-3" />
  </>,
];
const web = [
  <path
    fill="currentColor"
    stroke="none"
    d="M17 2h12v3h2v9H21v3h5v3h-3v-1h-2v7h-3v4h-4v-2h2v-4h-4v-3H9v-3H6v-3H3v-5h3v4h3v3h4v-3h4V2Zm7 3v2h2V5Z"
    fillRule="evenodd"
  />,
  <>
    <rect x="2" y="5" width="28" height="23" rx="2" />
    <path d="M2 11h28M6 8h1m3 0h1" />
    <text
      x="16"
      y="22"
      fill="currentColor"
      stroke="none"
      textAnchor="middle"
      fontSize="9"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      WWW
    </text>
  </>,
  <>
    <rect x="2" y="4" width="28" height="20" rx="2" />
    <path d="M5 7h17v13H5Zm20 1h2m-2 4h2m-2 4h2M12 24v5m8-5v5M8 29h16" />
  </>,
];
const iconsBySpecialty = { social, film, web };
export function ServiceBadge({
  specialtyId,
  descriptionId,
}: {
  specialtyId: SpecialtyId;
  descriptionId: string;
}) {
  const group = serviceGroups[specialtyId];
  const icons = iconsBySpecialty[specialtyId];
  return (
    <span className="badge-slot">
      <span className="service-badge">
        <span className="badge-icons" aria-hidden="true">
          {icons.map((icon, i) => (
            <svg
              key={i}
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon}
            </svg>
          ))}
        </span>
        <span className="badge-title">{group.title}</span>
      </span>
      <span id={descriptionId} className="sr-only">
        {group.title}: {group.names}.
      </span>
    </span>
  );
}
