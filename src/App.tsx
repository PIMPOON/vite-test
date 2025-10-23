import './App.css'

function App() {
  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand">
            <span className="brand-mark" />
            <span>Studio Vertex</span>
          </div>
          <nav className="nav-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section hero">
          <div className="container">
            <div className="hero-kicker">
              <span className="kicker-dot" />
              Premium 3D & Interactive
            </div>
            <h1>
              Visuals that move your brand. <strong>Renders that sell the product.</strong>
            </h1>
            <p className="text-muted" style={{ marginTop: 10, maxWidth: 720 }}>
              I help forward-thinking teams craft high-impact 3D visuals, product renders and interactive
              experiences for web, marketing and industry.
            </p>
            <div className="hero-actions">
              <a href="#work">
                <button>View selected work</button>
              </a>
              <a className="btn-secondary" href="#contact">
                <button className="btn-secondary">Get in touch</button>
              </a>
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2>Selected Work</h2>
              <span className="text-muted">A glimpse at recent projects</span>
            </div>
            <div className="grid">
              {[
                { title: 'Vertex Lamp', tags: ['Product', 'Lighting', 'Render'] },
                { title: 'XR Pavilion', tags: ['Experiential', 'Realtime'] },
                { title: 'Aero Wheel', tags: ['Automotive', 'Simulation'] },
                { title: 'Soft Fabric', tags: ['Materials', 'Lookdev'] },
                { title: 'Micro Speaker', tags: ['Hardware', 'Exploded'] },
                { title: 'Bottle Study', tags: ['Fluid', 'Caustics'] },
              ].map((item, i) => (
                <article className="tile" key={i} aria-label={item.title}>
                  <div className="thumb" />
                  <h3>{item.title}</h3>
                  <div className="tags">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2 style={{ marginBottom: 18 }}>Services</h2>
            <div className="services">
              <div className="service">
                <h3>Product Rendering</h3>
                <p>Photo-real imagery for campaigns, ecommerce and launch materials.</p>
              </div>
              <div className="service">
                <h3>Realtime & WebGL</h3>
                <p>Interactive 3D for the web, configurators and live demos.</p>
              </div>
              <div className="service">
                <h3>Simulation & Animation</h3>
                <p>Motion, FX and narrative visuals that explain and persuade.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="cta">
              <h2>Got a project in mind?</h2>
              <p className="text-muted">Let’s create something beautiful and effective.</p>
              <a href="mailto:hello@yourdomain.com">
                <button>hello@yourdomain.com</button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>© {new Date().getFullYear()} Studio Vertex</span>
          <span className="text-muted">3D Design • Renders • Interactive</span>
        </div>
      </footer>
    </>
  )
}

export default App
