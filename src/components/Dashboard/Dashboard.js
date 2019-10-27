import React from "react";
import CardList from "../CardList/CardList";
import Scroll from "../Scroll/Scroll";
import Tilt from 'react-tilt';
import "./Dashboard.css";

class Dashboard extends React.Component {
    constructor() {
        super(); 
        this.state = {
            name: "",
            avatar: "",
            expired: [],
            expiredCost: 0,
            willExpire: [],
            futureCost: 0
        }
    }

    componentDidMount() {
        // get the user's info
        fetch("https://frij-api.herokuapp.com/api/users", {
            method: "get",
            headers: {"x-auth-token": this.props.token}
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const {name, avatar} = res;
                this.setState({name, avatar});
            })
            .catch(console.log);

        // get the expired items and their cost
        fetch("https://frij-api.herokuapp.com/api/storage/remove_expired", {
            method: "put",
            headers: {"x-auth-token": this.props.token}
        })
            .then(res => res.json())
            .then(res => {
                const {expired, expiredCost} = res; 
                this.setState({ expired, expiredCost });
            })
            .catch(console.log);

        // get the expired items and their cost for next week
        fetch("https://frij-api.herokuapp.com/api/storage/predict_expired/7", {
            method: "get",
            headers: { "x-auth-token": this.props.token }
        })
            .then(res => res.json())
            .then(res => {
                const { willExpire, expiredCost } = res;
                this.setState({ willExpire, futureCost: expiredCost });
            })
            .catch(console.log);
    }

    render() {
        const {name, avatar, expired, expiredCost, willExpire, futureCost} = this.state; 

        return (
            // <img src={avatar} alt="gravatar" height="100px"/>
            <div>
                <Tilt className="Tilt" options={{ max: 55 }} style={{ height: 170, width: 170 }} >
                    <div className="Tilt-inner"> 
                        <img src={avatar} alt="gravatar" height="100%" width="100%" className="br3"/>
                    </div>
                </Tilt>
                <div style={{display: "flex", justifyContent: "center"}} className="mt0 f3">
                    <h1>Welcome to Frij Dashboard, {name}!</h1>
                </div>
                <div>
                    <div className="tc f3">
                        <p>Expired today - ${expiredCost} lost!</p>
                    </div>
                    <Scroll>
                        <CardList contents={expired} />
                    </Scroll>
                </div>
                <div>
                    <div className="tc f3">
                        <p>Will expire next week - save ${futureCost}!</p>
                    </div>
                    <Scroll>
                        <CardList contents={willExpire} />
                    </Scroll>
                </div>
            </div>
        ); 
    }
} 

export default Dashboard; 
