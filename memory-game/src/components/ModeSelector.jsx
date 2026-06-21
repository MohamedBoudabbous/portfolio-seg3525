import Icon from "./Icon";

import { MODE_OPTIONS } from "../data/modes";

export default function ModeSelector({
  selectedModeId = "classic",
  onModeChange,
  enabledModeIds = ["classic"]
}) {
  return (
    <section className="mode-selector" aria-labelledby="mode-selector-title">
      <div className="section-heading">
        <p className="eyebrow">Game mode</p>
        <h2 id="mode-selector-title">Choose your memory challenge</h2>
        <p className="section-description">
          Start with Classic Match, then explore more cognitive challenges as
          they become available.
        </p>
      </div>

      <div className="mode-grid" role="list">
        {MODE_OPTIONS.map((mode) => {
          const isSelected = selectedModeId === mode.id;
          const isEnabled = enabledModeIds.includes(mode.id);

          const className = [
            "mode-card",
            isSelected ? "mode-card-selected" : "",
            !isEnabled ? "mode-card-disabled" : ""
          ]
            .filter(Boolean)
            .join(" ");

          function handleSelect() {
            if (!isEnabled) {
              return;
            }

            onModeChange?.(mode.id);
          }

          return (
            <div className="mode-card-wrapper" role="listitem" key={mode.id}>
              <button
                className={className}
                type="button"
                onClick={handleSelect}
                disabled={!isEnabled}
                aria-pressed={isSelected}
                aria-label={
                  isEnabled
                    ? `Select ${mode.name}`
                    : `${mode.name}, coming soon`
                }
              >
                <span className="mode-card-topline">
                  <span className="mode-icon" aria-hidden="true">
                    <Icon name={mode.iconName} size={26} />
                  </span>

                  <span className="mode-status">
                    {isEnabled ? "Playable" : "Coming soon"}
                  </span>
                </span>

                <span className="mode-card-content">
                  <strong className="mode-title">{mode.name}</strong>
                  <span className="mode-tagline">{mode.tagline}</span>
                  <span className="mode-description">{mode.description}</span>
                </span>

                <span className="mode-skills" aria-label="Cognitive skills">
                  {mode.cognitiveSkills.map((skill) => (
                    <span className="skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </span>

                <span className="mode-card-footer">
                  <span>
                    Focus: <strong>{mode.memoryFocus}</strong>
                  </span>

                  <span>
                    Metric: <strong>{mode.primaryMetric}</strong>
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}