import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * SPIS TrendChart
 * Reusable multi-series line/area chart (actual vs predicted) with a full grid.
 *
 * data:    [{ date: 'May 15', actual: 52, predicted: null }, ...]
 * series:  [{ key, name, color, dashed, area, dots }]
 *
 * Null/undefined values break the line, so an "actual" series can stop where
 * the "predicted" series begins (give both the same value on the junction point).
 */

const TEAL = '#00BFA5';

export const DEFAULT_TREND_SERIES = [
  { key: 'actual', name: 'Actual Polarization', color: TEAL, area: true, dots: true },
  {
    key: 'predicted',
    name: 'Predicted (Next 7 Days)',
    color: TEAL,
    dashed: true,
    area: true,
    dots: true,
  },
];

const isNum = (v) => typeof v === 'number' && !Number.isNaN(v);

/** Legend — export separately so it can sit in a Card header, as in the design. */
export function TrendChartLegend({ series = DEFAULT_TREND_SERIES, className = '' }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {series.map((s) => (
        <div key={s.key} className="flex items-center gap-2">
          <svg width="20" height="4" aria-hidden="true">
            <line
              x1="0"
              y1="2"
              x2="20"
              y2="2"
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={s.dashed ? '4 3' : undefined}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[11px] text-slate-400 whitespace-nowrap">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart({
  data = [],
  series = DEFAULT_TREND_SERIES,
  height = 220,
  yMin = 0,
  yMax = 100,
  yStep = 20,
  showGrid = true,
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(720);
  const [hoverIdx, setHoverIdx] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const update = () => setWidth(Math.max(320, el.clientWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const padL = 44;
  const padR = 26;
  const padT = 12;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const n = data.length;

  const getX = (i) => (n <= 1 ? padL + plotW / 2 : padL + (i / (n - 1)) * plotW);
  const getY = (v) => {
    const c = Math.max(yMin, Math.min(yMax, v));
    return padT + plotH - ((c - yMin) / (yMax - yMin)) * plotH;
  };
  const baseY = getY(yMin);

  const yTicks = [];
  for (let t = yMin; t <= yMax; t += yStep) yTicks.push(t);

  // Avoid overlapping x labels on narrow screens
  const labelEvery = Math.max(1, Math.ceil(46 / (plotW / Math.max(1, n - 1))));

  // Split a series into continuous runs of numeric values
  const buildRuns = (key) => {
    const runs = [];
    let cur = [];
    data.forEach((d, i) => {
      if (isNum(d[key])) {
        cur.push({ x: getX(i), y: getY(d[key]), i, v: d[key] });
      } else if (cur.length) {
        runs.push(cur);
        cur = [];
      }
    });
    if (cur.length) runs.push(cur);
    return runs;
  };

  const seriesRuns = series.map((s) => ({ ...s, runs: buildRuns(s.key) }));

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (n === 0) return;
    const idx = Math.round(((x - padL) / plotW) * (n - 1));
    setHoverIdx(Math.max(0, Math.min(n - 1, idx)));
  };

  const hoverX = hoverIdx !== null ? getX(hoverIdx) : null;
  const tipLeft = hoverX !== null ? Math.min(Math.max(hoverX, 70), width - 70) : 0;

  return (
    <div className={`w-full select-none ${className}`}>
      <div ref={wrapRef} className="relative w-full" style={{ height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block overflow-visible"
          role="img"
          aria-label="Polarization trend chart"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`${uid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.1" />
              </linearGradient>
            ))}
          </defs>

          {/* Horizontal grid + Y labels */}
          {yTicks.map((t) => (
            <g key={`h-${t}`}>
              {showGrid && (
                <line
                  x1={padL}
                  x2={padL + plotW}
                  y1={getY(t)}
                  y2={getY(t)}
                  stroke="#283246"
                  strokeWidth="1"
                />
              )}
              <text
                x={padL - 10}
                y={getY(t) + 4}
                textAnchor="end"
                fill="#4E5C71"
                fontSize="11"
              >
                {t}
              </text>
            </g>
          ))}

          {/* Vertical grid (one per data point) + X labels */}
          {data.map((d, i) => (
            <g key={`v-${i}`}>
              {showGrid && (
                <line
                  x1={getX(i)}
                  x2={getX(i)}
                  y1={padT}
                  y2={baseY}
                  stroke="#283246"
                  strokeWidth="1"
                />
              )}
              {i % labelEvery === 0 && (
                <text
                  x={getX(i)}
                  y={height - 8}
                  textAnchor="middle"
                  fill="#4E5C71"
                  fontSize="11"
                >
                  {d.date}
                </text>
              )}
            </g>
          ))}

          {/* Area fills */}
          {seriesRuns.map(
            (s) =>
              s.area &&
              s.runs.map((run, ri) => {
                if (run.length < 2) return null;
                const line = run.map((p, k) => `${k ? 'L' : 'M'} ${p.x},${p.y}`).join(' ');
                return (
                  <path
                    key={`a-${s.key}-${ri}`}
                    d={`${line} L ${run[run.length - 1].x},${baseY} L ${run[0].x},${baseY} Z`}
                    fill={`url(#${uid}-${s.key})`}
                  />
                );
              })
          )}

          {/* Lines */}
          {seriesRuns.map((s) =>
            s.runs.map((run, ri) =>
              run.length < 2 ? null : (
                <path
                  key={`l-${s.key}-${ri}`}
                  d={run.map((p, k) => `${k ? 'L' : 'M'} ${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={s.dashed ? '6 6' : undefined}
                />
              )
            )
          )}

          {/* Hover guide */}
          {hoverX !== null && (
            <line
              x1={hoverX}
              x2={hoverX}
              y1={padT}
              y2={baseY}
              stroke={TEAL}
              strokeOpacity="0.5"
              strokeWidth="1"
            />
          )}

          {/* Dots (skip a dot if an earlier series already drew one at the same spot) */}
          {seriesRuns.map((s, si) =>
            s.dots
              ? s.runs.flat().map((p) => {
                  const dup = seriesRuns
                    .slice(0, si)
                    .some((o) => o.dots && isNum(data[p.i][o.key]) && data[p.i][o.key] === p.v);
                  if (dup) return null;
                  const active = hoverIdx === p.i;
                  return (
                    <circle
                      key={`d-${s.key}-${p.i}`}
                      cx={p.x}
                      cy={p.y}
                      r={active ? 5 : 3.5}
                      fill={s.color}
                      stroke={active ? '#111827' : 'none'}
                      strokeWidth="2"
                    />
                  );
                })
              : null
          )}
        </svg>

        {/* Tooltip */}
        {hoverIdx !== null && data[hoverIdx] && (
          <div
            className="absolute z-20 pointer-events-none px-3 py-2 rounded-lg bg-[#0B0F19] border border-[#1E2638] shadow-lg text-[11px] text-white"
            style={{ left: tipLeft, top: 0, transform: 'translate(-50%, 4px)' }}
          >
            <div className="font-semibold text-slate-300 mb-1">{data[hoverIdx].date}</div>
            {series.map((s) =>
              isNum(data[hoverIdx][s.key]) ? (
                <div key={s.key} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-slate-400">{s.name}:</span>
                  <span className="font-mono font-semibold">{data[hoverIdx][s.key]}</span>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
