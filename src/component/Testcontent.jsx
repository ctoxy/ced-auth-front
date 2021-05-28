import React, { Component } from 'react';
import Layout from '../core/Layout';

export default class TestContent extends Component {
    state = {
        pageTitle: "Customers",
        customersCount: 5,
        customers: [
            {
                id: 1,
                name: "Scott",
                phone: "123-456",
                address: { city: "New Delhi" }
            },
            {
                id: 2,
                name: "Jones",
                phone: "982-014",
                address: { city: "New Jersy" }
            },
            { id: 3, name: "Allen", phone: "889-921", address: { city: "London" } },
            { id: 4, name: "James", phone: null, address: { city: "Berlin" } },
            { id: 5, name: "John", phone: null, address: { city: "New York" } }
        ]
    };
    //execute when a user click on 
    onRefreshClick = () => {
        this.setState({
            customersCount: 7
        })
    }
    render() {
        return (
            <Layout>
                <div>
                    <h4 className="border-bottom m-1 p-1">
                        {this.state.pageTitle}

                        <span className="badge badge-secondary m-2">
                            {this.state.customersCount}
                        </span>

                        <button className="btn btn-info" onClick={this.onRefreshClick}>
                            Refresh
              </button>
                    </h4>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map((cust) => {
                                return (
                                    <tr key={cust.id}>
                                        <td>{cust.id}</td>
                                        <td>{cust.name}</td>
                                        <td>
                                            {cust.phone ? (
                                                cust.phone
                                            ) : (
                                                <div className="bg-warning p-2 text-center">No Phone</div>
                                            )}
                                        </td>
                                        <td>{cust.address.city}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Layout>
        );
    }
}
