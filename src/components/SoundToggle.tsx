type Props = { enabled: boolean; locked: boolean; onToggle: () => void };
export function SoundToggle({ enabled, locked, onToggle }: Props) {
  return (
    <button
      className="sound-control"
      type="button"
      onClick={() => {
        if (!locked) onToggle();
      }}
      aria-pressed={enabled}
      aria-disabled={locked}
      aria-label="Knocking sound"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 9h4l5-4v14l-5-4H4Z" />
        {enabled ? (
          <path d="M16 8q5 4 0 8m3-11q8 7 0 14" />
        ) : (
          <path d="m17 9 5 6m0-6-5 6" />
        )}
      </svg>
      Sound {enabled ? 'on' : 'off'}
    </button>
  );
}
