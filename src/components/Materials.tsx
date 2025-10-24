type SpecKey = 'strength' | 'stiffness' | 'flexibility' | 'durability' | 'temperature' 

type MaterialSpec = {
  id: 'PLA' | 'PETG' | 'ABS' | 'TPU'
  color: string
  colorAlt: string
  specs: {
    strength: number       // 0–100
    stiffness: number      // 0–100 (auto-detects 0–10 input)
    flexibility: number    // 0–10
    temperature: number    // °C
    durability: number     // 0–10
  }
}

const MATERIALS: MaterialSpec[] = [
  { id: 'PLA',  color: '#6C8CFF', colorAlt: '#9A6CFF', specs: { strength: 65, stiffness: 7.5, flexibility: 3.1, temperature: 52, durability: 4 } },
  { id: 'PETG', color: '#7ED957', colorAlt: '#9BF871', specs: { strength: 53, stiffness: 5, flexibility: 5.3, temperature: 73, durability: 8 } },
  { id: 'ABS',  color: '#FF8A5B', colorAlt: '#FFB36B', specs: { strength: 40, stiffness: 5, flexibility: 7.8, temperature: 98, durability: 5 } },
  { id: 'TPU',  color: '#FF6FAE', colorAlt: '#FF92D0', specs: { strength: 26, stiffness: 1, flexibility: 536, temperature: 60, durability: 1 } },
]

const METRICS: { key: SpecKey; label: string; type: 'meter' | 'temp'; scaleMax?: number; tooltip: string }[] = [
  { key: 'strength',   label: 'Strength',        type: 'meter', scaleMax: 100, tooltip: "Ability to withstand force without breaking. Higher is stronger." },
  { key: 'stiffness',  label: 'Stiffness',       type: 'meter',                tooltip: "Rigidity and resistance to bending." },
  // { key: 'flexibility',label: 'Flexibility',     type: 'meter', scaleMax: 10,  tooltip: "Ability to bend without breaking. Higher is more flexible." },
  { key: 'durability', label: 'Durability',      type: 'meter', scaleMax: 10,  tooltip: "Resistance to wear and tear over time." },
  { key: 'temperature',label: 'Temp Resistance', type: 'temp',                 tooltip: "Maximum temperature before deformation (°C)." },
];

const MAX_TEMP = 100 // scale for temperature bar widths

export const Materials = () => {
  return (
    <section id="materials" className="section materials">
      <div className="container">
        <div className="materials-head">
          <h2>Materials</h2>
          <p className="text-muted">
          Products are based on a diverse range of high-quality filaments to ensure your project 
          meets the perfect balance of strength, flexibility, and aesthetics.
          </p>
        </div>

        <div className="materials-table-wrap">
          <table className="mtable" role="table" aria-label="Material comparison table">
            <thead>
              <tr>
                <th scope="col" className="spec-head">Material</th>
                {METRICS.map(metric => (
                  <th scope="col" key={metric.key}>
                    <SpecHeader label={metric.label} tip={metric.tooltip} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map(m => (
                <tr key={m.id}>
                  <th scope="row" className="spec-cell">
                    <div className="head-cell">
                      <span
                        className="swatch"
                        style={{ background: `radial-gradient(60% 60% at 40% 40%, ${m.color}, ${m.colorAlt})` }}
                        aria-hidden
                      />
                      <span>{m.id}</span>
                    </div>
                  </th>

                  {METRICS.map(metric => {
                    const raw = m.specs[metric.key]
                    if (metric.type === 'temp') {
                      return (
                        <td key={metric.key}>
                          <TempMini
                            temp={raw as number}
                            color={m.color}
                            colorAlt={m.colorAlt}
                            label={`${m.id} temperature ${raw}°C`}
                          />
                        </td>
                      )
                    }

                    // Meter specs
                    // Determine scale: use configured scaleMax, except stiffness auto-detect 0–10 vs 0–100 input
                    const scaleMax =
                      metric.key === 'stiffness'
                        ? ((raw as number) > 10 ? 100 : 10)
                        : (metric.scaleMax ?? 100)

                    return (
                      <td key={metric.key}>
                        <SegmentMeter
                          value={raw as number}
                          scaleMax={scaleMax}
                          color={m.color}
                          colorAlt={m.colorAlt}
                          segments={5}
                          label={`${m.id} ${metric.label} level ${Math.round(clamp(raw as number, 0, scaleMax) / scaleMax * 10)}/10`}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// Replace previous SegmentMeter with 5-container, scale-aware meter
function SegmentMeter({
  value,
  scaleMax = 100,
  color,
  colorAlt,
  label,
  segments = 5,
}: {
  value: number
  scaleMax?: number
  color: string
  colorAlt: string
  label: string
  segments?: number
}) {
  const v = clamp(value, 0, scaleMax)
  const filled = Math.max(0, Math.min(segments, Math.round((v / scaleMax) * segments)))
  return (
    <div className="segmeter" role="img" aria-label={label}>
      {Array.from({ length: segments }).map((_, i) => {
        const on = i < filled
        return (
          <span
            key={i}
            className={`seg ${on ? 'is-on' : ''}`}
            style={{
              width: '19px', // Adjusted width
              height: '19px', // Adjusted height
              margin: '1px', // Adjusted spacing
              ...(on
                ? {
                    background: `linear-gradient(180deg, ${hexToRgba(color, 0.85)}, ${hexToRgba(colorAlt, 0.9)})`,
                    boxShadow: '0 2px 10px rgba(124,77,255,0.25), inset 0 0 6px rgba(255,255,255,0.15)',
                  }
                : undefined),
            }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

function TempMini({
  temp,
  color,
  colorAlt,
  label,
}: {
  temp: number
  color: string
  colorAlt: string
  label: string
}) {
  const pct = Math.min(100, Math.max(0, Math.round((temp / MAX_TEMP) * 100)))
  return (
    <div className="thermo-mini" role="group" aria-label={label}>
      <span className="temp-chip">{temp}°C</span>
      <div className="thermo-track" aria-hidden="true">
        <div
          className="thermo-val"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${colorAlt})` }}
        />
      </div>
    </div>
  )
}

function SpecHeader({ label, tip }: { label: string; tip: string }) {
  return (
    <div className="spec-tip" role="presentation" title={tip}>
      <span>{label}</span>
      <div className="tip-content" role="tooltip">
        {tip}
        <span className="tip-arrow" aria-hidden></span>
      </div>
    </div>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function hexToRgba(hex: string, alpha = 1) {
  const c = hex.replace('#', '')
  const n = c.length === 3 ? c.split('').map(x => x + x).join('') : c
  const bigint = parseInt(n, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}