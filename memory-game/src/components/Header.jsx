import Icon from "./Icon";

export default function Header({
  title = "NeuroMatch",
  tagline = "Train your visual memory",
  subtitle = "A cognitive memory game focused on attention, recall, and pattern recognition.",
  showBackButton = false,
  onBackToConfig,
  statusLabel,
  children
}) {
  return (
    <header className="app-header" aria-label="NeuroMatch header">
      <div className="header-main">
        <a className="brand" href="#top" aria-label="Go to NeuroMatch home">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="brain" size={28} />
          </span>

          <span className="brand-copy">
            <span className="brand-title">{title}</span>
            <span className="brand-tagline">{tagline}</span>
          </span>
        </a>

        <div className="header-actions">
          {statusLabel && (
            <span className="status-pill" aria-live="polite">
              {statusLabel}
            </span>
          )}

          {showBackButton && (
            <button
              className="secondary-button header-back-button"
              type="button"
              onClick={onBackToConfig}
            >
              <Icon name="back" size={18} />
              <span>Back to setup</span>
            </button>
          )}

          {children}
        </div>
      </div>

      <div className="header-hero">
        <p className="eyebrow">Memory Training Interface</p>

        <h1>{title}</h1>

        <p className="hero-description">{subtitle}</p>
      </div>
    </header>
  );
}