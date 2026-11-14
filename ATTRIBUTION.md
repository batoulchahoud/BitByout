# Asset attribution

## Door-knock recording

- **Work:** Wooden Door Knock
- **Creator:** AkiYaSuShi
- **Source:** https://freesound.org/people/AkiYaSuShi/sounds/830321/
- **Downloaded MP3 preview:** https://cdn.freesound.org/previews/830/830321_14812331-hq.mp3
- **Published license:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)
- **Retrieved:** 25 October 2026
- **Bundled file:** [public/audio/door-knock.mp3](public/audio/door-knock.mp3)
- **Changes:** Trimmed the first recorded pair from 2.88 to 3.88 seconds, added a 50ms end fade, removed metadata and encoded as mono 48kHz/128kbps MP3. No synthesized knocks were added.

The source page describes two door knocks and publishes the recording under CC0. CC0 permits copying, modification and commercial use without attribution; the credit is retained here for traceability. This is a sourced recording, but its audible naturalness and absence of background noise have not been confirmed by listening in this environment.

To reproduce the bundled asset, install the optional preparation tool with `python -m pip install imageio-ffmpeg` and run `python scripts/prepare-knock.py`. Python/FFmpeg are not required to run or build the website. The script downloads the credited MP3 into a temporary directory and produces the bundled excerpt using FFmpeg.

## Supplied artwork

The BitByout logo and two house references were supplied by the project owner. Their originals remain unchanged in the author's working project; `public/brand/bitbyout-logo.svg` is a byte-for-byte copy of the supplied SVG and is included in the source archive. Unused reference pictures are not included. This file does not assign a new license to supplied brand artwork.

The door layers and service icon drawings are local SVG implementations. Social platform icons identify the corresponding services; the pixel dinosaur is decorative.
