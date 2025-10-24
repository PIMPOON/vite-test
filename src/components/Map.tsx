export const Map = () => {
  const QUERY = import.meta.env.VITE_MAP_QUERY || 'Mirabel-En-Haut, QC'
  const EMBED =
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
    `https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&hl=en&z=14&output=embed`
  const MAPS_LINK =
    import.meta.env.VITE_GOOGLE_MAPS_URL ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(QUERY)}`
  const DIR_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(QUERY)}`

  return (
    <section id="location" className="section">
      <div className="container">
        <div style={{ display: 'grid', gap: 10, marginBottom: 10 }}>
          <h2 style={{ margin: 0 }}>Find us</h2>
          <p className="text-muted" style={{ margin: 0 }}>
            View our location on Google Maps.
          </p>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Responsive map wrapper */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <iframe
              title="Studio location on Google Maps"
              src={EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                filter: 'contrast(1.02) saturate(1.02)',
              }}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
              borderTop: '1px solid var(--border)',
            }}
          >
            <div className="text-muted" style={{ fontWeight: 700 }}>
              {QUERY}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                <button>Open in Google Maps</button>
              </a>
              <a href={DIR_LINK} target="_blank" rel="noreferrer">
                <button className="btn-secondary">Get directions</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
