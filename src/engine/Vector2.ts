export class Vector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    sub(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    multiply(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    length(): number {
        return Math.hypot(this.x, this.y)
    }

    constraintLength(lengthSize: number): Vector2{
        const ratio: number = this.length() / lengthSize
        if(ratio > 1){
            return this.multiply(1/ratio)
        }
        return this
    }

    normalize(): Vector2 {
        const length: number = this.length()
        if (length === 0) {return Vector2.ZERO}
        return this.multiply(1/length)
    }

    distanceTo(target: Vector2): number{
        return Math.sqrt(this.squaredDistanceTo(target))
    }

    squaredDistanceTo(target: Vector2): number{
        return Math.pow((target.x - this.x),2) + Math.pow((target.y - this.y),2)
    }

    dotProduct(target: Vector2): number {
        return this.x * target.x + this.y * target.y    
    }

    constraint(minX: number, maxX: number, minY: number, maxY: number): Vector2 {
        return new Vector2(
            Math.min(maxX, Math.max(minX, this.x)),
            Math.min(maxY, Math.max(minY, this.y)),
        )
    }

    static UP = new Vector2(0, -1);
    static DOWN = new Vector2(0, 1);
    static LEFT = new Vector2(-1, 0);
    static RIGHT = new Vector2(1, 0);
    static ZERO = new Vector2(0, 0);
}