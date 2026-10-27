import type { World } from "../engine/World";
import type { Ball } from "./Ball";

export default interface RendererInterface{
    onCanvasConnected(canvas: HTMLCanvasElement): void
    onCanvasDisconnected(): void
    onFrame(world: World, balls: Ball[]): void
}