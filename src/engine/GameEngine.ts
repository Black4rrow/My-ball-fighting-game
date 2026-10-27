import { Ball } from "../model/Ball";
import Canvas2DRenderer from "../model/Canvas2DRenderer";
import type RendererInterface from "../model/RendererInterface";
import { WORLD_SIZE } from "./Constants";
import { Vector2 } from "./Vector2";
import { World } from "./World";

class GameEngine {
    canvas: HTMLCanvasElement | undefined
    renderer: RendererInterface
    world: World = new World
    balls: Ball[] = []

    private gamePaused_: boolean = true
    get gamePaused() {
        return this.gamePaused_
    }

    constructor(renderer: RendererInterface) {
        this.renderer = renderer
        console.log("===== GameEngine construit =====")
        const testBall = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall.direction = new Vector2(Math.random(), Math.random())
        this.addBall(testBall)

        const testBall2 = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall2.direction = new Vector2(Math.random(), Math.random())
        this.addBall(testBall2)
    }

    connectCanvas(canvas: HTMLCanvasElement | undefined){
        if(canvas === undefined){
            this.renderer.onCanvasDisconnected()
        }else{
            this.renderer.onCanvasConnected(canvas)
        }
    }

    addBall(ball: Ball) {
        this.balls.push(ball)
        console.log("===== Balle ajoutée =====")
    }
    clearBalls() { this.balls = [] }

    togglePause(value: boolean) {
        this.gamePaused_ = value
        if(value === false){
            this.currentTime = new Date().getTime() / 1000
            this.resumeGameLoop()
        }else{
            this.pauseGameLoop()
        }
    }


    loopOn: boolean = false
    loopId: number | undefined = undefined
    private resumeGameLoop(){
        if (this.loopOn) return
        this.gameLoop()
        this.loopOn = true
    }
    private pauseGameLoop(){
        if (!this.loopOn) return
        if (this.loopId === undefined) return
        cancelAnimationFrame(this.loopId)
        this.loopOn = false
    }
    time: number = 0.0
    dt: number = 0.01
    currentTime: number = new Date().getTime() / 1000
    accumulator: number = 0
    private gameLoop() {
        const newTime: number = new Date().getTime() / 1000
        let frameTime: number = newTime - this.currentTime
        if (frameTime > 0.25)
            frameTime = 0.25;
        this.currentTime = newTime

        this.accumulator += frameTime

        while (this.accumulator >= this.dt) {
            this.step(this.dt)
            this.accumulator -= this.dt
            this.time += this.dt
        }

        this.renderer.onFrame(this.world, this.balls)
        this.loopId = requestAnimationFrame(() => {this.gameLoop()})
    }

    step(dt: number) {
        this.balls.forEach(ball => {
            ball.step(dt, this.world)
        });
    }
}

export default GameEngine