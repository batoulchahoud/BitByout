export const soundSettings = {
  file: 'audio/door-knock.mp3',
  volume: 0.5,
  // Keep the existing key so visitors retain their previous preference.
  storageKey: 'threefold-sound',
};

export function stopKnock(audio: HTMLAudioElement | null) {
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch {
    /* Unavailable media is optional. */
  }
}

export function playKnock(audio: HTMLAudioElement | null) {
  if (!audio) return;
  try {
    stopKnock(audio);
    audio.volume = soundSettings.volume;
    // Called in the click/keyboard activation, never awaited by navigation.
    void audio.play().catch(() => {});
  } catch {
    /* Loading, decoding or autoplay errors must not block entry. */
  }
}

export function releaseKnock(audio: HTMLAudioElement | null) {
  stopKnock(audio);
  if (!audio) return;
  try {
    audio.removeAttribute('src');
    audio.load();
  } catch {
    /* Cancel pending network work. */
  }
}
