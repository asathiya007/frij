import React from "react";
import CardList from "../CardList/CardList";
import Scroll from "../Scroll/Scroll";

class Dashboard extends React.Component {
    constructor() {
        super(); 
        this.state = {
            organization: "",
            inventory: [],
            hotlist: []
        }
    }

    componentDidMount() {
        fetch("https://frij-api.herokuapp.com/api/storage/", {
            method: "get",
            headers: {"x-auth-token": this.props.token}
        })
            .then(res => res.json())
            .then(res => {
                const {organization, inventory} = res; 
                this.setState({ organization, inventory });
            })
            .catch(console.log);
    }

    render() {
        const {inventory} = this.state; 

        return (
            <div>
                <div className="tc">
                    <h1>Expired Items</h1>
                </div>
                <Scroll>
                    <CardList contents={inventory} />
                </Scroll>
            </div>
            
        ); 
    }
} 

export default Dashboard; 
