# Verification record

Updated 25 October 2026 after the organization, supplied-logo and recorded-MP3 changes. Node 24.11.1, Chrome on Windows.

## Automated checks

- `npm run build`: TypeScript and Vite production bundle pass.
- `npm run typecheck`: passes.
- `npm run lint`: passes without warnings.
- `npm run format:check`: all supported source/config/document files follow Prettier. Reference artwork, public assets and historical screenshots are deliberately excluded from formatting.
- `npm run test:audio`: two tests pass against the real playback helper with a stub media element. They cover starting at zero, one play call, configured volume, pause/reset/source cleanup, missing media, synchronous playback exceptions and rejected play promises. These do not measure speaker output.
- The public logo's SHA-256 matches the supplied reference SVG exactly. The original references and historical screenshots were retained.
- HTTP checks: logo returns 200 `image/svg+xml`; MP3 returns 200 `audio/mpeg` (16,940 bytes); all three route URLs return 200 HTML from Vite's SPA fallback.
- FFmpeg identifies and decodes the asset as genuine MPEG audio, mono 48kHz. The prepared excerpt contains one second of audio, encoded at 128kbps; it is not a renamed WAV or synthesized effect.

## Browser checks performed after refactoring

- Header and footer inspected on desktop and at a 390 x 844 viewport. The supplied full logo loads at its original aspect ratio (810:735), renders at 88px height on desktop and 66px on mobile, and light lettering is readable on the dark header.
- The SVG logo link returns from a specialty page to the homepage. Accessible name is BitByout home, with image alt text BitByout.
- Purple, gold and teal controls retain their service badges and keyboard previews. A settled purple panel transform matches 36 degrees; its frame remains untransformed. Other focus transitions and badge changes were inspected. Actual pointer hover/leave stress was not performed.
- All three entrances navigate to their correct themed destinations. Enter, Space, single click and rapid double-click activation were exercised. Selection locking remains visible in accessibility state and return-home links/browser Back allow another complete entry.
- Consecutive screenshots and computed camera matrices confirm the whole selected scene opens and enlarges/translates, with neighboring controls fading out. Right-door camera matrices were captured through large zoom scales after the refactor. The geometry and side-door targeting calculation are unchanged.
- Mobile-width third-door badge remains readable and within the viewport; no horizontal overflow was measured. The frame, panel and badge remain aligned after scrolling. Mobile header and footer screenshots were inspected.
- Browser MP3 loading: `currentSrc` is the local `/audio/door-knock.mp3`, readyState is 4 and decoded duration is 1 second.
- Sound-enabled keyboard entry: media state becomes `paused=false`, and currentTime advances. During rapid sound-enabled entry, sampled playback times advanced continuously (about 0.44, 0.49, 0.60, 0.75 seconds) without observed restart. The same single audio element is owned by the entrance page; the synchronous selection guard permits only one committed play callback.
- Muting sound leaves audio paused at zero during keyboard entry; the route still changes. The off preference survived home navigation and reload. Sound was restored to on after verification.
- Destination arrival has no remaining audio element. Cleanup helpers pause/reset media, remove its source and call load; their failure paths are also tested.
- Direct `/web-technology` refresh works. All destination paths separately returned 200 in HTTP checks.
- Console inspection found no application warnings or errors. The retained tab recorded two errors explicitly sourced from an unrelated `chrome-extension://.../vendor.js` while inspecting the standalone SVG; those are not application code or missing asset errors.

## Not verified / limitations

- **No actual listening was performed.** Successful browser loading/playback state is not a judgment of naturalness, background noise or speaker loudness. Freesound describes the source as door knocks, and waveform timing was used to trim its first pair. Source and license are in ATTRIBUTION.md.
- Mobile checks used a resized desktop browser, not a physical phone, real touch input or touch-event emulation. A single mobile-width click navigates, but the `hover: none` behavior was checked in CSS rather than emulated on hardware.
- The available browser automation surface has no hover/pointer-move or media-preference emulation method. Rapid mouse hover/leave, committed pointer movement and OS reduced-motion mode were not exercised. Keyboard preview and click paths were exercised. Reduced-motion code/CSS was inspected: it skips pinning, rotation and zoom and uses the configured 320ms wash.
- Playback failure and cleanup were tested with media stubs in Node; missing MP3 and denied autoplay were not deliberately injected into the live browser. Both synchronous errors and rejected play promises are caught independently of the transition.
- Storage denial, cancelled camera completion and missing panel events were not fault-injected. The existing guarded timers, synchronous selection lock and cleanup remain in useDoorEntry.
- Dynamic viewport changes halfway through entry, physical screen-reader output, other browsers and production-host SPA rewrites remain untested. Browser checks used Vite development mode; production bundle creation passed.

See DOOR_ANIMATION.md for the actual final implementation and README.md for run/deployment instructions.
