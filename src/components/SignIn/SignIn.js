import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSignIn = () => {
        const { email, password } = this.state;
        if (email !== "" && password !== "") {
            fetch("https://frij-api.herokuapp.com/api/auth", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email, password
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.props.onSaveToken(res.token);
                    this.props.onRouteChange("dashboard");
                })
                .catch(console.log);
        }
    }

    render() {
        return (
            <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center bg-white">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 tc">Frij</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="" style={{display: "flex", justifyContent: "center"}}>
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign In" onClick={this.onSignIn} />
                        </div>
                        <div className="lh-copy mt3" style={{ display: "flex", justifyContent: "center" }}>
                            <p className="f6 link dim black db" onClick={() => this.props.onRouteChange("register")}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default SignIn;