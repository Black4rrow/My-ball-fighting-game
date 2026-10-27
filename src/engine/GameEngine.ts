import { Ball } from "../model/Ball";
import { WORLD_SIZE } from "./Constants";
import { Vector2 } from "./Vector2";
import { World } from "./World";

class GameEngine {
    canvas: HTMLCanvasElement | undefined
    private context: CanvasRenderingContext2D | null = null
    world: World = new World
    balls: Ball[] = []

    private gamePaused_: boolean = true
    get gamePaused() {
        return this.gamePaused_
    }

    constructor() {
        console.log("===== GameEngine construit =====")
        let testBall = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall.direction = new Vector2(Math.random(), Math.random())
        this.addBall(testBall)

        let testBall2 = new Ball(new Vector2(Math.random()*(WORLD_SIZE-100), Math.random()*(WORLD_SIZE-100)))
        testBall.direction = new Vector2(Math.random(), Math.random())
        this.addBall(testBall2)
    }


    plugCanvas(canvas: HTMLCanvasElement | undefined) {
        this.canvas = canvas
        if (canvas !== undefined) {
            canvas.width = WORLD_SIZE
            canvas.height = WORLD_SIZE
            this.world.worldSize = new Vector2(WORLD_SIZE, WORLD_SIZE)
            this.context = canvas.getContext("2d")
        }else{
            this.context = null
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

        this.render()
        this.loopId = requestAnimationFrame(() => {this.gameLoop()})
    }

    step(dt: number) {
        this.balls.forEach(ball => {
            ball.step(dt, this.world)
        });
    }

    render() {
        if (this.canvas !== undefined && this.context !== null) {
            const context = this.context

            context.clearRect(0,0,this.world.worldSize.x, this.world.worldSize.y)
            this.balls.forEach(ball => {
                ball.render(context)
            });
        }
    }
}

export default GameEngine