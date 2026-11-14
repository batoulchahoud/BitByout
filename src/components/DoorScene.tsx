import { useId } from 'react';
import type { Specialty } from '../config/specialties';
import { doorGeometry } from '../config/animation';

const frame =
  'M80 510 580 80 855 260Q1040 382 930 710H790V490Q790 440 750 405L580 270 80 700Z';
const panel = 'M310 502 580 270 750 405Q790 440 790 490V710H310Z';

type Props = { specialty: Specialty; selected: boolean; onOpened: () => void };
export function DoorScene({ specialty: s, selected, onOpened }: Props) {
  const id = useId().replace(/:/g, '');
  const paint = (name: string) => `url(#${id}-${name})`;
  return (
    <>
      {/* Every layer uses this same 1040 × 800 coordinate system. No raster crops or patches.
        Only the inner panel and its four windows rotate; the roof and curved frame stay still. */}
      <span className="scene-slot">
        <span className="door-scene" aria-hidden="true">
          <svg
            className="door-layer stationary"
            viewBox={`0 0 ${doorGeometry.width} ${doorGeometry.height}`}
          >
            <defs>
              <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor={s.bright} />
                <stop offset=".22" stopColor={s.deep} />
                <stop offset=".57" stopColor={s.accent} />
                <stop offset=".8" stopColor={s.deep} />
                <stop offset="1" stopColor="#100d1b" />
              </linearGradient>
              <linearGradient id={`${id}-edge`}>
                <stop stopColor={s.accent} />
                <stop offset=".55" stopColor={s.bright} />
                <stop offset="1" stopColor={s.accent} />
              </linearGradient>
              <radialGradient id={`${id}-interior`}>
                <stop stopColor={s.bright} />
                <stop offset=".4" stopColor={s.accent} />
                <stop offset="1" stopColor={s.deep} />
              </radialGradient>
              <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor={s.bright} />
                <stop offset=".45" stopColor={s.accent} />
                <stop offset=".5" stopColor={s.deep} />
                <stop offset="1" stopColor="#110d20" />
              </linearGradient>
              <linearGradient id={`${id}-panel`}>
                <stop stopColor="#14101d" />
                <stop offset=".7" stopColor="#090910" />
                <stop offset="1" stopColor={s.deep} />
              </linearGradient>
              <filter
                id={`${id}-bloom`}
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>
            <path className="interior" d={panel} fill={paint('interior')} />
            <path
              d={frame}
              fill="none"
              stroke={s.accent}
              strokeWidth="9"
              filter={paint('bloom')}
              opacity=".65"
            />
            <path
              d={frame}
              fill={paint('frame')}
              stroke={paint('edge')}
              strokeWidth="3"
            />
            <path
              d="M80 510 580 80 855 260Q1040 382 930 710"
              fill="none"
              stroke={s.bright}
              strokeWidth="2"
            />
            <path
              d="M115 710 310 540V710Z"
              fill={paint('frame')}
              stroke={paint('edge')}
              strokeWidth="3"
            />
          </svg>
          {/* Perspective belongs to the fixed scene. The hinge is x=310/1040 (29.8077%).
          Keeping the transform on this layer prevents hover-target flicker. */}
          <span
            className="moving-panel"
            onTransitionEnd={(event) => {
              if (
                selected &&
                event.target === event.currentTarget &&
                event.propertyName === 'transform'
              )
                onOpened();
            }}
          >
            <svg
              className="door-layer"
              viewBox={`0 0 ${doorGeometry.width} ${doorGeometry.height}`}
            >
              <path
                d={panel}
                fill={paint('panel')}
                stroke={s.accent}
                strokeOpacity=".4"
                strokeWidth="1.5"
              />
              <g className="windows">
                {[470, 585].flatMap((x) =>
                  [450, 560].map((y) => (
                    <g key={`${x}-${y}`}>
                      <rect
                        x={x}
                        y={y}
                        width="83"
                        height="83"
                        fill={s.accent}
                        filter={paint('bloom')}
                        opacity=".55"
                      />
                      <rect
                        x={x}
                        y={y}
                        width="83"
                        height="83"
                        fill={paint('glass')}
                        stroke={s.bright}
                        strokeWidth="3"
                      />
                      <path
                        d={`M${x + 4} ${y + 79}V${y + 4}H${x + 79}`}
                        fill="none"
                        stroke="white"
                        strokeOpacity=".5"
                        strokeWidth="2"
                      />
                    </g>
                  )),
                )}
              </g>
              <circle cx="754" cy="600" r="5" fill={s.bright} />
            </svg>
          </span>
          <span className="ground-light" />
        </span>
      </span>
    </>
  );
}
