import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                addIngredient={() => props.addIngredient(ctrl.type)}
                removeIngredient={() => props.removeIngredient(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                isAuth={props.isAuth}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.order}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;