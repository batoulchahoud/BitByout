# How the door animation works

The doors look three-dimensional, but they are ordinary SVG shapes animated by CSS and a small React hook. There is no 3D engine or animation library.

## Where to look

| File                                                | Responsibility                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| [EntrancePage.tsx](src/pages/EntrancePage.tsx)      | Renders the homepage and connects the controls to the hooks.       |
| [Door.tsx](src/components/Door.tsx)                 | A stationary, accessible button with the label, badge and artwork. |
| [DoorScene.tsx](src/components/DoorScene.tsx)       | SVG frame, interior, panel, four windows and lighting.             |
| [ServiceBadge.tsx](src/components/ServiceBadge.tsx) | Local SVG service icon drawings and informational badges.          |
| [useDoorEntry.ts](src/hooks/useDoorEntry.ts)        | Selection lock, opening, measured zoom, completion and navigation. |
| [useKnockSound.ts](src/hooks/useKnockSound.ts)      | Sound preference, audio element and cleanup.                       |
| [knockPlayer.ts](src/audio/knockPlayer.ts)          | Safe playback, volume, local filename and storage key.             |
| [animation.ts](src/config/animation.ts)             | Angles, timing and doorway coordinates.                            |
| [specialties.ts](src/config/specialties.ts)         | Door names, descriptions, routes, palettes and service metadata.   |
| [styles.css](src/styles.css)                        | Layout, perspective, preview, badges, fades and responsive rules.  |

## The artwork is separated into layers

The supplied house image is a flat picture. Instead of trying to rotate the whole picture, the app recreates the necessary shapes as SVG:

1. **Interior:** a glowing shape behind the panel, with no windows.
2. **Stationary frame:** the roof, curved right edge and lower-left triangle.
3. **Moving panel:** the dark inner shape, four windows and small handle. These move together.

All layers use the same `1040 × 800` coordinate system. The scene has that same aspect ratio in CSS. Resizing the scene therefore keeps its layers aligned. SVG paint IDs are unique for each scene, so the three palettes cannot overwrite each other.

This is a layered approximation of the reference, not a pixel-perfect reproduction. The original reference artwork remains unchanged in the author's working project. Unused reference pictures are omitted from the source archive; the required SVG logo is bundled in `public/brand/`.

## Why the panel looks like it opens

The fixed `.door-scene` supplies CSS `perspective: 1000px`. Perspective makes the far and near edges appear different sizes as a panel rotates.

The panel's hinge is its left edge at SVG x-coordinate 310. `Door.tsx` converts that to a percentage:

```ts
'--hinge-x': `${(doorGeometry.hingeX / doorGeometry.width) * 100}%`
```

The CSS uses that position as the rotation origin:

```css
.moving-panel {
  transform-origin: var(--hinge-x) 50%;
  transform: rotateY(0deg);
}
```

Only the panel rotates. The surrounding frame stays still until the later camera zoom moves the whole scene. The button itself never moves during previews, so the pointer does not repeatedly leave and re-enter its target.

## Hover, focus and leaving

Before activation, hovering opens the panel to 36 degrees and reveals more interior light. Keyboard `:focus-visible` produces the same preview and adds a visible outline. A 380ms CSS transition smooths the opening and closing.

The badge fades in and moves upward a few pixels above the stationary frame. Its slot always occupies space, so revealing it does not push the door down. `:focus-within` keeps the badge visible while the control has focus. Icon/service names are included in the button's accessible description; the icons are not separate links.

When hover or keyboard focus leaves, the preview closes. After activation, `.is-opening` takes over: leaving cannot close a committed door.

On devices reporting `hover: none`, badges are visible before tapping. One tap starts entry. A desktop viewport resized to mobile width is not the same as real touch hardware.

## What happens on activation

`useDoorEntry` owns the sequence:

1. Set a synchronous ref lock. Further clicks, taps, Enter or Space cannot start another entry.
2. Call the sound hook immediately within the user activation.
3. Measure the selected scene and pin that same DOM element at the same screen position and size. `.scene-slot` keeps the original layout space. There is no duplicate scene or transfer to a new overlay.
4. Fully open the panel to 106 degrees over 460ms. Other doors, badges and introductory content fade away.
5. On panel `transitionend`, zoom the entire scene through that doorway over 650ms.
6. On zoom completion, show a 160ms wash in the selected theme's deep color and navigate to its existing route.
7. The destination reveals beneath the same color over 300ms. Its heading receives keyboard focus without an extra scroll jump.

The normal entry takes about 1.27 seconds before navigation. The destinations remain `/social-content`, `/film-3d`, and `/web-technology`.

## How the zoom finds the correct doorway

