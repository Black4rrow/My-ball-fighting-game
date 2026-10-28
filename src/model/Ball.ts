import Color from "ts-color-class";
import { WORLD_SIZE } from "../engine/Constants";
import { Vector2 } from "../engine/Vector2";
import { World } from "../engine/World";
import type { BallModule } from "./BallModules";
import {v4} from 'uuid';
import uiObserver from "./UIObserver";

export class Ball{
    id: string = v4()
    name: string = "[Default Ball Name]"
    center: Vector2
    radius: number = 50
    mass: number = 1
    
    velocity: Vector2 = Vector2.ZERO

    maxHealth: number = 100
    health: number = this.maxHealth
    modules: BallModule[] = []

    color: Color = new Color('#FF0000')

    public constructor(center: Vector2) {
        this.center = center
    }

    step(dt: number, world: World){
        if(this.center.x - this.radius <= 0 || this.center.x + this.radius >= WORLD_SIZE) this.velocity = new Vector2(this.velocity.x * -1, this.velocity.y)
        if(this.center.y - this.radius <= 0 || this.center.y + this.radius >= WORLD_SIZE) this.velocity = new Vector2(this.velocity.x, this.velocity.y * -1)
        this.velocity = this.velocity.add(world.gravity.multiply(dt))
        this.center = this.center.add(this.velocity.multiply(dt)).constraint(0 + this.radius, WORLD_SIZE - this.radius, 0 + this.radius, WORLD_SIZE - this.radius)
    }

    callEachModule(action: (module: BallModule) => void): void{
        for (const module of this.modules){
            action(module)
        }
    }

    setMaxHealth(maxHealth: number, updateHealth: boolean = true){
        this.maxHealth = maxHealth
        if(updateHealth){this.health = maxHealth}
    }

    setMass(newValue: number){
        this.mass = Math.max(newValue, 0.02)
    }

    addVelocity(multiplier: number){
        const newVelocity =  this.velocity.multiply(1 + multiplier)
        this.velocity = newVelocity.constraintLength(12500)
    }

    damage(value: number){
        this.health -= value
        this.callEachModule(module => module.onDamaged?.(this, value))
        uiObserver.emit()
    }
}