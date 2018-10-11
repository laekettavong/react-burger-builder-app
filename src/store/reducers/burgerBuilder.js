import * as Actions from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredients = (state, ingredient) => {
    let updatedIngredient = { [ingredient]: state.ingredients[ingredient] + 1 }
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredient],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredients = (state, ingredient) => {
    let updatedIngredient = { [ingredient]: state.ingredients[ingredient] - 1 }
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredient],
        building: true
    }
    return updateObject(state, updatedState)
}

const setIngredients = (state, ingredients) => {
    return updateObject(state, { ingredients, totalPrice: 4, error: false, building: false })
}

const reducer = (state = initialState, { type, ingredient, ingredients }) => {

    switch (type) {
        case Actions.ADD_INGREDIENT:
            return addIngredients(state, ingredient)

        case Actions.REMOVE_INGREDIENT:
            return removeIngredients(state, ingredient)

        case Actions.SET_INGREDIENTS:
            return setIngredients(state, ingredients)

        case Actions.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true })

        default:
            return state;
    }
}

export default reducer;