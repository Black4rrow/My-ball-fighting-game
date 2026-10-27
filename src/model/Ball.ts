import Color from "ts-color-class";
import { GRAVITY } from "../engine/Constants";
import { Vector2 } from "../engine/Vector2";
import { World } from "../engine/World";

export class Ball {
    center: Vector2
    direction: Vector2 = Vector2.ZERO
    speed: number = 150
    radius: number = 50

    color: Color = new Color('#FF0000')

    public constructor(center: Vector2) {
        this.center = center
    }

    step(dt: number, world: World){
        if(this.center.x - this.radius <= 0 || this.center.x + this.radius >= world.worldSize.x) this.direction = new Vector2(this.direction.x * -1, this.direction.y)
        if(this.center.y - this.radius <= 0 || this.center.y + this.radius >= world.worldSize.y) this.direction = new Vector2(this.direction.x, this.direction.y * -1)
        this.direction = this.direction.add(new Vector2(0, GRAVITY))
        this.center = this.center.add(this.direction.multiply(this.speed * dt))
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath()
        ctx.ellipse(this.center.x, this.center.y, this.radius, this.radius, 0, 0, 2*Math.PI)
        ctx.fillStyle = this.color.toString()
        ctx.strokeStyle = '#000000'
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }
}

export interface BallModule {
    onSpawn?(ball: Ball): void;
    onUpdate?(ball: Ball, dt: number): void;
    onHit?(ball: Ball, target: Ball): void;
    onDamaged?(ball: Ball, source: Ball): void;
    onWallBounce?(ball: Ball): void;
}