import { useRef, useSyncExternalStore } from "react";
import GameCanvas from "./components/GameCanvas";
import GameEngine from "./engine/GameEngine";
import type RendererInterface from "./model/RendererInterface";
import PixiRenderer from "./engine/PixiRenderer";
import BallInfo from "./components/BallInfo";
import uiObserver from "./model/UIObserver";

function App() {
  const gameEngineRef = useRef<GameEngine>(null);
  if (gameEngineRef.current === null) {
    const renderer: RendererInterface = new PixiRenderer();
    gameEngineRef.current = new GameEngine(renderer);
  }
  const gameEngine = gameEngineRef.current;

  const observer = useSyncExternalStore(uiObserver.subscribe, uiObserver.getSnapshot)

  return (
    <>
      <section className="flex flex-col items-center h-dvh space-y-1">
        <div className="">
          <h1 className="font-black text-xl text-center">Epic Balls</h1>
          <p className="text-center">Make your balls fight</p>
        </div>
        <GameCanvas gameEngine={gameEngine} />
        <button
          className="border border-b-gray-900 rounded-sm p-2 cursor-pointer hover:bg-green-400/25"
          onClick={() => {
            gameEngine.togglePause(false);
          }}
        >
          Start Game (test)
        </button>
        <div className="w-full border border-b-gray-800 my-2"></div>
        <section className="">
          <p className="font-bold text-center text-lg">=====|  Balls informations  |=====</p>
          <div className="flex flex-row gap-1">
            {gameEngine.world.balls.map((ball) => (
              <BallInfo key={ball.id} ball={ball} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
