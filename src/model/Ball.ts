import Color from "ts-color-class";
import { WORLD_SIZE } from "../engine/Constants";
import { Vector2 } from "../engine/Vector2";
import { World } from "../engine/World";

export class Ball {
    center: Vector2
    velocity: Vector2 = Vector2.ZERO
    radius: number = 50

    color: Color = new Color('#FF0000')

    public constructor(center: Vector2) {
        this.center = center
    }

    step(dt: number, world: World){
        if(this.center.x - this.radius <= 0 || this.center.x + this.radius >= WORLD_SIZE) this.velocity = new Vector2(this.velocity.x * -1, this.velocity.y)
        if(this.center.y - this.radius <= 0 || this.center.y + this.radius >= WORLD_SIZE) this.velocity = new Vector2(this.velocity.x, this.velocity.y * -1)
        this.velocity = this.velocity.add(world.gravity.multiply(dt))
        this.center = this.center.add(this.velocity.multiply(dt))
    }
}

export interface BallModule {
    onSpawn?(ball: Ball): void;
    onUpdate?(ball: Ball, dt: number): void;
    onHit?(ball: Ball, target: Ball): void;
    onDamaged?(ball: Ball, source: Ball): void;
    onWallBounce?(ball: Ball): void;
}