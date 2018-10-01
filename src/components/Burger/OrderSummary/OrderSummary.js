import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
        </li>
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.cancelOrder} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.placeOrder} btnType='Success'>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;