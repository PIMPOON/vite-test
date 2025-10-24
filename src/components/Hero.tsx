export const Hero = () => {
  const openContact = () => {
    window.dispatchEvent(new CustomEvent('open-contact'))
  }

  return (
    <>
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand">
            <span className="brand-mark" />
            <span>Studio Xenon</span>
          </div>
          <nav className="nav-links">
            {/* <a href="#services">Services</a>
            <a href="#work">Portfolio</a>
            <a href="#materials">Materials</a> */}
            {/* <a href="#about">About</a> */}
            <button onClick={openContact} className="btn-contact">
              Contact
            </button>
          </nav>
        </div>
      </header>

      <section className="section hero">
        <div className="container">
          <div className="hero-kicker">
            <span className="kicker-dot" />
            Premium 3D & Interactive
          </div>
          <h1>
            Visuals that move your brand. <strong>Renders that sell the product.</strong>
          </h1>
          <p className="text-muted" style={{ marginTop: 10 }}>
            I help forward-thinking teams craft high-impact 3D visuals, product renders and interactive
            experiences for web, marketing and industry.
          </p>          
        </div>
      </section>
    </>
  );
};