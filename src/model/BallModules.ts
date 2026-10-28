import type { Ball } from "./Ball";

export interface BallModule {
    onSpawn?(ball: Ball): void
    onCollide?(ball: Ball, target: Ball): void
    onHit?(ball: Ball, target: Ball): void
    onDamaged?(ball: Ball, source: Ball): void
    onWallBounce?(ball: Ball): void
}

export class SpeedModule implements BallModule {
    multiplier: number = 0.1

    onCollide(ball: Ball, target: Ball){
        ball.velocity = ball.velocity.multiply(1 + this.multiplier)
    }
}