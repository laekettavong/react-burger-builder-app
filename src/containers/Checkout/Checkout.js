import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            price: 0
        };
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                //conver 'string" number to real number by adding '=' in front of it
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ ingredients, price });
    }

    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    placeOrdereHandler = () => {
        this.props.history.push('/checkout/contact-info');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.cancelOrderHandler}
                    continue={this.placeOrdereHandler} />
                <Route
                    path={`${this.props.match.path}/contact-info`}
                    render={(props) => (<ContactInfo ingredients={this.state.ingredients} price={this.state.price} {...props} />)}
                />
            </div>

        );
    }
}

export default Checkout;