import * as React from "react";
import { AbstractProps } from "../../../../..";

type DefaultCardProps = AbstractProps & {
    test:string,
}

const CardComponent:React.FC<DefaultCardProps> = (props)=>{
    return(
        <h1>
            CARD
        </h1>
    )
}