import { Ball } from "../model/Ball";
import { Vector2 } from "./Vector2";

export class World {
    balls: Ball[] = []
    gravity: Vector2 = new Vector2(0, 350)

    step(dt: number) {
        this.checkForBallsCollisions()
    }

    checkForBallsCollisions(){
        for (let i = 0; i <= this.balls.length - 2; i++) {
            const firstBall = this.balls[i];
            for (let j = i + 1; j <= this.balls.length - 1; j++) {
                const secondBall = this.balls[j];

                if(firstBall.center.squaredDistanceTo(secondBall.center) <= Math.pow((firstBall.radius + secondBall.radius),2)){
                    const x1 = firstBall.center
                    const v1 = firstBall.velocity
                    const m1 = firstBall.mass
                    const x2 = secondBall.center
                    const v2 = secondBall.velocity
                    const m2 = secondBall.mass
                    const squaredDist = x1.squaredDistanceTo(x2)

                    firstBall.velocity = v1.sub(x1.sub(x2).multiply((2*m2 / (m1 + m2) * (v1.sub(v2).dotProduct(x1.sub(x2)) / squaredDist))))
                    secondBall.velocity = v2.sub(x2.sub(x1).multiply((2*m1 / (m1 + m2) * (v2.sub(v1).dotProduct(x2.sub(x1)) / squaredDist))))

                    firstBall.callEachModule(module => module.onCollide?.(firstBall, secondBall))
                    secondBall.callEachModule(module => module.onCollide?.(secondBall, firstBall))
                }
            }
        }
    }
}