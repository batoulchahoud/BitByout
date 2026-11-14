import { useEffect, useRef, useState } from 'react';
import {
  playKnock,
  releaseKnock,
  soundSettings,
  stopKnock,
} from '../audio/knockPlayer';

export function useKnockSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(() => {
    try {
      return localStorage.getItem(soundSettings.storageKey) !== 'off';
    } catch {
      return true;
    }
  });
  useEffect(() => {
    const audio = audioRef.current;
    // StrictMode repeats setup/cleanup in development, so restore the source in setup.
    if (audio) audio.src = `${import.meta.env.BASE_URL}${soundSettings.file}`;
    return () => releaseKnock(audio);
  }, []);
  function toggle() {
    const next = !enabled;
    setEnabled(next);
    if (!next) stopKnock(audioRef.current);
    try {
      localStorage.setItem(soundSettings.storageKey, next ? 'on' : 'off');
    } catch {
      /* Optional persistence. */
    }
  }
  return {
    audioRef,
    enabled,
    toggle,
    play: () => {
      if (enabled) playKnock(audioRef.current);
    },
  };
}
