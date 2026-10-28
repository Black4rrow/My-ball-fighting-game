import type { Ball } from "./Ball";

export interface BallModule {
    onSpawn?(ball: Ball): void
    onCollide?(ball: Ball, target: Ball): void
    onHit?(ball: Ball, target: Ball): void
    onDamaged?(ball: Ball, source: Ball): void
    onWallBounce?(ball: Ball): void
}

export class SpeedModule implements BallModule {
    onCollide(ball: Ball, target: Ball){
        ball.velocityMultiplier += 0.1
    }
}