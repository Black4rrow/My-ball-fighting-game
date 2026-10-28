import Color from "ts-color-class";
import { Ball } from "../model/Ball";
import type RendererInterface from "../model/RendererInterface";
import { WORLD_SIZE } from "./Constants";
import { Vector2 } from "./Vector2";
import { World } from "./World";
import { ContactDamageModule, SpeedModule } from "../model/BallModules";

class GameEngine {
    renderer: RendererInterface
    world: World = new World

    private gamePaused_: boolean = true
    get gamePaused() {
        return this.gamePaused_
    }

    constructor(renderer: RendererInterface) {
        this.renderer = renderer
        const testBall = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall.velocity = new Vector2((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000)
        testBall.name = "Dummy Ball"
        testBall.setMaxHealth(999999)
        this.addBall(testBall)

        const testBall2 = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall2.velocity = new Vector2((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000)
        testBall2.color = new Color('#00ee22')
        testBall2.modules.push(new SpeedModule)
        testBall2.modules.push(new ContactDamageModule)
        testBall2.name = "Speedy Ball"
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
        this.world.balls.push(ball)
    }
    clearBalls() { this.world.balls = [] }

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

        this.renderer.onFrame(this.world, this.world.balls)
        this.loopId = requestAnimationFrame(() => {this.gameLoop()})
    }

    step(dt: number) {
        this.world.step(dt)
        this.world.balls.forEach(ball => {
            ball.step(dt, this.world)
        });
    }
}

export default GameEngine