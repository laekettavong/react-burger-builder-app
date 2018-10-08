import React from 'react';
import classes from './Order.css'

const order = (props) => {
    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({
            name,
            count: props.ingredients[name]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline=block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '2px 5px'
            }}>{ingredient.name}: ({ingredient.count}) </span>
    })

    return (<div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>);
}

export default order;