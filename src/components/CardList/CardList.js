import React from "react";
import Card from "./Card";

const CardList = ({ contents }) => {
    if (!contents) {
        return (
            <div>
                All clear, no inventory!
            </div>
        )
    } else {
        return (
            <div style={{display: "flex"}}>
                {
                    contents.map((content, i) => (
                        <Card
                            key={i}
                            name={content.name}
                            expDate={content.expDate.slice(0,10)}
                            price={content.price}
                        />
                    ))
                }
            </div>
        );
    }
};

export default CardList; 