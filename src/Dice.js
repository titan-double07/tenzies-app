import React from "react";

export default function Dice(props) {
  const style={
            backgroundColor:props.isHeld &&'#59e491',
        }

    return(
      
            <div className="die-box" onClick={()=>props.hold(props.id)} style={style}>
                <h1>{props.value}</h1>
            </div>
    )

}