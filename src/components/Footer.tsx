export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>© {new Date().getFullYear()} Studio Xenon</span>
        <span className="text-muted">3D Design • Renders • Interactive</span>
      </div>
    </footer>
  );
}
