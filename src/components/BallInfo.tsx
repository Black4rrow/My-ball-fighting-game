import type { Ball } from "../model/Ball";

export interface BallInfoProps {
  ball: Ball;
}

function BallInfo(props: BallInfoProps) {
  return (
    <>
      <div>
        <p className="">{props.ball.name}</p>
        <div className="w-64 h-8 border border-black rounded-md relative">
          <div
            className="h-full rounded-md"
            style={{
              width: `${(props.ball.health / props.ball.maxHealth) * 100}%`,
              background: props.ball.color.toString(),
            }}
          ></div>
          <p className="absolute text-shadow-md text-shadow-amber-100  left-[50%] translate-x-[-50%] bottom-[50%] translate-y-[50%]">
            {props.ball.health} / {props.ball.maxHealth}
          </p>
        </div>
      </div>
    </>
  );
}

export default BallInfo;
