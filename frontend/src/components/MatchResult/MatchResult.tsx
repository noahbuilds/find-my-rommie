import React from "react";


const MatchResult =(props:any)=>
{
    console.log(props)
    return(
        <h2>Match Result: {props.result}</h2>
    )
}

export default MatchResult