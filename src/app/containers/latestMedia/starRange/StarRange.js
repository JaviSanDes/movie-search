import React from 'react';
import classes from './StarRange.css';

const StarRange = (props) => {
    let average =  Math.round(props.average / 2);
    let blancas = 5 - average;

    let svg= [];
    for(let i=0; i < average; i++){
        svg.push(
            <svg key={'svg'+i} className={classes.svg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/>
            </svg>
        )
    }
    for(let i=0; i < blancas; i++){
        svg.push(
            <svg key={'svgBlancas'+i} className={classes.svgBlancas}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z"/>
            </svg>
        )
    }

    return (
        <div className={classes.divPrincipal}>
            {svg}
            <p>{props.date}</p>  
            <p>{props.runTime}m</p>
        </div>
    )
}

export default StarRange;