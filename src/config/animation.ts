export const motion = {
  previewAngle: '-36deg',
  previewMs: 380,
  openAngle: '-106deg',
  openMs: 460,
  zoomMs: 650,
  fadeMs: 160,
  fallbackMs: 1500,
  openingGraceMs: 70,
  reducedMotionMs: 320,
  zoomEasing: 'cubic-bezier(.65,0,.3,1)',
};

// The target rectangle fits wholly within the doorway below its sloping roof.
export const doorGeometry = {
  width: 1040,
  height: 800,
  hingeX: 310,
  targetX: 550,
  targetY: 585,
  targetWidth: 260,
  targetHeight: 200,
  zoomCoverage: 1.08,
};
