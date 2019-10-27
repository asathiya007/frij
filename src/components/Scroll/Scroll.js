import React from "react";

const Scroll = (props) => {
    return (
        <div style={
            {
                border: "3px solid white",
                borderRadius: "10px",
                overflowY: "scroll",
                height: "30vh"
            }
        }>
            {props.children}
        </div>
    );
};

export default Scroll;