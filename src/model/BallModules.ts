import type { Ball } from "./Ball";

export interface BallModule {
    onSpawn?(ball: Ball): void
    onCollide?(ball: Ball, target: Ball): void
    onHit?(ball: Ball, target: Ball): void
    onDamaged?(ball: Ball, value: number): void
    onWallBounce?(ball: Ball): void
}

export class SpeedModule implements BallModule {
    multiplier: number = 0.1
    weightPercentageReductionOnCollide: number = 15

    onCollide(ball: Ball, target: Ball){
        ball.addVelocity(this.multiplier)
        ball.setMass(ball.mass * (1 - this.weightPercentageReductionOnCollide/100))
    }
}

export class ContactDamageModule implements BallModule{
    damage: number = 1

    onCollide(ball: Ball, target: Ball){
        target.callEachModule(module => module.onHit?.(target, ball))
        target.damage(this.damage)
        this.damage++
    }
}