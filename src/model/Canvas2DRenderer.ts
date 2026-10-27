import { WORLD_SIZE } from "../engine/Constants";
import { Vector2 } from "../engine/Vector2";
import type { World } from "../engine/World";
import type { Ball } from "./Ball";
import type RendererInterface from "./RendererInterface";

export default class Canvas2DRenderer implements RendererInterface {
    canvas: HTMLCanvasElement | undefined = undefined
    context: CanvasRenderingContext2D | null = null

    onCanvasConnected(canvas: HTMLCanvasElement): void {
        this.canvas = canvas
        this.context = this.canvas.getContext("2d")
        canvas.width = WORLD_SIZE
        canvas.height = WORLD_SIZE
    }

    onCanvasDisconnected(): void {
        this.canvas = undefined
        this.context = null
    }

    onFrame(world: World, balls: Ball[]): void {
        if (this.context === null) return
        const context: CanvasRenderingContext2D = this.context


        context.clearRect(0,0,world.worldSize.x, world.worldSize.y)
        balls.forEach(ball => {
            this.drawBall(context, ball)
        });
    }

    drawBall(ctx:CanvasRenderingContext2D, ball: Ball){
        ctx.beginPath()
        ctx.ellipse(ball.center.x, ball.center.y, ball.radius, ball.radius, 0, 0, 2*Math.PI)
        ctx.fillStyle = ball.color.toString()
        ctx.strokeStyle = '#000000'
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}