import React from "react";
import apple from "../../assets/apple.png";
import banana from "../../assets/banana.png";
import egg from "../../assets/egg.png";
import ham from "../../assets/ham.png";
import lobster from "../../assets/lobster.png";
import bell_pepper from "../../assets/bell_pepper.png";

const Card = ({ name, expDate, price}) => {
    let image = null; 
    if (name.toLowerCase() === "apple") {
        image = apple; 
    } else if (name.toLowerCase() === "banana") {
        image = banana; 
    } else if (name.toLowerCase() === "egg") {
        image = egg;
    } else if (name.toLowerCase() === "ham") {
        image = ham;
    } else if (name.toLowerCase() === "lobster") {
        image = lobster; 
    } else if (name.toLowerCase() === "bell pepper") {
        image = bell_pepper; 
    }

    return (
        <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center bg-white grow">
            <img src={image} height="125px" width="100px" className="db w-100 br2 br--top" alt="food"/>
            <div class="pa2 ph3-ns pb3-ns">
                <div class="dt w-100 mt1">
                <div class="dtc">
                    <h1 class="f5 f4-ns mv0">{name}</h1>
                </div>
                <div class="dtc tr">
                    <h2 class="f4 mv0">${price}</h2>
                </div>
                </div>
                <p class="f6 lh-copy measure mt2 mid-gray">
                    Expiration Date: {expDate}
                </p>
            </div>
        </article>
    );
}

export default Card;