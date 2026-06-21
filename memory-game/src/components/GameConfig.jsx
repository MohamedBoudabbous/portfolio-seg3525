import Icon from "./Icon";
import Leaderboard from "./Leaderboard";
import ModeSelector from "./ModeSelector";

import {
  DEFAULT_LEVEL_ID,
  LEVEL_OPTIONS,
  getLevelById
} from "../data/levels";

import {
  DEFAULT_THEME_ID,
  THEME_OPTIONS,
  getThemeById
} from "../data/themes";

import {
  DEFAULT_MODE_ID,
  getModeById
} from "../data/modes";

export default function GameConfig({
  selectedModeId = DEFAULT_MODE_ID,
  selectedLevelId = DEFAULT_LEVEL_ID,
  selectedThemeId = DEFAULT_THEME_ID,
  onModeChange,
  onLevelChange,
  onThemeChange,
  onStartGame
}) {
  const selectedMode = getModeById(selectedModeId);
  const selectedLevel = getLevelById(selectedLevelId);
  const selectedTheme = getThemeById(selectedThemeId);

  function handleStartGame() {
    onStartGame?.({
      modeId: selectedMode.id,
      levelId: selectedLevel.id,
      themeId: selectedTheme.id
    });
  }

  return (
    <main
      className="game-config"
      aria-labelledby="game-config-title"
      style={{ "--theme-accent": selectedTheme.accent }}
    >
      <section className="config-hero">
        <div className="config-hero-copy">
          <p className="eyebrow">Interactive cognitive training</p>

          <h1 id="game-config-title">Configure your memory session</h1>

          <p className="hero-description">
            Choose a challenge, adjust the difficulty, select a visual theme,
            and start training your memory with a clean SVG-based interface.
          </p>
        </div>

        <div className="config-summary-card" aria-label="Current configuration">
          <div className="summary-card-header">
            <span className="summary-card-icon" aria-hidden="true">
              <Icon name="brain" size={28} />
            </span>

            <div>
              <strong>Current setup</strong>
              <span>Ready to start</span>
            </div>
          </div>

          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-icon" aria-hidden="true">
                <Icon name={selectedMode.iconName} size={18} />
              </span>
              <span>
                Mode <strong>{selectedMode.name}</strong>
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-icon" aria-hidden="true">
                <Icon name={selectedLevel.iconName} size={18} />
              </span>
              <span>
                Level <strong>{selectedLevel.name}</strong>
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-icon" aria-hidden="true">
                <Icon name={selectedTheme.iconName} size={18} />
              </span>
              <span>
                Theme <strong>{selectedTheme.name}</strong>
              </span>
            </div>
          </div>

          <button
            className="primary-button config-start-button"
            type="button"
            onClick={handleStartGame}
          >
            <Icon name="play" size={18} />
            <span>Start Game</span>
          </button>
        </div>
      </section>

      <ModeSelector
        selectedModeId={selectedMode.id}
        onModeChange={onModeChange}
        enabledModeIds={["classic"]}
      />

      <section className="config-section" aria-labelledby="level-section-title">
        <div className="section-heading">
          <p className="eyebrow">Difficulty</p>
          <h2 id="level-section-title">Choose a level</h2>
          <p className="section-description">
            Higher levels increase the number of cards and the amount of visual
            information to remember.
          </p>
        </div>

        <div className="option-grid level-grid" role="list">
          {LEVEL_OPTIONS.map((level) => {
            const isSelected = selectedLevel.id === level.id;

            const className = [
              "config-option-card",
              "level-option-card",
              isSelected ? "config-option-card-selected" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div className="config-option-wrapper" role="listitem" key={level.id}>
                <button
                  className={className}
                  type="button"
                  onClick={() => onLevelChange?.(level.id)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${level.name} difficulty`}
                >
                  <span className="option-card-topline">
                    <span className="option-card-icon" aria-hidden="true">
                      <Icon name={level.iconName} size={24} />
                    </span>

                    <span className="option-card-badge">
                      {level.gridLabel}
                    </span>
                  </span>

                  <span className="option-card-content">
                    <strong>{level.name}</strong>
                    <span>{level.description}</span>
                  </span>

                  <span className="option-card-footer">
                    <span>
                      Cards: <strong>{level.totalCards}</strong>
                    </span>

                    <span>
                      Pairs: <strong>{level.pairsCount}</strong>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="config-section" aria-labelledby="theme-section-title">
        <div className="section-heading">
          <p className="eyebrow">Visual theme</p>
          <h2 id="theme-section-title">Choose a symbol set</h2>
          <p className="section-description">
            Each theme uses a consistent SVG symbol system to support fast
            recognition without relying on platform-dependent emojis.
          </p>
        </div>

        <div className="option-grid theme-grid" role="list">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = selectedTheme.id === theme.id;

            const className = [
              "config-option-card",
              "theme-option-card",
              isSelected ? "config-option-card-selected" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div className="config-option-wrapper" role="listitem" key={theme.id}>
                <button
                  className={className}
                  type="button"
                  onClick={() => onThemeChange?.(theme.id)}
                  aria-pressed={isSelected}
                  aria-label={`Select ${theme.name} theme`}
                  style={{ "--theme-accent": theme.accent }}
                >
                  <span className="option-card-topline">
                    <span className="option-card-icon" aria-hidden="true">
                      <Icon name={theme.iconName} size={24} />
                    </span>

                    <span className="theme-color-dot" aria-hidden="true" />
                  </span>

                  <span className="option-card-content">
                    <strong>{theme.name}</strong>
                    <span>{theme.description}</span>
                  </span>

                  <span className="option-card-footer">
                    <span>
                      Focus: <strong>{theme.memoryFocus}</strong>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <Leaderboard
        modeId={selectedMode.id}
        levelId={selectedLevel.id}
        modeName={selectedMode.name}
        levelName={selectedLevel.name}
      />
    </main>
  );
}