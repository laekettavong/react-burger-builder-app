import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'


class OrderSummary extends Component {
    // This component could be a functional component, doesn;t have to be a class
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return <li key={ingKey}>
                <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {this.props.ingredients[ingKey]}
            </li>
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancelOrder} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.placeOrder} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;