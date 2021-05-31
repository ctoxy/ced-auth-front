import React, { Component } from 'react';

export default class MainContent extends Component {
    state = { appTitle: 'React Node MongoDB Authentication Boilerplat2' }
    render() {
        return (
            <div className="col-md-6 offset-md-3 text-center">
                <h1 className="p-5">{this.state.appTitle}</h1>
                <h2>MERN STACK</h2>
                <hr />
                <p className="lead">
                    MERN stack login register system with account activation, forgot password, reset password, login
                    with facebook and google as well as private and protected routes for authenticated user and users
                    with the role of admin.
                </p>
                <h4 className="p2">Bonus</h4>
                <p className="lead">Profile update & deployment to digital ocean cloud servers</p>

            </div>
        );
    }
}