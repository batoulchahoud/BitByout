# BitByout — three animated entrances

A small React + TypeScript + Vite proof of concept. Three themed doors preview on hover or keyboard focus, display service badges, and open/zoom into matching destination pages. The supplied BitByout SVG is used directly in the header. A bundled recorded MP3 replaces the former synthesized knock.

## Run

Prerequisites: **Node.js 24 LTS** (recommended; tested with 24.11.1) and **npm** (included with Node.js; tested with 11.8.0). Node.js 22.x starting at 22.13 is also supported by the configured tooling. An internet connection is needed for the first dependency installation. No API keys or environment variables are required.

Extract the archive, open a terminal in its `BitByout/` folder, then run:

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:5188**. Keep the terminal running; Ctrl+C stops the server.

```sh
npm run build
npm run typecheck
npm run lint
npm run format:check
npm run test:audio
```

Use `npm run format` to apply Prettier formatting and `npm run preview` to serve the production build at port 4188. Python and FFmpeg are only optional asset-preparation tools, not website requirements.

## Project structure

```text
src/
  main.tsx                    React and router startup
  App.tsx                     Shared layout and existing routes
  components/
    Header.tsx, Footer.tsx     Reusable site layout
    Door.tsx                  Stationary accessible entrance control
    DoorScene.tsx             Layered SVG artwork
    ServiceBadge.tsx          Service icon artwork and badges
    SoundToggle.tsx           Accessible sound control
  pages/
    EntrancePage.tsx          Homepage rendering
    SpecialtyPage.tsx         Matching destination content
  hooks/
    useDoorEntry.ts           Selection, opening, camera, navigation, cleanup
    useKnockSound.ts          MP3 ownership and saved sound preference
  config/
    specialties.ts            Content, routes, colors, service groups
    animation.ts              Motion timing and doorway geometry
  audio/knockPlayer.ts         Safe playback helpers and sound settings
  styles.css                  Shared CSS, interaction and responsive rules
public/
  brand/bitbyout-logo.svg      Unchanged copy of the supplied SVG
  audio/door-knock.mp3         Local one-second recorded knock
scripts/
  check-audio.mjs              Playback failure/cleanup checks
  prepare-knock.py             Optional reproducible MP3 preparation
```

The refactor keeps the existing framework, router and SVG/CSS approach. Prettier is a development-only formatting dependency; there are no new runtime dependencies. Original reference pictures and historical screenshots remain in the author's working project but are omitted from the source archive: they are not used at runtime or by the preparation scripts. The archive includes the required logo and MP3 in `public/`. The obsolete synthesized audio implementation and old audio-specific tests were replaced.

## Animation and customization

Read **[DOOR_ANIMATION.md](DOOR_ANIMATION.md)** for a beginner-friendly explanation of the actual layers, hinge, hover, badges, activation, selected-door zoom, fallback navigation, sound and reduced motion.

- Change door content, routes, colors and service labels in `src/config/specialties.ts`.
- Change angles, durations and target coordinates in `src/config/animation.ts`.
- Change local icon drawings in `src/components/ServiceBadge.tsx`.
- Change the MP3 filename or volume in `src/audio/knockPlayer.ts`; update attribution when replacing the recording.
- Adjust logo size, spacing and responsive appearance in `src/styles.css`.

To reuse the entrances in another React project, copy the Door/DoorScene/ServiceBadge components, configuration, hooks, playback helper, matching CSS and local MP3. Adapt the navigation calls in `useDoorEntry` to that project's router. Keep the selection guards, completion deadlines, scene slot and cleanup. For Next.js, add a client boundary around interactive components, use its router/Link and create the matching routes.

## Artwork and sound

The door art is a **layered SVG approximation** of the detailed purple house image. It preserves the sloping roof, curved edge, lower triangle, four windows and luminous colors. The dark inner area is interpreted as the moving panel. No raster crop patches, manual edits or duplicate closed windows are used. The mockup guides the three entrances and palettes. Gradients approximate the original textures; this is not a pixel-perfect extraction.

The complete supplied BitByout SVG is copied byte-for-byte into `public/brand/` and rendered as an image linking home. Its transparent background and proportions are preserved; the light lettering remains visible on the dark header.

The knock is an excerpt of **Wooden Door Knock by AkiYaSuShi**, published under CC0 on Freesound. The actual MP3 is served locally and preloaded without autoplay. Playback failure never blocks entry. Source, license, preparation steps and listening limitations are in **[ATTRIBUTION.md](ATTRIBUTION.md)**.

Fonts use Google Fonts with system sans-serif fallbacks. The artwork and interaction remain functional offline; self-host the fonts or remove the CSS import for a fully local deployment.

## Routing and deployment

Routes remain `/social-content`, `/film-3d`, and `/web-technology`. Vite supports direct loads and refreshes in development. Build and deploy `dist/`; configure production hosting to rewrite unknown non-asset paths to `/index.html` (SPA fallback). Without that rewrite, deep links can return 404. For subdirectory hosting, configure Vite `base` and BrowserRouter `basename` together; local logo/audio URLs already respect Vite's base.

## Verification

See **[VERIFICATION.md](VERIFICATION.md)** for current checks and explicit limits, including the distinction between successful media playback state and actually listening to the recording.
