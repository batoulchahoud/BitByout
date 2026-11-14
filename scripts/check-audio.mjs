import assert from 'node:assert/strict';
import test from 'node:test';
import { playKnock, releaseKnock } from '../src/audio/knockPlayer.ts';

function fakeAudio(play) {
  return {
    currentTime: 1,
    volume: 1,
    pauses: 0,
    released: false,
    loaded: false,
    pause() {
      this.pauses++;
    },
    play,
    removeAttribute(name) {
      if (name === 'src') this.released = true;
    },
    load() {
      this.loaded = true;
    },
  };
}

test('starts the local recording at zero and releases playback on cleanup', () => {
  let plays = 0;
  const audio = fakeAudio(() => {
    plays++;
    return Promise.resolve();
  });
  playKnock(audio);
  assert.equal(plays, 1);
  assert.equal(audio.currentTime, 0);
  assert.equal(audio.volume, 0.5);
  releaseKnock(audio);
  assert.equal(audio.released, true);
  assert.equal(audio.loaded, true);
  assert.equal(audio.pauses, 2);
});

test('missing, blocked or failed media cannot throw into entry', async () => {
  assert.doesNotThrow(() => playKnock(null));
  assert.doesNotThrow(() =>
    playKnock(
      fakeAudio(() => {
        throw new Error('No media');
      }),
    ),
  );
  const audio = fakeAudio(() => Promise.reject(new Error('Playback blocked')));
  assert.doesNotThrow(() => playKnock(audio));
  await Promise.resolve();
  assert.doesNotThrow(() => releaseKnock(audio));
});