`getBoundingClientRect()` gives the selected scene's actual position **in the viewport**, including the effects of mobile scrolling. The target is a small rectangle wholly inside the opening, below its sloping roof. Its center is `(550, 585)` in SVG coordinates and its size is `260 × 200`.

First convert those SVG coordinates to pixels within the measured scene. Then calculate a scale large enough to fill both viewport dimensions, with 8% extra coverage:

```ts
const scale =
  Math.max(innerWidth / opening.width, innerHeight / opening.height) *
  doorGeometry.zoomCoverage;

const x = innerWidth / 2 - box.left - scale * opening.x;
const y = innerHeight / 2 - box.top - scale * opening.y;
```

With transform origin `(0, 0)`, `translate(x, y) scale(scale)` maps the target's center to the viewport center. The left and right scenes have different `box.left` values, so their translations differ. This enlarges the frame and interior together rather than scaling only the moving panel or zooming around the homepage center.

Keep the scene free of transformed ancestors if reusing it elsewhere: those can change how fixed positioning works.

## Completion, fallbacks and cleanup

Two guards stop the camera and navigation from running twice. The selection ref locks immediately, before React's next render, which also protects rapid double-clicks.

The normal path uses actual completion events. A timer at `openMs + openingGraceMs` starts zoom if the panel's completion event is missing. A separate 1500ms deadline navigates if the camera completion never arrives. Once finishing has begun, the normal fade timer owns navigation.

Unmounting clears timers, cancels the camera animation and stops/releases audio. Home links and browser Back remount a fresh entrance page, clearing the selection. Scrolling to the top happens after route changes, never during the doorway opening.

## MP3 playback and sound preference

The recording lives at [public/audio/door-knock.mp3](public/audio/door-knock.mp3). See [ATTRIBUTION.md](ATTRIBUTION.md) for the source, creator, CC0 license and reproducible preparation script.

The page renders one hidden `<audio preload="auto">` element. Preloading does not play it. The sound hook assigns the local source, and `playKnock()` runs only from the committed user activation. It resets the playback position, sets a moderate volume and calls `audio.play()` without waiting for it. Loading, decoding or autoplay failures are caught and cannot delay entry.

The selection lock means repeated activations do not trigger additional playback. Turning sound off pauses and resets it. Unmounting also removes the source and calls `load()` to cancel pending media work. The hook restores its source in effect setup because React StrictMode repeats setup/cleanup during development.

The Sound button uses `aria-pressed`. Its preference is stored under the existing `threefold-sound` localStorage key to preserve previous choices. Storage access is guarded; blocked storage only prevents persistence. Arrival, hovering, focusing and toggling sound on do not play the recording.

## Reduced motion

When `prefers-reduced-motion: reduce` matches, the entry hook skips scene pinning, large rotation and zoom. A 320ms color wash leads to the same route. CSS disables preview movement and keeps service information visible before activation. The destination uses a shorter reveal.

Sound preference is independent of motion preference. Because navigation cleans up audio, the recording may be cut short during the reduced-motion route change; navigation never waits for audio to finish.

## Customization

- **Angles and timing:** edit `motion` in [animation.ts](src/config/animation.ts). Keep `fallbackMs` longer than the intended opening + zoom + fade sequence.
- **Hinge and zoom target:** edit `doorGeometry` in that file only when changing SVG geometry. Keep the target rectangle inside the opening.
- **Labels, colors, content and destinations:** edit [specialties.ts](src/config/specialties.ts). Changing a configured route also changes the route registered by `App.tsx`.
- **Badge names:** edit `serviceGroups` in the same configuration file. Edit icon shapes in [ServiceBadge.tsx](src/components/ServiceBadge.tsx).
- **Sound:** replace the actual MP3 file and update [ATTRIBUTION.md](ATTRIBUTION.md). Filename and volume are in `soundSettings` in [knockPlayer.ts](src/audio/knockPlayer.ts). Keep it short so normal entry can finish naturally before navigation.
- **Spacing, lighting and responsive layout:** edit the clearly grouped rules in [styles.css](src/styles.css). Preserve `.scene-slot` and the common aspect ratio.
- **Header logo:** [Header.tsx](src/components/Header.tsx) references the supplied SVG directly. Its dimensions are controlled by `.brand-logo`; `width: auto` preserves the aspect ratio.

The flat reference cannot supply exact bevels, textures or the back of an open door. Those materials are simplified gradients and glow, and backface visibility hides the panel past 90 degrees. The camera is a 2D transform of layered artwork, not a model of a real room. Dynamic viewport resizing halfway through entry and cross-browser rendering still deserve testing before production.
