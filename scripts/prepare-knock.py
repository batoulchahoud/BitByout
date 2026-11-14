"""Optional asset preparation: pip install imageio-ffmpeg, then run this script."""
from pathlib import Path
import subprocess
import tempfile
import urllib.request

import imageio_ffmpeg

SOURCE = 'https://cdn.freesound.org/previews/830/830321_14812331-hq.mp3'
OUTPUT = Path(__file__).resolve().parents[1] / 'public/audio/door-knock.mp3'

with tempfile.TemporaryDirectory() as directory:
    original = Path(directory) / 'original.mp3'
    urllib.request.urlretrieve(SOURCE, original)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Keep the first recorded pair (impacts around 2.93s and 3.60s), remove silence.
    subprocess.run([
        imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-ss', '2.88', '-i', str(original),
        '-t', '1.0', '-af', 'afade=t=out:st=0.95:d=0.05', '-map_metadata', '-1',
        '-ac', '1', '-ar', '48000', '-codec:a', 'libmp3lame', '-b:a', '128k',
        str(OUTPUT),
    ], check=True)
