import { useRef } from "react";
import GameCanvas from "./components/GameCanvas";
import GameEngine from "./engine/GameEngine";
import type RendererInterface from "./model/RendererInterface";
import Canvas2DRenderer from "./model/Canvas2DRenderer";

function App() {
  const gameEngineRef = useRef<GameEngine>(null);
  if (gameEngineRef.current === null) {
    const renderer: RendererInterface = new Canvas2DRenderer
    gameEngineRef.current = new GameEngine(renderer);
  }
  const gameEngine = gameEngineRef.current
  return (
    <>
      <section className="flex flex-col items-center h-dvh space-y-1">
        <GameCanvas gameEngine={gameEngine} />
        <button className="border border-b-gray-900 rounded-sm p-2 cursor-pointer hover:bg-green-400/25" onClick={() => {gameEngine.togglePause(false)}}>
          Start Game (test)
        </button>
      </section>
    </>
  );
}

export default App;
