import { Container, Graphics, WebGLRenderer } from "pixi.js";
import type { Ball } from "../model/Ball";
import type RendererInterface from "../model/RendererInterface";
import type { World } from "./World";
import { WORLD_SIZE } from "./Constants";

export default class PixiRenderer implements RendererInterface {
    renderer: WebGLRenderer | null = null
    scene: Container | null = null
    ballsMap: Map<Ball, Container> = new Map

    askedForDiconnection: boolean = false
    onCanvasConnected(canvas: HTMLCanvasElement): void {
        this.initRenderer(canvas)
        this.askedForDiconnection = false
    }

    initRenderer(canvas: HTMLCanvasElement) {
        const renderer: WebGLRenderer = new WebGLRenderer
        renderer.init(
            {
                canvas: canvas,
                background: '#696969',
                width: WORLD_SIZE,
                height: WORLD_SIZE
            }
        ).then((_) => {
            if(this.askedForDiconnection) return
            this.renderer = renderer
            this.scene = new Container
        })
    }

    onCanvasDisconnected(): void {
        this.askedForDiconnection = true
        this.ballsMap.forEach((container: Container, ball: Ball) => {container.destroy()})
        this.ballsMap.clear()
        this.renderer?.clear()
        this.renderer?.destroy({removeView: false})
        this.renderer = null
        this.scene?.destroy()
    }
    onFrame(world: World, balls: Ball[]): void {
        if (this.renderer === null || this.scene === null) return
        const scene = this.scene

        this.checkForUnexistingBalls(balls)
        balls.forEach(ball => {
            if(!this.ballsMap.has(ball)) {this.createBallView(ball)}

            const container = this.ballsMap.get(ball)
            if(container !== undefined){
                this.updateBallViewPosition(ball, container)
            }
        });
        this.renderer.render(scene)
    }

    createBallView(ball: Ball) {
        console.log(" ----- Creating ball -----")
        const container = new Container
        const ballGraphics = new Graphics()
            .circle(0, 0, ball.radius)
            .fill(ball.color.toString())
            .setStrokeStyle({ width: 3, color: '#000000' })
            .stroke()
        container.addChild(ballGraphics)

        this.ballsMap.set(ball, container)
        this.scene?.addChild(container)
    }

    updateBallViewPosition(ball: Ball, container: Container) {
        console.log(" ----- Updating ball -----")
        container.position.set(ball.center.x, ball.center.y)
    }

    checkForUnexistingBalls(balls: Ball[]) {
        if (this.scene === null) return
        const scene = this.scene
        const set: Set<Ball> = new Set(balls)
        this.ballsMap.forEach((container: Container, ball: Ball) => {
            if (!set.has(ball)) {
                console.log(" ----- Deleting ball -----")
                scene.removeChild(container)
                container.destroy()
                this.ballsMap.delete(ball)
            }
        });

    }

}