import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, doorGeometry } from '../config/animation';
import type { Specialty } from '../config/specialties';

export function useDoorEntry(onCommit: () => void) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Specialty | null>(null);
  const [fading, setFading] = useState(false);
  const committed = useRef(false);
  const finishing = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scene = useRef<HTMLElement | null>(null);
  const camera = useRef<Animation | null>(null);
  const zooming = useRef(false);
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      camera.current?.cancel();
    },
    [],
  );

  function finish(s: Specialty) {
    if (finishing.current) return;
    finishing.current = true;
    setFading(true);
    timers.current.push(
      setTimeout(
        () => navigate(s.route, { state: { entered: true } }),
        motion.fadeMs,
      ),
    );
  }
  function zoomIntoDoor(s: Specialty) {
    if (zooming.current || finishing.current || !scene.current) return;
    zooming.current = true;
    const element = scene.current;
    const box = element.getBoundingClientRect();
    // This rectangle sits entirely inside the SVG opening, below its sloping roof.
    // Transform origin is (0,0). Translate + scale maps its center to viewport center;
    // scaling to cover both axes moves the frame beyond the viewport, through the room.
    // getBoundingClientRect includes the current scroll position and side-door offset.
    const opening = {
      x: (doorGeometry.targetX / doorGeometry.width) * box.width,
      y: (doorGeometry.targetY / doorGeometry.height) * box.height,
      width: (doorGeometry.targetWidth / doorGeometry.width) * box.width,
      height: (doorGeometry.targetHeight / doorGeometry.height) * box.height,
    };
    const scale =
      Math.max(innerWidth / opening.width, innerHeight / opening.height) *
      doorGeometry.zoomCoverage;
    const x = innerWidth / 2 - box.left - scale * opening.x;
    const y = innerHeight / 2 - box.top - scale * opening.y;
    try {
      camera.current = element.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: `translate(${x}px, ${y}px) scale(${scale})` },
        ],
        {
          duration: motion.zoomMs,
          easing: motion.zoomEasing,
          fill: 'forwards',
        },
      );
      camera.current.onfinish = () => finish(s);
    } catch {
      finish(s);
    }
  }
  function selectDoor(s: Specialty, element: HTMLElement) {
    // The ref locks synchronously, including two activations before React renders.
    // Pointer leave only changes CSS preview; it cannot undo this committed state.
    if (committed.current) return;
    committed.current = true;
    onCommit();
    setSelected(s);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // A brief wash replaces large motion; unmount stops any remaining audio.
      finishing.current = true;
      setFading(true);
      timers.current.push(
        setTimeout(
          () => navigate(s.route, { state: { entered: true } }),
          motion.reducedMotionMs,
        ),
      );
      return;
    }
    const box = element.getBoundingClientRect();
    scene.current = element;
    // Keep the same DOM and exact bounds: no clone, new SVG IDs, or transfer-frame jump.
    // .scene-slot still occupies the original layout space while this scene becomes fixed.
    Object.assign(element.style, {
      position: 'fixed',
      left: `${box.left}px`,
      top: `${box.top}px`,
      width: `${box.width}px`,
      height: `${box.height}px`,
      margin: '0',
      zIndex: '80',
      transformOrigin: '0 0',
    });
    // Normal completion is transitionend -> camera.onfinish -> fade -> route.
    timers.current.push(
      setTimeout(() => zoomIntoDoor(s), motion.openMs + motion.openingGraceMs),
    );
    timers.current.push(
      setTimeout(() => {
        if (!finishing.current) {
          finishing.current = true;
          navigate(s.route, { state: { entered: true } });
        }
      }, motion.fallbackMs),
    );
  }
  return { selected, fading, selectDoor, zoomIntoDoor };
}
