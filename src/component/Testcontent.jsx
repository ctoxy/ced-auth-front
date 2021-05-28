import React, { Component } from 'react';
import Layout from '../core/Layout';

export default class TestContent extends Component {
    state = {
        pageTitle: "TestContent sand box",
        customersCount: 5
    }

    onRefreshClick() {
        console.log('Refresh Click');
    }
    render() {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="p-5">{this.state.pageTitle}
                        <span className="badge bg-secondary m-2">{this.state.customersCount}</span>
                        <button className="btn btn-info" onClick={this.onRefreshClick}>Refresh</button>
                    </h1>
                </div>
            </Layout>
        );
    }
}
