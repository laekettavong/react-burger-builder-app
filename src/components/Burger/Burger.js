import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients).map((ingKey, val) => {
        return [...Array(props.ingredients[ingKey])].map((ele, index) => {
            return <BurgerIngredient key={ingKey + index} type={ingKey} />
        })
    }).reduce((array, elem) => {
        return array.concat(elem);
    }, []);

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};


export default burger;