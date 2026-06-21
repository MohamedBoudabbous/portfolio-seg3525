import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameConfig from "./components/GameConfig";
import Header from "./components/Header";

import { DEFAULT_LEVEL_ID } from "./data/levels";
import { DEFAULT_MODE_ID } from "./data/modes";
import { DEFAULT_THEME_ID } from "./data/themes";

const SCREENS = {
  config: "config",
  playing: "playing"
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.config);
  const [modeId, setModeId] = useState(DEFAULT_MODE_ID);
  const [levelId, setLevelId] = useState(DEFAULT_LEVEL_ID);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);

  function handleStartGame(settings) {
    setModeId(settings.modeId);
    setLevelId(settings.levelId);
    setThemeId(settings.themeId);
    setScreen(SCREENS.playing);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBackToConfig() {
    setScreen(SCREENS.config);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell" id="top">
      <Header
        statusLabel={screen === SCREENS.playing ? "Game in progress" : "Setup"}
        showBackButton={screen === SCREENS.playing}
        onBackToConfig={handleBackToConfig}
      />

      {screen === SCREENS.config && (
        <GameConfig
          selectedModeId={modeId}
          selectedLevelId={levelId}
          selectedThemeId={themeId}
          onModeChange={setModeId}
          onLevelChange={setLevelId}
          onThemeChange={setThemeId}
          onStartGame={handleStartGame}
        />
      )}

      {screen === SCREENS.playing && (
        <main className="game-screen">
          <GameBoard
            key={`${modeId}-${levelId}-${themeId}`}
            modeId={modeId}
            levelId={levelId}
            themeId={themeId}
            onBackToConfig={handleBackToConfig}
          />
        </main>
      )}
    </div>
  );
}