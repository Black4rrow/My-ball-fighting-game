import { useEffect, useRef } from 'react';
import GameEngine from '../engine/GameEngine';

export declare interface GameCanvasProps{
  gameEngine: GameEngine
}

function GameCanvas({gameEngine}:GameCanvasProps) {

  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gameEngine.plugCanvas(canvas.current? canvas.current : undefined)
    return () => {
      gameEngine.plugCanvas(undefined)
    }
  }, [gameEngine])
  return (
    <>
      <canvas ref={canvas} className="border-2 border-black aspect-square min-w-24 max-h-[50%]">

      </canvas>
    </>
  )
}

export default GameCanvas
