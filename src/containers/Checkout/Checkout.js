import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo'
import { connect } from 'react-redux'

class Checkout extends Component {
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    placeOrdereHandler = () => {
        this.props.history.push('/checkout/contact-info');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingreds) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingreds}
                        cancel={this.cancelOrderHandler}
                        continue={this.placeOrdereHandler} />
                    <Route
                        path={`${this.props.match.path}/contact-info`}
                        component={ContactInfo}
                    />
                </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingreds: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);