// Graphiques SVG rendus côté serveur (aucun JS client).
// Palette validée (contraste, daltonisme) : bleu, or, violet.

const PALETTE = ["#2B6CB0", "#A87B1F", "#8A5FB0"];
const INK = "#1B2A3E";
const MUTED = "#6B7A90";
const GRID = "#E3E7EE";

const fmt = (v: number, unit: string) => {
  if (unit === "€") return new Intl.NumberFormat("fr-FR").format(Math.round(v)) + " €";
  if (unit === "%") return v.toLocaleString("fr-FR") + " %";
  return v.toLocaleString("fr-FR") + (unit.startsWith("/") ? " " + unit : unit ? " " + unit : "");
};

export type BarProps = {
  title: string;
  unit: string;
  categories: string[];
  series: { name: string; color?: string; values: number[] }[];
  max?: number;
  compact?: boolean; // version tuile : sans titre ni tableau
};

/** Barres horizontales, 1 à 3 séries, étiquettes directes, légende si ≥ 2 séries. */
export function BarChart({ title, unit, categories, series, max, compact }: BarProps) {
  const allVals = series.flatMap((s) => s.values);
  const maxV = max ?? Math.max(...allVals.map(Math.abs)) * 1.12;
  const minV = Math.min(0, ...allVals);
  const labelW = compact ? 118 : 210;
  const width = compact ? 440 : 720;
  const barH = compact ? 20 : 18;
  const gap = compact ? 3 : 2;
  const groupH = series.length * (barH + gap) + (compact ? 14 : 18);
  const height = categories.length * groupH + 8;
  const plotW = width - labelW - (compact ? 72 : 90);
  const zeroX = labelW + (minV < 0 ? (-minV / (maxV - minV)) * plotW : 0);
  const scale = plotW / (maxV - minV);

  return (
    <figure className="chart">
      {!compact && <figcaption className="chart-title">{title}</figcaption>}
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label={title}>
        <line x1={zeroX} y1={0} x2={zeroX} y2={height} stroke={GRID} strokeWidth="1" />
        {categories.map((cat, i) => (
          <g key={cat} transform={`translate(0, ${i * groupH + 4})`}>
            <text x={labelW - 10} y={(series.length * (barH + gap)) / 2 + 4} textAnchor="end" fontSize={compact ? 12 : 12.5} fill={INK} fontFamily="inherit">
              {cat.length > (compact ? 18 : 34) ? cat.slice(0, compact ? 17 : 33) + "…" : cat}
            </text>
            {series.map((s, j) => {
              const v = s.values[i];
              const w = Math.abs(v) * scale;
              const x = v >= 0 ? zeroX : zeroX - w;
              const y = j * (barH + gap);
              const color = s.color ?? PALETTE[j % PALETTE.length];
              return (
                <g key={s.name}>
                  <rect x={x} y={y} width={Math.max(w, 0)} height={barH} fill={color} rx={v >= 0 ? 0 : 3}>
                    <title>{`${cat} — ${s.name} : ${fmt(v, unit)}`}</title>
                  </rect>
                  {w > 0 && <rect x={v >= 0 ? x + w - 3 : x} y={y} width={3} height={barH} fill={color} rx={3} />}
                  <text x={v >= 0 ? x + w + 8 : x - 8} y={y + barH / 2 + 4} textAnchor={v >= 0 ? "start" : "end"} fontSize={compact ? 12 : 12} fill={INK} fontWeight="600" fontFamily="inherit">
                    {fmt(v, unit)}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
      {series.length > 1 && (
        <div className="chart-legend">
          {series.map((s, j) => (
            <span key={s.name}><i style={{ background: s.color ?? PALETTE[j % PALETTE.length] }} />{s.name}</span>
          ))}
        </div>
      )}
      {!compact && (
        <details className="chart-table">
          <summary>Voir les données en tableau</summary>
          <table>
            <thead><tr><th></th>{series.map((s) => <th key={s.name}>{s.name}</th>)}</tr></thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c}><td>{c}</td>{series.map((s) => <td key={s.name}>{fmt(s.values[i], unit)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </figure>
  );
}

export type RadarProps = {
  title: string;
  axes: string[];
  series: { name: string; color?: string; values: number[] }[];
  max: number;
};

/** Radar : chaque série est un polygone semi-transparent, la référence (max) en pointillé. */
export function RadarChart({ title, axes, series, max }: RadarProps) {
  const W = 600, H = 400;
  const cx = W / 2, cy = H / 2, r = 135;
  const n = axes.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, v: number) => {
    const a = angle(i), rr = (v / max) * r;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)] as const;
  };
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <figure className="chart">
      <figcaption className="chart-title">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 640, margin: "0 auto", display: "block" }} role="img" aria-label={title}>
        {rings.map((k) => (
          <polygon key={k} points={axes.map((_, i) => pt(i, max * k).join(",")).join(" ")} fill="none" stroke={k === 1 ? INK : GRID} strokeWidth={k === 1 ? 1.2 : 1} strokeDasharray={k === 1 ? "4 4" : undefined} />
        ))}
        {axes.map((_, i) => { const [x, y] = pt(i, max); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={GRID} />; })}
        {series.map((s, j) => {
          const color = s.color ?? PALETTE[j % PALETTE.length];
          const pts = s.values.map((v, i) => pt(i, v));
          return (
            <g key={s.name}>
              <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={color} fillOpacity="0.14" stroke={color} strokeWidth="2" strokeLinejoin="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="4.5" fill={color} stroke="#fff" strokeWidth="2">
                  <title>{`${s.name} — ${axes[i]} : ${s.values[i].toLocaleString("fr-FR")} / ${max}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
        {axes.map((a, i) => {
          const [x, y] = pt(i, max * 1.16);
          const anchor = Math.abs(x - cx) < 8 ? "middle" : x > cx ? "start" : "end";
          const words = a.split(" / ");
          return (
            <text key={a} x={x} y={y} textAnchor={anchor} fontSize="11.5" fill={MUTED} fontFamily="inherit">
              {words.map((w, k) => <tspan key={k} x={x} dy={k === 0 ? 0 : 13}>{w}</tspan>)}
            </text>
          );
        })}
      </svg>
      <div className="chart-legend">
        {series.map((s, j) => (
          <span key={s.name}><i style={{ background: s.color ?? PALETTE[j % PALETTE.length] }} />{s.name}</span>
        ))}
        <span><i style={{ background: "none", border: `1.5px dashed ${INK}` }} />Référence ({max} / {max})</span>
      </div>
      <details className="chart-table">
        <summary>Voir les données en tableau</summary>
        <table>
          <thead><tr><th></th>{series.map((s) => <th key={s.name}>{s.name}</th>)}</tr></thead>
          <tbody>
            {axes.map((a, i) => (
              <tr key={a}><td>{a}</td>{series.map((s) => <td key={s.name}>{s.values[i].toLocaleString("fr-FR")}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

export const CHART_CSS = `
  .chart { margin: 28px 0; padding: 22px 22px 16px; background: #fff; border: 1px solid #e6e9ee; border-radius: 12px; }
  .chart-title { font-size: 14px; font-weight: 700; color: #1B2A3E; margin: 0 0 14px; }
  .chart-legend { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 10px; font-size: 13px; color: #2E4A6B; }
  .chart-legend i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 7px; vertical-align: -1px; }
  .chart-table { margin-top: 12px; font-size: 13px; }
  .chart-table summary { cursor: pointer; color: #8A9BB0; }
  .chart-table table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  .chart-table th, .chart-table td { text-align: left; padding: 6px 8px; border-bottom: 1px solid #eef0f4; color: #2E4A6B; }
  .chart-table th { color: #1B2A3E; font-weight: 700; }
`;
