import React from "react";
import CardList from "../CardList/CardList";
import Scroll from "../Scroll/Scroll";

class Dashboard extends React.Component {
    constructor() {
        super(); 
        this.state = {
            name: "",
            organization: "",
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
                const {name, organization, avatar} = res;
                this.setState({name, organization, avatar});
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
        const {name, organization, avatar, expired, expiredCost, willExpire, futureCost} = this.state; 

        return (
            // <div>
            //     <div className="tc">
            //         <h1>Expired today - ${this.stat</h1>
            //     </div>
            //     <Scroll>
            //         <CardList contents={inventory} />
            //     </Scroll>
            // </div>
            <div>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <img src={avatar.substring(7)} alt="gravatar"/>
                    <h3>Welcome, {name} ({organization})!</h3>
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
