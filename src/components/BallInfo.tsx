import type { Ball } from "../model/Ball";

export interface BallInfoProps{
    ball: Ball
}

function BallInfo(props: BallInfoProps){
    return (
    <>
        <div className="w-64 h-8 border border-black rounded-md">
            <div 
                className="h-full rounded-md"
                style={{
                    width: `${props.ball.health / props.ball.maxHealth * 100}%`,
                    background: props.ball.color.toString()
                }}></div>
        </div>
    </>
    )
}

export default BallInfo